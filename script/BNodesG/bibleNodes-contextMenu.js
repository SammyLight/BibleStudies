//Funciton to check if an element has a parent with the given class
function doesAnyAnscestorOfClass(A,C,boundary){
    if(boundary == null){boundary = document}
    while((A.parentNode)){
        if(A.parentNode.classList.contains(C)){
            return {
                truth: true,
                parentOfClass: A.parentNode 
            }
        }
        if((A.parentNode == boundary)||(A.parentNode == document)){
            return {
                truth: false,
                parentOfClass: null 
            }
        }
        A = A.parentNode;
    }
}

nodeDivCustomContextMenu = document.getElementById('nodeDivCustomContextMenu');
canvasCustomContextMenu = document.getElementById('canvasCustomContextMenu');

//FadeOut Then Display None Function
var fadeInTimeOut = null;
var fadeOutTimeOut = null;
function fadeInShow( el, speed ) {
    if(fadeOutTimeOut){
        clearTimeout(fadeOutTimeOut);
    }
    var seconds = speed/1000;
    el.style.display = '';
    el.style.transition = "opacity "+seconds+"s";
    el.style.opacity = 1;
}
function fadeInShow2( el, speed ) {
    if(fadeOutTimeOut){
        clearTimeout(fadeOutTimeOut);
    }
    
    var seconds = speed/1000;
    el.style.display = '';
    
    fadeInTimeOut = setTimeout(function() {
        el.style.transition = "opacity "+seconds+"s";
        el.style.opacity = 1;
        fadeInTimeOut = null;
    }, speed);
}
function fadeOutHide( el, speed ) {
    if(fadeInTimeOut){clearTimeout(fadeInTimeOut);}
    
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s";
    el.style.opacity = 0;

    fadeOutTimeOut = setTimeout(function() {
        // el.style.backgroundColor = 'red';
        el.style.display = 'none';
        fadeOutTimeOut = null;
    }, speed);
}
function fadeOutDelete( el, speed ) {
    if(fadeInTimeOut){clearTimeout(fadeInTimeOut);}
    
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s";
    el.style.opacity = 0;

    fadeOutTimeOut = setTimeout(function() {
        el.remove();
        fadeOutTimeOut = null;
    }, speed);
}

//Mousedown eventListner to Hide contextMenu on click away
nodeCanvas.addEventListener('mousedown', hideContextMenu);

function hideContextMenu() {
    nodeDivCustomContextMenu.style.display = 'none';
    canvasCustomContextMenu.style.display = 'none';
    svgPathCustomContextMenu.style.display = 'none';
}

//Add ContextMenu EventListner To All Div-Nodes
//(to show nodeDivCustomContextMenu on right-click and at the clicked coordinates)
var rClick_Y;
var rClick_X;
//svgPath toolTip
var selectedPath;
var svgPathToolTip = document.createElement('DIV');
svgPathToolTip.id = 'svgPathToolTip';
// svgPathToolTip.style.borderRadius = '2px';
svgPathToolTip.style.boxShadow = '1px 1px 50px 0px grey';
svgPathToolTip.style.position = 'absolute';
svgPathToolTip.style.zIndex = '19';
nodeCanvas.appendChild(svgPathToolTip);

//divNode toolTip
var divNodeToolTip = document.createElement('DIV');
divNodeToolTip.id = 'divNodeToolTip';
// divNodeToolTip.style.borderRadius = '2px';
divNodeToolTip.style.boxShadow = '1px 1px 50px 0px grey';
divNodeToolTip.style.position = 'absolute';
divNodeToolTip.style.zIndex = '19';
divNodeToolTip.addEventListener('mouseover', function(){
    showDivNodeToolTip = 1;
})
divNodeToolTip.addEventListener('mouseout', function(){
    showDivNodeToolTip = 0;
})
showDivNodeToolTip = 0;
// nodeCanvas.appendChild(divNodeToolTip);

var elementToCommentOn;
var noteToDelete;

