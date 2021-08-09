//TO SHOW AND HIDE THE ITERACTIVITY CONTROLS
var interactivebuttons = document.getElementsByClassName('interactivebutton');
var makeInteractive = document.getElementById('makeInteractive');

//Function and EventListners for button to make divNodes hide or show their descendants
function interactivity() {
    if (makeInteractive.classList.contains('noninteractive')) {
        for (i = 0; i < interactivebuttons.length; i++) {
            interactivebuttons[i].style.display = '';
        }
        makeInteractive.classList.remove('noninteractive');
        nodeCanvas.addEventListener('mousedown', toggleDescendants);
        makeInteractive.classList.add('coloron');
    } else {
        for (i = 0; i < interactivebuttons.length; i++) {
            interactivebuttons[i].style.display = 'none';
            interactivebuttons[i].querySelector('input').checked = false;
        }
        makeInteractive.classList.add('noninteractive');
        makeInteractive.classList.remove('coloron');
    }
}

//To Determine Which of the ShowHideDescendants Funtions to Call
function toggleDescendants(e) {
    //toggle accordingly if it is a divnode that is clicked
    if (e.target.classList.contains('divNode')) {
        clickedNode = e.target;
        if (allGenRadio.checked) {
            toggleAllDescendants();
        } else if (firstGenRadio.checked) {
            toggleFirstGeneration();
        } else if (allNfirstGenRadio.checked) {
            toggleAllnFirstGeneration();
        }
    }
}

//Helper function to hide or show descendants
function showHidePath(SorH, fromORto, checkIfItIsHidden) {
    for (i = 0; i < fromORto.length; i++) {
        //Hide all paths connected FROM or TO the node
        if (checkIfItIsHidden == null) {
            if (SorH.toLowerCase() == 'hide') {
                fadeOutHide(fromORto[i], 300);
                //Hide path's label if any
                if (pathLabeToToggle = nodeCanvas.querySelector('.pathLabel[labelfor="' + fromORto[i].id + '"]')) {
                    fadeOutHide(pathLabeToToggle, 300);
                }
            }
            //Show all paths connected FROM or TO the node
            else if (SorH.toLowerCase() == 'show') {
                fadeInShow(fromORto[i], 300);
                //Show path's label if any
                if (pathLabeToToggle = nodeCanvas.querySelector('.pathLabel[labelfor="' + fromORto[i].id + '"]')) {
                    fadeInShow(pathLabeToToggle, 300);
                }
            }
        } else if (checkIfItIsHidden.toLowerCase() == 'from') {
            nodeLeadingFrom = nodeCanvas.querySelector('.divNode.' + fromORto[i].getAttribute('connectedfrom'));
            // console.log(nodeLeadingFrom);
            if (nodeLeadingFrom.style.display != 'none') {
                fadeInShow(fromORto[i], 300);
                //Show path's label if any
                if (pathLabeToToggle = nodeCanvas.querySelector('.pathLabel[labelfor="' + fromORto[i].id + '"]')) {
                    fadeInShow(pathLabeToToggle, 300);
                }
                //Check if all its descendants are showing or not by checking if the paths connecting from it are all showing or not
                // allChildrenShowing = 'yes';
                // console.log(fromORto[i]);
                // console.log(fromORto[i].getAttribute('connectedfrom'));
                // console.log(nodeCanvas.querySelectorAll('path[connectedfrom=' + fromORto[i].getAttribute('connectedfrom') + ']'));
                // allChildrenShowing = nodeCanvas.querySelectorAll('path[connectedfrom=' + fromORto[i].getAttribute('connectedfrom') + ']');
                // allChildrenShowing.forEach(connectedPaths => {
                //     if(connectedPaths.style.display == 'none'){nodeLeadingFrom.classList.remove('descendantshidden');}else{nodeLeadingFrom.classList.add('descendantshidden');}
                // })
            }
        } else if (checkIfItIsHidden.toLowerCase() == 'to') {
            nodeLeadingTo = nodeCanvas.querySelector('.divNode.' + fromORto[i].getAttribute('connectedto'));
            // console.log(nodeLeadingTo);
            if (nodeLeadingTo.style.display != 'none') {
                fadeInShow(fromORto[i], 300);
                //Show path's label if any
                if (pathLabeToToggle = nodeCanvas.querySelector('.pathLabel[labelfor="' + fromORto[i].id + '"]')) {
                    fadeInShow(pathLabeToToggle, 300);
                }
                // allChildrenShowing = 'yes';
                // console.log(nodeLeadingTo.getAttribute('connectto'));
                // if(nodeLeadingTo.getAttribute('connectto').trim().split(' ')){
                //     var a23 = nodeLeadingTo.getAttribute('connectto').trim().split(' ');
                //     var connecta23 = connecta23.concat(a23);
                //     console.log(connecta23);
                // }
            }
        }
    }
}
//THIS HIDES OR SHOWS ALL DESCENDANTS OF SELECTED NODE
//FUNCTIONS TO DETERMINE IF ALL DESCENDANTS OR JUST THE NEXT GENERATION SHOULD BE SHOWN/HIDDEN
function descendants2Toggle(allOrNextOnly) {
    if (allOrNextOnly == 'all') {
        firstGenRadio.checked = false;
        allNfirstGenRadio.checked = false;
    } else if (allOrNextOnly == 'firstGeneration') {
        allGenRadio.checked = false;
        allNfirstGenRadio.checked = false;
    } else if (allOrNextOnly == 'hideAllShowFirst') {
        firstGenRadio.checked = false;
        allGenRadio.checked = false;
    }
}

