//connecting nodes
var firstNode = null;
var secondNode;
var makeClickedNodeSecondNode = 0;
var deletedNodeIdsArray = [];

//Function to make mouseDown nodeDiv the endNode
function endNodeAssigner(elm2makeEndNode) {
    elm2makeEndNode.addEventListener('mousedown', function (e) {
        if (makeClickedNodeSecondNode == 1) {
            secondNode = this;
            //stop it from linking to itself
            if (firstNode != secondNode) {
                setConnect2Attribute(firstNode, secondNode);
                drawSVGConnectingLine(firstNode, secondNode);
            }
            secondNode = null;
            firstNode = null;

            makeClickedNodeSecondNode = 0;
        }
    });
}

addEventListenersToDivNodesOnPageLoad(); //This function is here becasue it needs the endNodeAssigner() function to have been defined

//The ConnectTo and the ConnectFrom attributes of a nodeDiv show what divs it is connected to and its relationship to it
function setConnect2Attribute(first, second) {
    if (first != second) {
        var connect2Array = [];
        if (first.hasAttribute('connectTo')) {
            var abc = (first.getAttribute('connectTo')).split(' ');
            connect2Array = connect2Array.concat(abc);
        }
        var secondNodeId = second.getAttribute('nodeId');
        if (connect2Array.indexOf(secondNodeId) == -1) {
            connect2Array.push(secondNodeId);
        }
        first.setAttribute('connectTo', connect2Array.join(" "))
    }
}

//This is the function the 'ConnectTo' button on the rightClick menu triggers
function nodeToConnectCurrentNodeTo() {
    // startNendNodesArrayOfDeletedSVGlines = [];
    firstNode = currentNode; //the right-click event is also a mousedown event, therefore, it makes the right-clicked nodeDiv the currentNode
    makeClickedNodeSecondNode = 1; //This condition determines if the node clicked after this would be made the endNode

    hideContextMenu()
}

//This is the function the 'Clone Node'  button on the rightClick menu triggers
function createNewNode(type) {
    var newDivNode = document.createElement('DIV');
    //Assign new nodeId class from cloned divNode
    var newNodeID;
    newDivNode.classList.add('divNode');
    if (deletedNodeIdsArray.length == 0) {
        newNodeID = divNodes.length;
    } else {
        newNodeID = deletedNodeIdsArray[0] - 1;
        deletedNodeIdsArray.shift();
    }
    assignNodeID(newDivNode, newNodeID);
    //Remove border indicating node was selected
    newDivNode.style.border = '';
    //Create the nodeDiv at the mouse's coordinate
    newDivNode.style.top = rClick_Y + 'px';
    newDivNode.style.left = rClick_X + 'px';
    newDivNode.setAttribute('tabindex', 1);
    //Make the nodeId the textContent of the new nodeDiv
    newDivNode.textContent = 'node' + (newNodeID + 1);
    //Assing eventListners to nodeDiv
    newDivNode.addEventListener('mousedown', nodeCanvasMouseDownFunction);
    //Append new nodeDiv
    nodeCanvas.appendChild(newDivNode);
    endNodeAssigner(newDivNode);
    //For creating set nodes
    if (type == 'set') {
        newDivNode.classList.add('set_item');
        newDivNode.setAttribute('setclass', null);
        createSet();
    }

    hideContextMenu()
}

//Make divNode editable
var editableDiv = null;
var editablePathLabel = null;
nodeCanvas.addEventListener('dblclick', function (ev) {
    ev.preventDefault();
    //Get the clicked element
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;

    if (target.classList.contains('divNode')) {
        makeNodeDivEditable();
    }
    if (target.classList.contains('pathLabel')) {
        editablePathLabel = target;
        makePathLabelEditable();
    }
    if (target.tagName == 'svg') {
        createNewNode();
    }

    //prevent doubleClick
    return false;
}, false);

function makeNodeDivEditable() {
    editableDiv = currentNode;
    currentNode.contentEditable = 'true';

    hideContextMenu()
}

function makePathLabelEditable() {
    editablePathLabel.contentEditable = 'true';

    hideContextMenu()
}