//For Tooltip
nodeCanvas.addEventListener('mouseover', function (ev) {
    rClick_X = ev.clientX - nodeCanvasContainer.getBoundingClientRect().left - nodeCanvas.getBoundingClientRect().left + (window.pageXOffset || document.documentElement.scrollLeft);
    rClick_Y = ev.clientY + nodeCanvasContainer.getBoundingClientRect().top - nodeCanvas.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
    
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    
    //SVG PATH TOOLTIP
    //attach toolTip to target if it is an SVG Path element
    if (target.tagName == 'path') {
        elementToCommentOn = target;
        selectedPath = target;
        
        svgPathToolTip.style.left = rClick_X + 10 + 'px';
        svgPathToolTip.style.top = rClick_Y + 10 + 'px';
        svgPathToolTip.style.display = 'block';
        svgPathToolTip.style.opacity = 0;
        var pathOrigin = nodeCanvas.querySelector('[nodeId=' + selectedPath.getAttribute('connectedfrom') + ']').innerText;
        var pathEnd = nodeCanvas.querySelector('[nodeId=' + selectedPath.getAttribute('connectedto') + ']').innerText;
        
        var pathLabelzForAttr = selectedPath.getAttribute('connectedfrom').replace('node', 'n') + selectedPath.getAttribute('connectedto').replace('node', 'n');
        var pLabel = nodeCanvas.querySelector('[labelFor=' + pathLabelzForAttr + ']');
        if(pLabel == null){
            svgPathToolTip.innerHTML = '<em>From: <strong>' + pathOrigin + '</strong></em><br>' + '<em>To: <strong>' + pathEnd + '</strong></em>';
        } else {
            var pathLabelzText = pLabel.innerText;
            svgPathToolTip.innerHTML = '<em>' + pathLabelzText + '<hr>From: <strong>' + pathOrigin + '</strong></em><br>' + '<em>To: <strong>' + pathEnd + '</strong></em>';
        }
        fadeInShow(svgPathToolTip, 800);
    }
    //hide toolTip if target is not an SVG Path element
    if ((target.tagName != 'path') && (svgPathToolTip.style.display == 'block')) {
        fadeOutHide(svgPathToolTip, 800)
    }
    
    //DIVNODE TOOLTIP
    //attach toolTip to target if it is a divNode
    if (target.classList.contains('divNode')) {
        elementToCommentOn = target;
        selectedDivNode = target;
        // DivNode's Tooltip has fixed coordinates relative to the divNode
        divNodeToolTip.style.left = selectedDivNode.offsetLeft  + 'px';
        divNodeToolTip.style.top = selectedDivNode.offsetTop + selectedDivNode.offsetHeight + 'px';
        divNodeToolTip.style.display = 'block';
        // divNodeToolTip.style.opacity = 0;
        nodeCanvas.appendChild(divNodeToolTip);
        if(noteInnerHtml = selectedDivNode.getAttribute('note')){
            divNodeToolTip.innerHTML = "";
            divNodeToolTip.appendChild((connectionDetails.querySelector('[note="' + noteInnerHtml + '"]')).cloneNode(true));
            // divNodeToolTip.innerHTML = connectionDetails.querySelector('[note="' + noteInnerHtml + '"]').innerHTML;
        } else {
            divNodeToolTip.innerHTML = '<em>' + selectedDivNode.innerText + '</em>';
        }
        fadeInShow(divNodeToolTip, 800);
    }
    //hide toolTip if target is not a divNode or a divNodeToolTip
    if ((showDivNodeToolTip == 0) && (!target.classList.contains('divNode')) && (divNodeToolTip.style.display == 'block')) {
        // fadeOutHide(divNodeToolTip, 800)
        fadeOutDelete(divNodeToolTip, 800)
    }
})
nodeCanvas.addEventListener('mousemove', function (ev) {
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
 
    rClick_X = ev.clientX - nodeCanvasContainer.getBoundingClientRect().left - nodeCanvas.getBoundingClientRect().left + (window.pageXOffset || document.documentElement.scrollLeft);
    rClick_Y = ev.clientY + nodeCanvasContainer.getBoundingClientRect().top - nodeCanvas.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
    
    if (target.tagName == 'path') {

        selectedPath = target;
        
        svgPathToolTip.style.left =rClick_X + 10 + 'px';
        svgPathToolTip.style.top = rClick_Y + 10 + 'px';
        svgPathToolTip.style.opacity = '1';
        svgPathToolTip.style.display = 'block';
    }
})

//This eventListner targets the children of nodeCanvas without attaching eventListners to the children directly
nodeCanvas.addEventListener('mousedown', function (ev) {
    //Get the clicked element
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    // elementToCommentOn = target;

    //If there is an editable divNode and it is not what is clicked, make it uneditable
    if (editableDiv && (target != editableDiv)) {
        editableDiv.contentEditable = 'false';
        
    }
    //If there is an editable pathLabel and it is not what is clicked, make it uneditable
    if (editablePathLabel && (target != editablePathLabel)) {
        editablePathLabel.contentEditable = 'false';
    }
    if (target.parentNode.classList.contains('customContextMenu')) {
        target.parentNode.style.display = 'none';
    }
})