var arrayOfAllDescendants = [];

//FUNCTION SHOWS OR HIDES ALL DESCENDANTS OF CLICKED DIV-NODE
function toggleAllDescendants(thisNode, showORhide) {
    if (!thisNode) {
        thisNode = currentNode
    }
    if ((thisNode.hasAttribute('connectTo')) && ((thisNode.getAttribute('connectTo')).trim().split(' ') != '')) {
        var connect2Array = [];
        var abc = (thisNode.getAttribute('connectTo')).trim().split(' ');
        connect2Array = connect2Array.concat(abc);
        var areDescendantsHidden = thisNode.classList.contains('descendantshidden');

        //SHOW ALL DESCENDANTS AND CONNECTING PATHS OF SELECTED NODE IF THEY HAVE BEEN HIDDEN
        if (((!showORhide) || (showORhide == 'show')) && (areDescendantsHidden)) {
            connect2Array.forEach(descendant => {
                var currentDescendant = nodeCanvas.querySelector('[nodeid=' + descendant + ']')
                fadeInShow(currentDescendant, 300);
                var pathsFrom = svg.querySelectorAll('[connectedfrom=' + descendant + ']');
                var pathsTo = svg.querySelectorAll('[connectedto=' + descendant + ']');
                showHidePath('show', pathsFrom);
                showHidePath('show', pathsTo);
                toggleAllDescendants(currentDescendant, 'show');
            });
            thisNode.classList.remove('descendantshidden');
        }
        //HIDE ALL DESCENDANTS AND CONNECTING PATHS OF SELECTED NODE
        else if ((!showORhide) || (showORhide == 'hide') && (areDescendantsHidden == false)) {
            thisNode.classList.add('descendantshidden');
            connect2Array.forEach(descendant => {
                var currentDescendant;
                if (nodeCanvas.querySelector('[nodeid=' + descendant + ']').classList.contains('descendantshidden') == false) {
                    currentDescendant = nodeCanvas.querySelector('[nodeid=' + descendant + ']')
                    fadeOutHide(currentDescendant, 300);
                    // if(arrayOfAllDescendants.indexOf(currentDescendant) === -1){
                    var pathsFrom = svg.querySelectorAll('[connectedfrom=' + descendant + ']');
                    var pathsTo = svg.querySelectorAll('[connectedto=' + descendant + ']');
                    showHidePath('hide', pathsFrom)
                    showHidePath('hide', pathsTo)
                    //Hide descendants of current descendant
                    if (currentDescendant.classList.contains('descendantshidden') == false) {
                        toggleAllDescendants(currentDescendant, 'hide');
                    }
                }
            });
        }
    }
    //to redraw the set
    setTimeout(function() { for (a = 0; a < setsArray.length; a++) {rectangleGroup(setsArray[a])}; }, 300);
    hideContextMenu()
}