function deleteNodeDiv() {
    //Delete all svg paths connected to the nodeDiv to be deleted 
    var pathClass = currentNode.getAttribute('nodeId');
    var deletedNodeId = pathClass;
    var pathsToRemove = nodeCanvas.querySelectorAll('path.' + pathClass);
    for (p = 0; p < pathsToRemove.length; p++) {
        //check for the node at the other end (either connectedTo or connectedFrom)
        var linkFrom = pathsToRemove[p].getAttribute('connectedfrom');
        var linkTo = pathsToRemove[p].getAttribute('connectedto');
        if (linkTo == pathClass) {
            var nodeOnOtherEnd = nodeCanvas.querySelector('.divNode.' + linkFrom);
            var toArray = [];
            toArray = toArray.concat((nodeOnOtherEnd.getAttribute('connectTo')).split(' '));
            if (toArray.length > 1) {
                var pathClassIndex = toArray.indexOf(pathClass);
                toArray.splice(pathClassIndex, 1);
                var newLinkToValue = toArray.join(' ');
                nodeOnOtherEnd.setAttribute('connectTo', newLinkToValue)
            } else {
                nodeOnOtherEnd.removeAttribute('connectTo')
            }
        }
        //remove path
        pathsToRemove[p].remove();
    }

    //Delete the nodeDiv
    currentNode.remove();

    //Save the nodeId of the deleted divNode to be used when creating a new divNode
    // deletedNodeIdsArray.push(deletedNodeId);
    deletedNodeIdsArray.push(Number(deletedNodeId.replace('node', ''))); //remove 'node' from the string so that only the number par to the string is left and convert the number sting into an actual number to be sorted
    deletedNodeIdsArray = [...new Float64Array(deletedNodeIdsArray).sort()];

    hideContextMenu()
}

//THIS HIDES OR SHOWS ALL DESCENDANTS OF SELECTED NODE
function toggleDescendants(thisNode, showORhide) {
    if (!thisNode) {
        thisNode = currentNode
    }
    if (thisNode.hasAttribute('connectTo')) {
        var connect2Array = [];
        var abc = (thisNode.getAttribute('connectTo')).split(' ');
        connect2Array = connect2Array.concat(abc);

        //SHOW ALL DESCENDANTS AND CONNECTING PATHS OF SELECTED NODE IF THEY HAVE BEEN HIDDEN
        if (((!showORhide) || (showORhide == 'show')) && (thisNode.classList.contains('descendantshidden'))) {
            connect2Array.forEach(descendant => {
                var currentDescendant = nodeCanvas.querySelector('[nodeId=' + descendant + ']')
                fadeInShow2(currentDescendant, 400);
                var pathsFrom = svg.querySelectorAll('[connectedfrom=' + descendant + ']');
                var pathsTo = svg.querySelectorAll('[connectedto=' + descendant + ']');
                for (i = 0; i < pathsFrom.length; i++) {
                    fadeInShow2(pathsFrom[i], 400);
                }
                for (i = 0; i < pathsTo.length; i++) {
                    fadeInShow2(pathsTo[i], 400);
                }
                toggleDescendants(currentDescendant, 'show');
            });
                thisNode.classList.remove('descendantshidden');
        }
        //HIDE ALL DESCENDANTS AND CONNECTING PATHS OF SELECTED NODE
        else if ((!showORhide) || (showORhide == 'hide')) {
            connect2Array.forEach(descendant => {
                var currentDescendant = nodeCanvas.querySelector('[nodeId=' + descendant + ']')
                fadeOutHide(currentDescendant, 400);
                var pathsFrom = svg.querySelectorAll('[connectedfrom=' + descendant + ']');
                var pathsTo = svg.querySelectorAll('[connectedto=' + descendant + ']');
                for (i = 0; i < pathsFrom.length; i++) {
                    fadeOutHide(pathsFrom[i], 400);
                }
                for (i = 0; i < pathsTo.length; i++) {
                    fadeOutHide(pathsTo[i], 400);
                }
                toggleDescendants(currentDescendant, 'hide');
            });
            thisNode.classList.add('descendantshidden');
        }
    }

    hideContextMenu()
}
/* function toggleDescendants() {
    if (currentNode.hasAttribute('connectTo')) {
        var connect2Array = [];
        var abc = (currentNode.getAttribute('connectTo')).split(' ');
        connect2Array = connect2Array.concat(abc);
    
        // var descendants = currentNode.getAttribute('connectto');
        if (currentNode.classList.contains('descendantshidden')) {
            connect2Array.forEach(descendant => {
                fadeInShow(nodeCanvas.querySelector('[nodeId=' + descendant + ']'), 800);
                var pathsFrom = svg.querySelectorAll('[connectedfrom=' + descendant + ']');
                var pathsTo = svg.querySelectorAll('[connectedto=' + descendant + ']');
                for(i=0; i<pathsFrom.length; i++){
                    fadeInShow(pathsFrom[i], 800);
                }
                for(i=0; i<pathsTo.length; i++){
                    fadeInShow(pathsTo[i], 800);
                }
            });
            currentNode.classList.remove('descendantshidden');
        } else {
            connect2Array.forEach(descendant => {
                fadeOutHide(nodeCanvas.querySelector('[nodeId=' + descendant + ']'), 800);
                var pathsFrom = svg.querySelectorAll('[connectedfrom=' + descendant + ']');
                var pathsTo = svg.querySelectorAll('[connectedto=' + descendant + ']');
                for(i=0; i<pathsFrom.length; i++){
                    fadeOutHide(pathsFrom[i], 800);
                }
                for(i=0; i<pathsTo.length; i++){
                    fadeOutHide(pathsTo[i], 800);
                }
            });
            currentNode.classList.add('descendantshidden');
        }
    }

    hideContextMenu()
} */

