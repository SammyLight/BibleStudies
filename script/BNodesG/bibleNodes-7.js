window.scrollTo(0, 0);//for when window is refreshed so that the coordinates are not messed up

//SVG related eventListeners are not directly included here. Instead, variables are addled to allow or disallow the SVG related eventListners
//Click twice before dragging is possible

var nodeCanvas = document.getElementById('nodeCanvas');
var divNodes = document.getElementsByClassName('divNode');
var pointNode = document.getElementById('pointNode');
var currentNode;
var previousNode;
var nodeCanvasX;
var nodeCanvasY;
var contextX;
var contextY;
var divX;
var divY;
var youCanDrag = 0;
var aNodeHasBeenClicked = 0;
var mouseDownForDraggingEnabled = 0;
var mouseMoveForDraggingEnabled = 0;
var nodeIdsAllAssigned = 0;

var collisionDetectionOn = 0;
var evaluatedNode;

var arrayOfSelectedNodes = [];//FOR SELECTABLES.JS

onload = nodeBoundingRect();
function nodeBoundingRect(){
    nodeCanvasX = nodeCanvas.getBoundingClientRect().left;
    nodeCanvasY = nodeCanvas.getBoundingClientRect().top;
}
//Function to assign nodeId attribute and nodeId class to selected divNode
function assignNodeID(elm, index) {
    elm.setAttribute('nodeId', ('node' + (index + 1)));
    elm.classList.add('node' + (index + 1))
}

//Add eventListner to all divNodes
//The function below is called when endNodeAssigner() has been defined
function addEventListenersToDivNodesOnPageLoad(){
    if(divNodes){
        for (i = 0; i < divNodes.length; i++) {
        divNodes[i].addEventListener('mousedown', nodeCanvasMouseDownFunction);
        endNodeAssigner(divNodes[i]);
        }
    }
}

//Add eventListner to nodeCanvas for deselecting selected node
nodeCanvas.addEventListener('mousedown', deselectOnCanvasClick);

function deselectOnCanvasClick(e) {
    if ((currentNode) && (aNodeHasBeenClicked == 0)) {
        youCanDrag = 0;
        currentNode.classList.remove('currentnode');
        youCanDrag = 0;
    }
    if(websiteNavMenu.style.display != 'none'){navMenu()}
}

function nodeCanvasMouseDownFunction(e) {
    contextX = e.clientX;
    contextY = e.clientY;
    evaluatedNode = this;
    collisionSwitch();
    if(collisionDetectionOn){currentNodeStartPosition(evaluatedNode);}//for getting the initial position of currentNode to return it to in case of collision
    aNodeHasBeenClicked = 1;
    //if this is the first time a nodeDiv is clicked or if the nodeCanvas was clicked, then 'youCanDrag  == 0'
    if (youCanDrag == 0) {
        youCanDrag = 1;
        currentNode = this;
        currentNode.classList.add('currentnode');
        //findSVGpathMouseDownFunction eventListner is connected to this
    } else if ((currentNode == this)) {
        //if the same divNode is clicked
        //For moving the nodes (moves on second mousedown)
        nodeCanvas.addEventListener('mousedown', mouseDownFunction);
        nodeCanvas.addEventListener('mousemove', mouseMoveFunction);
        nodeCanvas.addEventListener('mouseup', mouseUpFunction);
    } else if (currentNode != this) {
        //if the currently clicked divNode is not the formerly clicked one
        //visually demonstrate that the previously selected node has been deselected
        previousNode = currentNode;
        previousNode.classList.remove('currentnode');
        // previousNode.style.boxShadow = "";
        youCanDrag = 1;
        currentNode = this; //reasign the currentNode varriable to the currently selected divNode
        currentNode.classList.add('currentnode');
    }
}

function mouseDownFunction(e) {
    //Connection to SVGmouseDownFunction
    mouseDownForDraggingEnabled = 1;

    //distance from div left/top to mouse x/y on mouseDown on divNode
    //this is to ensure the mouse curse maintains the respective distance from the div edges
    contextX = e.clientX;
    contextY = e.clientY;

    divX = e.clientX - currentNode.getBoundingClientRect().left;
    divY = e.clientY - currentNode.getBoundingClientRect().top;
    SVGmouseDownFunction();
}

function mouseMoveFunction(e) {
    //Connection to SVGmouseMoveFunction
    mouseMoveForDraggingEnabled = 0;

    // take vertical and horizontal page scroll into consideration 
    var horizontalScroll = (window.pageXOffset || document.documentElement.scrollLeft) - nodeCanvasContainer.getBoundingClientRect().left - nodeCanvas.getBoundingClientRect().left;
    var verticalScroll = (window.pageYOffset || document.documentElement.scrollTop) + nodeCanvasContainer.getBoundingClientRect().top - nodeCanvas.getBoundingClientRect().top;

    //The mouse coordinates (e.clientX and e.clientY) will be updated as the mouse moves
    //divX and divY are the orginal divNodes position
    var newX = e.clientX - divX + horizontalScroll + 'px';
    var newY = e.clientY - divY + verticalScroll + 'px';

    currentNode.style.left = newX;
    currentNode.style.top = newY;
    
    SVGmouseMoveFunction();
    createSet();
    if(collisionDetectionOn){detectCollision();}
    // joinCirclesWithPaths(arrangeArray(document.getElementsByClassName('divNode')), 'divNodes');
}

