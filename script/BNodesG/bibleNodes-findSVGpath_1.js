//On mouseDown on a divNode, make the clicked divNode the startElement and create a pointNode

function findSVGpathMouseDownFunction(e) {
    //create new pointNode
    pointNode.style.display = 'block';
    pointNode.style.left = e.clientX - pointNode.offsetWidth / 2 - nodeCanvasX + (window.pageXOffset || document.documentElement.scrollLeft) + 'px';
    pointNode.style.top = e.clientY - pointNode.offsetHeight / 2 - nodeCanvasY + (window.pageYOffset || document.documentElement.scrollTop) + 'px';

    nodeCanvas.addEventListener('mousemove', findSVGpathMouseMoveFunction);
    for (i=0; i < divNodes.length; i++) {
        divNodes[i].addEventListener('mouseup', identifyCurrentDiv);
    }
}
function identifyCurrentDiv(){
    previousNode = currentNode;
    currentNode = this;
    startElement = previousNode;
    endElement= currentNode;

    if(nodeCanvas.getElementsByClassName('svg-connectors').length == 0){
        if(endElement.getBoundingClientRect().left > startElement.getBoundingClientRect().left) {
            drawConnector(startElement, endElement);
        } else {
            drawConnector(endElement, startElement);
        }
    };
    nodeCanvas.getElementsByClassName('tempSVGline')[0].remove();
    pointNode.style.display = 'none';
}

function findSVGpathMouseMoveFunction(e) {
    //create new pointNode
    pointNode.style.display = 'block';
    pointNode.style.left = e.clientX - pointNode.offsetWidth / 2 - nodeCanvasX + (window.pageXOffset || document.documentElement.scrollLeft) + 'px';
    pointNode.style.top = e.clientY - pointNode.offsetHeight / 2 - nodeCanvasY + (window.pageYOffset || document.documentElement.scrollTop) + 'px';
        
    //Connect divs with svg line
    if(nodeCanvas.getElementsByClassName('tempSVGline').length == 0){
        drawConnector(currentNode, pointNode, 'tempSVGline');
    } else {
        nodeCanvas.getElementsByClassName('tempSVGline')[0].remove();
        drawConnector(currentNode, pointNode, 'tempSVGline');
    }
    nodeCanvas.addEventListener('mouseup', findSVGpathMouseUPFunction);
}

function findSVGpathMouseUPFunction(e) {

    nodeCanvas.removeEventListener('mousemove', findSVGpathMouseMoveFunction);
}