nodeCanvas.addEventListener('contextmenu', function (ev) {
    rClick_X = ev.clientX - nodeCanvasContainer.getBoundingClientRect().left - nodeCanvas.getBoundingClientRect().left + (window.pageXOffset || document.documentElement.scrollLeft);
    rClick_Y = ev.clientY + nodeCanvasContainer.getBoundingClientRect().top - nodeCanvas.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);

    ev.preventDefault();//prevent default context menu

    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    // elementToCommentOn = target;

    //Show contextMenu on rightClick of any divNode
    if (target.classList.contains('divNode')) {
        //set position of nodeDivCustomContextMenu when any divNode is right-clicked
        nodeDivCustomContextMenu.style.left = rClick_X + 'px';
        nodeDivCustomContextMenu.style.top = rClick_Y + 'px';
        nodeDivCustomContextMenu.style.display = 'grid';
    }
    //Show contextMenu on rightClick of any connecting svg line/path
    else if (target.tagName == 'path') {
        selectedPath = target;
        //set position of nodeDivCustomContextMenu when any divNode is right-clicked
        svgPathCustomContextMenu.style.left =rClick_X + 'px';
        svgPathCustomContextMenu.style.top = rClick_Y + 'px';
        svgPathCustomContextMenu.style.display = 'grid';
    }
    //Showo contexMenu on rightClick of any part of the nodeCanvas as long as it is not a divNode nor a svgPath that has been rightClicked
    else if ((target.tagName != 'div')&&(target.tagName != 'path')) {
        //set position of nodeDivCustomContextMenu when any divNode is right-clicked
        canvasCustomContextMenu.style.left = rClick_X + 'px';
        canvasCustomContextMenu.style.top = rClick_Y + 'px';
        canvasCustomContextMenu.style.display = 'grid';
    }
    return false;//prevent default context menu
}, false);

var notesCustomContextMenuX;
var notesCustomContextMenuY;
onload = nodeBoundingRect();
function nodeBoundingRect(){
    notesCustomContextMenuX = notesCustomContextMenu.getBoundingClientRect().left;
    notesCustomContextMenuY = notesCustomContextMenu.getBoundingClientRect().top;
}

connectionDetails.addEventListener('contextmenu', function (ev) {
    rClick_X = ev.clientX + notesCustomContextMenuX + (window.pageXOffset || document.documentElement.scrollLeft);
    rClick_Y = ev.clientY + notesCustomContextMenuY + (window.pageYOffset || document.documentElement.scrollTop);

    ev.preventDefault();//prevent default context menu

    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    // elementToCommentOn = target;
    
    //Show contextMenu on rightClick of any divNode
    if((target != this) && ((target.classList.contains('notes')) || (doesAnyAnscestorOfClass(target,'notes',connectionDetails)).truth)){
        if(target.classList.contains('notes')){
            noteToDelete = target;
        } else {
            noteToDelete = doesAnyAnscestorOfClass(target,'notes',connectionDetails).parentOfClass;
        }
        //set position of notesCustomContextMenu when any divNode is right-clicked
        notesCustomContextMenu.style.left = rClick_X + 'px';
        notesCustomContextMenu.style.top = rClick_Y + 'px';
        notesCustomContextMenu.style.display = 'block';
        notesCustomContextMenu.style.zIndex = '21';
    }
    return false;//prevent default context menu
}, false);


//Make PageTitle bar editable
bibleNodesTitle.addEventListener('dblclick', function () {
    this.contentEditable = 'true';
})
//Make PageTitle bar, notes not editable when clicked away
document.addEventListener('mousedown', function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    if((target.id != 'bibleNodesTitle')&&(bibleNodesTitle.contentEditable == 'true')){
        bibleNodesTitle.contentEditable = 'false';
    }
    if((currentNote = connectionDetails.querySelector('*[contentEditable="true"]')) && (target.parentNode != currentNote) && (target.classList.contains('notes') != true)){
        currentNote.contentEditable = 'false';
    }
    if((target != deleteNoteBtn) &&  (notesCustomContextMenu.style.display != 'none')){
        notesCustomContextMenu.style.display = 'none';
    }
})