function mouseUpFunction(e) {
    if(collisionDetectionOn){actIfCollision();}
    createSet();

    //Connection to SVGmouseDownFunction & SVGmouseMoveFunction
    mouseDownForDraggingEnabled = 0;
    mouseMoveForDraggingEnabled = 0;
    
    aNodeHasBeenClicked = 0; //used for deselecting node
    nodeCanvas.removeEventListener('mousedown', mouseDownFunction);
    nodeCanvas.removeEventListener('mousemove', mouseMoveFunction);
}

/* For Navigation Menu */
function showHideSiteNav(x) {
	if (x.style.display == 'none') {
        x.style.display = '';
	} else {
        x.style.display = 'none';
	}
}
function navMenu() {
    
    // window.scrollTo(0, 0);
    
	var webSiteNavLinks = websiteNav.querySelectorAll('*:not(a)');
    
	for (let i = 1; i <= webSiteNavLinks.length; i++) {
        setTimeout(() => showHideSiteNav(webSiteNavLinks[i - 1]), 5 * i)
	}
}

/* DARK MODE ON OFF */
var darkModeButton = document.getElementById('darkModeButton');
var documentBody = document.getElementsByTagName('body')[0];
function darkModeOnOff() {
    if (documentBody.classList.contains('darkmode')) {
        documentBody.classList.remove('darkmode');
		darkModeButton.innerHTML = 'D';
	} else {
        documentBody.classList.add('darkmode');
		darkModeButton.innerHTML = 'L';
	}
}

//FOR MOVING ARRAY OF SELECTED NODES
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
        //left
        moveLeft()
        break;
        case 38:
        //up
        moveUp()
        break;
        case 39:
            //right
        moveRight()
        break;
        case 40:
        //down
        moveDown()
        break;
    }
});
function moveUp(){
    if(arrayOfSelectedNodes.length != 0){
        arrayOfSelectedNodes.forEach(selNode => {

            var selNodeY = selNode.offsetTop;
            selNode.style.top = selNodeY - 5 + 'px';
            //for svg lines
            currentNode = selNode;
            SVGmouseDownFunction();
            SVGmouseMoveFunction();
            // currentNode = null;
        })
    }
}
function moveDown(){
    if(arrayOfSelectedNodes.length != 0){
        arrayOfSelectedNodes.forEach(selNode => {

            var selNodeY = selNode.offsetTop;
            selNode.style.top = selNodeY + 5 + 'px';
            //for svg lines
            currentNode = selNode;
            SVGmouseDownFunction();
            SVGmouseMoveFunction();
            // currentNode = null;
        })
    }
}
function moveLeft(){
    if(arrayOfSelectedNodes.length != 0){
        arrayOfSelectedNodes.forEach(selNode => {

            var selNodeX = selNode.offsetLeft;
            selNode.style.left = selNodeX - 5 + 'px';
            //for svg lines
            currentNode = selNode;
            SVGmouseDownFunction();
            SVGmouseMoveFunction();
            // currentNode = null;
        })
    }
}
function moveRight(){
    if(arrayOfSelectedNodes.length != 0){
        arrayOfSelectedNodes.forEach(selNode => {

            var selNodeX = selNode.offsetLeft;
            selNode.style.left = selNodeX + 5 + 'px';
            //for svg lines
            currentNode = selNode;
            SVGmouseDownFunction();
            SVGmouseMoveFunction();
            // currentNode = null;
        })
    }
}
//Move Selected by dragging
nodeCanvas.addEventListener('mousedown', selectedMouseDown);
nodeCanvas.addEventListener('mouseup', selectedMouseUp);
var selMX;
var selMY;
var addSelecListner = 0;
var selNodeX;
var selNodeY;
function selectedMouseDown(ev) {
    selMX = ev.clientX;
    selMY = ev.clientY;
    
    // if((ev.target).classList.contains('active')){
    if(((ev.target).classList.contains('active'))&&(arrayOfSelectedNodes.length != 0)){
        document.addEventListener('mousemove', selectedMouseMove);
        addSelecListner = 1;
    }
}
function selectedMouseMove(ev) {
    // console.log(ev.clientX);
    // console.log(ev.clientY);
    difX = ev.clientX - selMX;
    difY = ev.clientY - selMY;
    // console.log(difX);
    // console.log(difY);

    arrayOfSelectedNodes.forEach(selNode => {

        selNodeX = selNode.offsetLeft;
        selNodeY = selNode.offsetTop;
        selNode.style.left = selNodeX + difX + 'px';
        selNode.style.top = selNodeY + difY + 'px';
        //for svg lines
        currentNode = selNode;
        SVGmouseDownFunction();
        SVGmouseMoveFunction();
        // currentNode = null;
    })
    //get the new mouse coordinates
    selMX = ev.clientX;
    selMY = ev.clientY;
}
function selectedMouseUp(ev) {
    selMX = null;
    selMY = null;
    addSelecListner = 0;
    selNodeX = null;
    selNodeY = null;
    
    document.removeEventListener('mousemove', selectedMouseMove);
}