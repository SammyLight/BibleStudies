//TO SHOW AND HIDE THE ITERACTIVITY CONTROLS
var interactivebuttons = document.getElementsByClassName('interactivebutton');
var makeInteractive = document.getElementById('makeInteractive');

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
        }
        else if (checkIfItIsHidden.toLowerCase() == 'from') {
            if (nodeCanvas.querySelector('.divNode.' + fromORto[i].getAttribute('connectedfrom')).style.display != 'none') {
                fadeInShow(fromORto[i], 300);
                //Show path's label if any
                if (pathLabeToToggle = nodeCanvas.querySelector('.pathLabel[labelfor="' + fromORto[i].id + '"]')) {
                    fadeInShow(pathLabeToToggle, 300);
                }
            }
        }
        else if (checkIfItIsHidden.toLowerCase() == 'to') {
            if (nodeCanvas.querySelector('.divNode.' + fromORto[i].getAttribute('connectedto')).style.display != 'none') {
                fadeInShow(fromORto[i], 300);
                //Show path's label if any
                if (pathLabeToToggle = nodeCanvas.querySelector('.pathLabel[labelfor="' + fromORto[i].id + '"]')) {
                    fadeInShow(pathLabeToToggle, 300);
                }
            }
        }
    }
}

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
//To determine Which Function to Call
function toggleDescendants(e) {
    if ((currentNode) && (aNodeHasBeenClicked == 1)) {
        if (allGenRadio.checked) {
            toggleAllDescendants();
        } else if (firstGenRadio.checked) {
            toggleFirstGeneration()
        } else if (allNfirstGenRadio.checked) {
            toggleAllnFirstGeneration()
        }
    }
}
var arrayOfAllDescendants = [];

function toggleAllDescendants(thisNode, showORhide) {
    if (!thisNode) {
        thisNode = currentNode
    }
    if ((thisNode.hasAttribute('connectTo')) && ((thisNode.getAttribute('connectTo')).trim().split(' ') != '')) {
        var connect2Array = [];
        var abc = (thisNode.getAttribute('connectTo')).trim().split(' ');
        connect2Array = connect2Array.concat(abc);

        //SHOW ALL DESCENDANTS AND CONNECTING PATHS OF SELECTED NODE IF THEY HAVE BEEN HIDDEN
        if (((!showORhide) || (showORhide == 'show')) && (thisNode.classList.contains('descendantshidden'))) {
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
        else if ((!showORhide) || (showORhide == 'hide') && (thisNode.classList.contains('descendantshidden') == false)) {
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

    hideContextMenu()
}

function toggleFirstGeneration() {
    if ((currentNode.hasAttribute('connectTo')) && ((currentNode.getAttribute('connectTo')).trim().split(' ') != '')) {
        var connect2Array = [];
        var abc = ((currentNode.getAttribute('connectTo'))).trim().split(' ');
        connect2Array = connect2Array.concat(abc);

        //SHOWS NEXT GENERATION NODES AND PATHS
        if (currentNode.classList.contains('descendantshidden')) {
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

    hideContextMenu()
}

function toggleAllnFirstGeneration(thisNode, showORhide) {
    if (!thisNode) {
        thisNode = currentNode
    }
    if ((thisNode.hasAttribute('connectTo')) && ((thisNode.getAttribute('connectTo')).trim().split(' ') != '')) {
        var connect2Array = [];
        var abc = (thisNode.getAttribute('connectTo')).trim().split(' ');
        connect2Array = connect2Array.concat(abc);

        //SHOW NEXT GENERATION AND CONNECTING PATHS ONLY
        if (currentNode.classList.contains('descendantshidden')) {
            connect2Array.forEach(descendant => {
                fadeInShow(nodeCanvas.querySelector('[nodeid=' + descendant + ']'), 300);
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

    hideContextMenu()
}