//FUNCTION SHOWS OR HIDES ONLY THE FIRST GENERATION OF DESCENDANTS OF CLICKED DIV-NODE
function toggleFirstGeneration() {
    if ((currentNode.hasAttribute('connectTo')) && ((currentNode.getAttribute('connectTo')).trim().split(' ') != '')) {
        var connect2Array = [];
        var abc = ((currentNode.getAttribute('connectTo'))).trim().split(' ');
        connect2Array = connect2Array.concat(abc);
        var areDescendantsHidden = currentNode.classList.contains('descendantshidden');

        //SHOWS NEXT GENERATION NODES AND PATHS
        if (areDescendantsHidden) {
            connect2Array.forEach(descendant => {
                fadeInShow(nodeCanvas.querySelector('[nodeid=' + descendant + ']'), 300);
                var pathsFrom = svg.querySelectorAll('[connectedfrom=' + descendant + ']');
                var pathsTo = svg.querySelectorAll('[connectedto=' + descendant + ']');
                //Show all paths connected FROM the node
                showHidePath('show', pathsFrom, 'to');
                //Show all paths connected TO the node
                showHidePath('show', pathsTo, 'from');
            });
            currentNode.classList.remove('descendantshidden');
        }
        //HIDES NEXT GENERATION NODES AND ALL PATHS CONNECTED TO CURRENT NODE
        else {
            connect2Array.forEach(descendant => {
                fadeOutHide(nodeCanvas.querySelector('[nodeid=' + descendant + ']'), 300);
                var pathsFrom = svg.querySelectorAll('[connectedfrom=' + descendant + ']');
                var pathsTo = svg.querySelectorAll('[connectedto=' + descendant + ']');
                showHidePath('hide', pathsFrom);
                showHidePath('hide', pathsTo);
            });
            currentNode.classList.add('descendantshidden');
        }
    }
    //to redraw the set
    setTimeout(function() { for (a = 0; a < setsArray.length; a++) {rectangleGroup(setsArray[a])}; }, 300);
    hideContextMenu()
}

//FUNCTION HIDES ALL DESCENDANTS OF CLICKED DIV-NODE BUT SHOWS ONLY THE FIRST GENERATION OF DESCENDANTS OF CLICKED DIV-NODE
function toggleAllnFirstGeneration(thisNode, showORhide) {
    if (!thisNode) {
        thisNode = currentNode
    }
    if ((thisNode.hasAttribute('connectTo')) && ((thisNode.getAttribute('connectTo')).trim().split(' ') != '')) {
        var connect2Array = [];
        var abc = (thisNode.getAttribute('connectTo')).trim().split(' ');
        connect2Array = connect2Array.concat(abc);
        var areDescendantsHidden = currentNode.classList.contains('descendantshidden');

        //SHOW NEXT GENERATIONS AND CONNECTING PATHS ONLY
        if (areDescendantsHidden) {
            connect2Array.forEach(descendant => {
                var currentDescendant = nodeCanvas.querySelector('[nodeid=' + descendant + ']');
                fadeInShow(currentDescendant, 300);
                var pathsFrom = svg.querySelectorAll('[connectedfrom=' + descendant + ']');
                var pathsTo = svg.querySelectorAll('[connectedto=' + descendant + ']');
                //Show all paths connected FROM the node
                showHidePath('show', pathsFrom, 'to')
                //Show all paths connected TO the node
                showHidePath('show', pathsTo, 'from')
            });
            currentNode.classList.remove('descendantshidden');
        }
        //HIDE ALL DESCENDANTS AND CONNECTING PATHS OF SELECTED NODE
        else if ((!showORhide) || (showORhide == 'hide')) {
            connect2Array.forEach(descendant => {
                var currentDescendant = nodeCanvas.querySelector('[nodeid=' + descendant + ']')
                fadeOutHide(currentDescendant, 300);
                var pathsFrom = svg.querySelectorAll('[connectedfrom=' + descendant + ']');
                var pathsTo = svg.querySelectorAll('[connectedto=' + descendant + ']');
                showHidePath('hide', pathsFrom);
                showHidePath('hide', pathsTo);
                toggleAllDescendants(currentDescendant, 'hide');
            });
            thisNode.classList.add('descendantshidden');
        }
    }
    //to redraw the set
    setTimeout(function() { for (a = 0; a < setsArray.length; a++) {rectangleGroup(setsArray[a])}; }, 300);
    hideContextMenu()
}