function deletePath() {
    //get nodeId of startNode
    var startNodeId = selectedPath.getAttribute('connectedfrom');
    var pathConnectedTo = selectedPath.getAttribute('connectedto');
    //find divNode with the nodeId equal to the connectedFrom of the selected path
    var startNode = nodeCanvas.querySelector('[nodeId=' + startNodeId + ']');
    var startNodeConnectTo = startNode.getAttribute('connectTo');

    // if (startNodeConnectTo === pathConnectedTo) {
    //     startNode.removeAttribute('connectTo');
    // }
    // else {
    var connect2Array = [];
    var abc = startNodeConnectTo.split(' ');
    connect2Array = connect2Array.concat(abc);
    connect2Array.splice(connect2Array.indexOf(pathConnectedTo), 1);
    startNode.setAttribute('connectTo', connect2Array.join(" "));
    // }
    //Remove paths label if it has one
    if (labelToRemove = nodeCanvas.querySelector('[labelFor=' + selectedPath.id + ']')) {
        labelToRemove.remove();
    }
    //Remove the selectd path
    selectedPath.remove();

    hideContextMenu();
}

function addLabelToPath() {
    //if there is no node attached to the path already
    if (!nodeCanvas.querySelector('[labelFor=' + selectedPath.id + ']')) {
        // get Center of svg Path
        var bbox = selectedPath.getBBox();
        var pathXmid = Math.floor(bbox.x + bbox.width / 2.0);
        var pathYmid = Math.floor(bbox.y + bbox.height / 2.0);

        //create pathLabel
        var svgLabel = document.createElement('DIV');
        svgLabel.classList.add('pathLabel');
        nodeCanvas.appendChild(svgLabel);
        //Position the pathLabel
        svgLabel.style.position = 'absolute';
        svgLabel.style.left = pathXmid + 'px';
        svgLabel.style.top = pathYmid + 'px';
        svgLabel.setAttribute('labelFor', selectedPath.id)
        svgLabel.textContent = 'edit label';
        svgLabel.contentEditable = 'true';
        editablePathLabel = svgLabel;
    }

    hideContextMenu();
}

function realignPathLabel() {
    for (l = 0; l < labelsForAttr.length; l++) {
        //find svg path with the id
        // get Center of svg Path
        var redrawnPath = nodeCanvas.querySelector("#" + labelsForAttr[l]);
        var bbox = redrawnPath.getBBox();
        var pathXmid = Math.floor(bbox.x + bbox.width / 2.0);
        var pathYmid = Math.floor(bbox.y + bbox.height / 2.0);

        //find label with the for attribute
        var tempSvglabel = nodeCanvas.querySelector('[labelfor=' + labelsForAttr[l] + ']');

        if (tempSvglabel) {
            tempSvglabel.style.left = pathXmid + 'px';
            tempSvglabel.style.top = pathYmid + 'px';
        }
    }
}

// NOTES' FUNCTION
var notesCount = 0;
var highestNoteCount;
var notesCountArray = [];
var missingNotesIndexArr = [];
//check if there are any notes on the page already and...
//get their values, add them to the notesCountArray, and sort the notesCountArray
var allNotes = connectionDetails.querySelectorAll('[note]');
for (n = 0; n < allNotes.length; n++) {
    notesCountArray.push(allNotes[n].getAttribute('note'));
    notesCountArray = [...new Float64Array(notesCountArray).sort()];
    //addEventListener to notes on pageLoad
    allNotes[n].addEventListener('dblclick', noteDblClick);
}
// var notesMax = Math.max(...notesCountArray);
// var notesMin = Math.min(...notesCountArray);

