window.scrollTo(0, 0);//for when window is refreshed so that the coordinates are not messed up

//SVG related eventListeners are not directly included here. Instead, variables are addled to allow or disallow the SVG related eventListners
//Click twice before dragging is possible

var nodeCanvas = document.getElementById('nodeCanvas');
var divNodes = document.getElementsByClassName('divNode');
var pointNode = document.getElementById('pointNode');
var currentNode;
var previousNode;
var nodeCanvasX = nodeCanvas.getBoundingClientRect().left;
var nodeCanvasY = nodeCanvas.getBoundingClientRect().top;
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
        currentNode.style.border = "";
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
        currentNode.style.border = "0.5px solid red";
        //findSVGpathMouseDownFunction eventListner is connected to this
    } else if ((currentNode == this)) {
        //if the same divNode is clicked
        //For moving the nodes (moves on second mousedown)
        nodeCanvas.addEventListener('mousedown', mouseDownFunction);
        nodeCanvas.addEventListener('mousemove', mouseMoveFunction);
        nodeCanvas.addEventListener('mouseup', mouseUpFunction);
    } else if (currentNode != this) {
        //if the currently clicked divNode is the formerly clicked one
        //visually demonstrate that the previously selected node has been deselected
        previousNode = currentNode;
        previousNode.style.border = "";
        // previousNode.style.boxShadow = "";
        youCanDrag = 1;
        currentNode = this; //reasign the currentNode varriable to the currently selected divNode
        currentNode.style.border = "0.5px solid red";
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