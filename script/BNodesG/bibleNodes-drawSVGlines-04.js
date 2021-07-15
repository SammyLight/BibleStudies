//This code requires the "connectTwoElementsWithCurvedLine.js" file--it is what creates the SVG lines/curves
var connectedSVGlines;
var nodeIDdivNotOriginatingFromCurrentNode = [];
var startNendNodesArrayOfDeletedSVGlines = [];
var fromToOfLinesArray = [];


//FUNCTION TO DRAW THE LINES AFTER THE nodeId ATTRIBUTES HAVE BEEN ASSIGNED
//Run the funciton to draw the initial SVG lines after all the divNodes have been assigned nodeIds

//Function to generate svgLines and other attributes from the start and end nodes
function drawSVGConnectingLine(originNode, endNode){
    //drawConnector(A, B, svgClass, svgColor, connectedTo, connect4rom)
    //Assign classes to the created svg line.
    //THe classes are the nodeIds of the start and end nodes of the svgline
    var startNodeId = originNode.getAttribute('nodeId')
    var endNodeId = endNode.getAttribute('nodeId')
    var arrayOfSVGLineClasses = [startNodeId, endNodeId];

    drawConnector(originNode, endNode, arrayOfSVGLineClasses, null, endNodeId, startNodeId);
}

//Draws SVGlines on pageLoad
function nodeToConnectTo(lineStart){
    var lineEnd = nodeCanvas.querySelector('[nodeid=' + lineStart.getAttribute('connectTo') + ']');
    drawSVGConnectingLine(lineStart, lineEnd)
}

function getConnectedSVGlines(){
    //(svg paths connected to a node will have its nodeId as one of their classes)
    //get all svg paths that have the nodeId of the currentNode as one of their classes
    connectedSVGlines = nodeCanvas.querySelectorAll('.svg-connectors.' + currentNode.getAttribute('nodeId'));
}

function connectFromStartNendNodesArrayOfDeletedSVGlines(){
    var SVGlineIsConnectedTo = null;
    var SVGlineIsConnectedFrom = null;
    startNendNodesArrayOfDeletedSVGlines = [];
    for(a=0; a<connectedSVGlines.length; a++){
        SVGlineIsConnectedFrom = connectedSVGlines[a].getAttribute('connectedfrom');
        startNendNodesArrayOfDeletedSVGlines.push(SVGlineIsConnectedFrom);
        SVGlineIsConnectedTo = connectedSVGlines[a].getAttribute('connectedto');
        startNendNodesArrayOfDeletedSVGlines.push(SVGlineIsConnectedTo);
    }
    for(aa=0; aa<startNendNodesArrayOfDeletedSVGlines.length; aa++){
        bb = aa + 2;
        var lineStart;
        var lineEnd;
        //startNode
        if(aa%2 == 0){
            lineStart = nodeCanvas.querySelector('[nodeid=' + startNendNodesArrayOfDeletedSVGlines[aa] + ']')
        }
        //endNode
        if(aa%2 == 1){
            lineEnd = nodeCanvas.querySelector('[nodeid=' + startNendNodesArrayOfDeletedSVGlines[aa] + ']');
            drawSVGConnectingLine(lineStart, lineEnd);
        }
    }
}
var labelsForAttr = [];
function removeConnectedSVGlines(){
    getConnectedSVGlines();
    for(i=0; i<connectedSVGlines.length; i++){
        labelsForAttr.push(connectedSVGlines[i].getAttribute('connectedfrom').replace('node', 'n') + connectedSVGlines[i].getAttribute('connectedto').replace('node', 'n'))
        connectedSVGlines[i].remove()
    }
}
function SVGmouseDownFunction() {
    fromToOfLinesArray = [];
    startNendNodesArrayOfDeletedSVGlines = [];
    //This will find all svgPaths connectedto the currentNode
    //This will generate 'connectedSVGlines'
    getConnectedSVGlines();

    for(cc=0; cc<startNendNodesArrayOfDeletedSVGlines.length; cc++){
        bb = cc + 2;
        var lineStart;
        var lineEnd;
        //startNode
        if(cc%2 == 0){
            lineStart = nodeCanvas.querySelector('[nodeid=' + startNendNodesArrayOfDeletedSVGlines[cc] + ']');
            fromToOfLinesArray.push(lineStart);
        }
        //endNode
        if(cc%2 == 1){
            lineEnd = nodeCanvas.querySelector('[nodeid=' + startNendNodesArrayOfDeletedSVGlines[cc] + ']');
            fromToOfLinesArray.push(lineEnd);
        }
    }
}

//Remove Previous SVG Line
function SVGmouseMoveFunction() {
        removeConnectedSVGlines();
        connectFromStartNendNodesArrayOfDeletedSVGlines();
        realignPathLabel();
}