if (allNotes.length == 0) {
    notesCount = 0;
} else if (allNotes.length == 1) {
    if (allNotes[0] > 1) {
        var mNum = 0;
        var mDiff = allNotes[0] - 1;
        while (mNum < mDiff) {
            missingNotesIndexArr.push(++mNum)
        }
    } else {
        notesCount = 1;
    } //if the only note is 1
} else if (allNotes.length > 1) {
    for (n = 0; n < allNotes.length; n++) {
        //for the first number in the array, check if the number is greater than 1
        if ((n == 0) && (allNotes[0] > 1)) {
            var mNum = 0;
            var mDiff = allNotes[0] - 1;
            while (mNum < mDiff) {
                missingNotesIndexArr.push(++mNum)
            }
        }
        //if the difference btw the present index and the next one is greater than 1
        if ((allNotes[n + 1] - allNotes[n]) > 1) {
            var mNum = allNotes[n];
            var mDiff = allNotes[n + 1];
            while (mNum < (allNotes[n + 1] - 1)) {
                missingNotesIndexArr.push(++mNum)
            }
        }
        if (n == allNotes.length - 1) {
            highestNoteCount = allNotes[n];
            missingNotesIndexArr.push(++allNotes[n])
            //This is really not a missing number
            //This number is greater than the last number in the array so that the last number of the array will not be duplicated when the last noteCount is increamented
        }
    }

}

function addNote() {
    //first check if element already has a note attached to it
    if (elementToCommentOn.getAttribute('note') == null) {
        //first check if there are notesIndexes that are missing
        if (missingNotesIndexArr.length == 0) {
            ++notesCount;
            notesCountArray.push(notesCount);
        } else {
            notesCount = missingNotesIndexArr.shift(); //Removes the first element from an array and returns it.
            notesCountArray.push(notesCount);
            notesCountArray = [...new Float64Array(notesCountArray).sort()];
        }
        elementToCommentOn.setAttribute('note', notesCount);

        var noteDiv = document.createElement('DIV');
        //The note Div will have the same 'note' attribute value as the element it is a comment to
        noteDiv.classList.add('notes');
        noteDiv.setAttribute('note', notesCount);

        noteDiv.setAttribute('tabindex', 1);
        noteDiv.innerHTML = '<hr>' + 'note ' + notesCount;
        if (elementToCommentOn.classList.contains('divNode')) {
            noteDiv.innerHTML = '<hr><h2>' + elementToCommentOn.textContent.replace(/(<br>)/g, "") + '</h2>';
        }
        if (elementToCommentOn.classList.contains('svg-connectors')) {
            noteDiv.innerHTML = '<hr><h2>' + elementToCommentOn.getAttribute('connectedfrom') + '<em> : </em>' + elementToCommentOn.getAttribute('connectedto') + '</h2>';
        }
        noteDiv.contentEditable = 'true';
        //Assing eventListners to nodeDiv
        noteDiv.addEventListener('dblclick', noteDblClick);
        //Append new nodeDiv
        connectionDetails.appendChild(noteDiv);
        //highest noteCount
        highestNoteCount = notesCount;
    }

    hideContextMenu();
}

//function to make note editable on doubleClick
function noteDblClick() {
    //first, if any editable note before this, make it uneditable
    if ((prevEditableNote = connectionDetails.querySelector('[contenteditable="true"]')) && (prevEditableNote != this)) {
        prevEditableNote.contentEditable = 'false'
    }
    //Make note editable on doubleClick
    this.contentEditable = 'true'
}

var toggleCheck = 0;

function toggleConnectionDetails() {
    if (toggleCheck == '0') {
        connectionDetails.style.right = '-' + connectionDetails.offsetWidth + 'px';
        toggleCheck = 1;
    } else {
        connectionDetails.style.right = '';
        toggleCheck = 0;
    }
}
toggleConnectionDetails()

function deleteNote() {
    highestNoteCount = notesCountArray[notesCountArray.length - 1];
    notesCustomContextMenu.style.display = 'none'; //hide notes ContextMenu
    var noteIndex = Number(noteToDelete.getAttribute('note'));
    nodeCanvas.querySelector('[note="' + noteIndex + '"]').removeAttribute('note'); //remove the note attribute from the div or path to which the note to be deleted belongs
    notesCountArray.splice(notesCountArray.indexOf(noteIndex), 1)
    missingNotesIndexArr.push(Number(noteIndex)); //Add the noteIndex of the deleted note to the missingNotesIndexArr
    missingNotesIndexArr = [...new Float64Array(missingNotesIndexArr).sort()]; //Sort the array
    if (missingNotesIndexArr.indexOf((highestNoteCount + 1)) == -1) {
        missingNotesIndexArr.push(highestNoteCount + 1)
        missingNotesIndexArr = [...new Float64Array(missingNotesIndexArr).sort()];
    } else if (noteIndex == highestNoteCount) {
        missingNotesIndexArr = [...new Float64Array(missingNotesIndexArr).sort()];
    }
    noteToDelete.remove();
    noteToDelete = null;
}