//createset is the main master function
// joinCirclesWithPaths(arrangeArray(document.getElementsByClassName('divNode')), 'divNodes');

/*
General diameter
Minimal circle
*/

/* Helper Functions */
//ANGLE BETWEEN TWO POINTS
function angle2points(p2, p1, angleType) {
    var p1 = {
        x: p1.offsetLeft + p1.offsetWidth / 2,
        y: p1.offsetTop + p1.offsetHeight / 2
    };

    var p2 = {
        x: p2.offsetLeft + p2.offsetWidth / 2,
        y: p2.offsetTop + p2.offsetHeight / 2
    };

    // angle in radians
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    // angle in degrees
    var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

    svgLine(p1.x, p1.y, p2.x, p2.y)

    if (angleType == "radians") {
        return angleRadians
    } else if ((angleType == "degrees") || (angleType == null)) {
        return angleDeg
    }
}

//GET DISTANCE BETWEEN TWO POINTS
function getDistance2Points(pAx, pAy, pBx, pBy) {
    // M = Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2))

    var dDistance = Math.sqrt(Math.pow((pAx - pBx), 2) + Math.pow((pAy - pBy), 2));

    console.log(dDistance);
    return (dDistance)
}

//GET THE DIAGONAL WIDTH OF AN ELEMENT
function getDiagonalWidth(A) {
    // M = Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2))

    var diagonalWidth = Math.sqrt(Math.pow((A.offsetWidth), 2) + Math.pow((A.offsetHeight), 2));

    return (diagonalWidth)
}

//GET DISTANCE BETWEEN TWO ELEMENTS (FINDING AND USING THEIR CENTER POINTS)
function getDistanceInner(A, B) {
    // M = Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2))

    var pA = {
        x: A.offsetLeft + A.offsetWidth / 2,
        y: A.offsetTop + A.offsetHeight / 2
    };
    var pB = {
        x: B.offsetLeft + A.offsetWidth / 2,
        y: B.offsetTop + B.offsetHeight / 2
    };

    var dDistance = Math.sqrt(Math.pow((pA.x - pB.x), 2) + Math.pow((pA.y - pB.y), 2));

    return (dDistance)
}

function getDistanceOuter(A, B) {
    // M = Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2))

    // innerDistance + radius of each element
    var innerDistance = getDistanceInner(A, B);
    var radiusA = getDiagonalWidth(A) / 2;
    var radiusB = getDiagonalWidth(B) / 2;

    innerDistance = innerDistance + radiusA + radiusB /*  + 20 */ ;

    return (innerDistance)
}

//GET MID-POINT BETWEEN TWO POINTS
function getMidPoint(A, B) {
    // M = ((x1+x2)/2 , (y1+y2)/2)

    var pA = {
        x: A.offsetLeft + A.offsetWidth / 2,
        y: A.offsetTop + A.offsetHeight / 2
    };
    var pB = {
        x: B.offsetLeft + B.offsetWidth / 2,
        y: B.offsetTop + B.offsetHeight / 2
    };

    var midPoint = {
        x: (pA.x + pB.x) / 2,
        y: (pA.y + pB.y) / 2
    };

    // if (A.offsetLeft < B.offsetLeft){
    //     mainX = A.offsetLeft + midPoint.x;
    // }else {mainX = B.offsetLeft + midPoint.x;}

    // if (A.offsetTop < B.offsetTop){
    //     mainX = A.offsetTop + midPoint.y;
    // }else {mainX = B.offsetTop + midPoint.y;}

    return (midPoint)
    //getMidPoint(A,B).x
    //getMidPoint(A,B).y
}

//VENN CREATOR

//FUNCTION TO DRAW SVG LINE BETWEEN TWO POINTS
function svgLine(ax, ay, bx, by) {
    var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    document.getElementById("svg").appendChild(line1);

    line1.setAttributeNS(null, "x1", ax);
    line1.setAttributeNS(null, "y1", ay);
    line1.setAttributeNS(null, "x2", bx);
    line1.setAttributeNS(null, "y2", by);
    line1.setAttributeNS(null, "stroke", "black");
    line1.setAttributeNS(null, "stroke-width", 2);
    line1.classList.add("svg-line");
}

//FUNCTION TO DRAW SVG LINE BETWEEN TWO POINTS
function svgCircle(ax, ay, radius, groupName, circleclass) {

    //if the circle already exists, delete it before redrawing it
    if (circle2delete = document.getElementById(groupName)) {
        circle2delete.remove()
    }

    var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    document.getElementById("svg").appendChild(circle1);

    circle1.setAttributeNS(null, "cx", ax);
    circle1.setAttributeNS(null, "cy", ay);
    circle1.setAttributeNS(null, "r", radius);
    circle1.setAttributeNS(null, "fill", 'rgba(139,69,19, 0.1)');
    // circle1.setAttributeNS(null, "transparent", 0.5);
    circle1.setAttributeNS(null, "stroke", "grey");
    circle1.setAttributeNS(null, "stroke-width", 2);
    circle1.classList.add(circleclass);
    // console.log(circleclass);
    // if (circleclass != null) {
    //     for (aaa = 0; aaa < circleclass.length; aaa++) {
    //         circle1.classList.add(circleclass[aaa]);
    //     }
    // }
    circle1.id = "" + (groupName || '');
}

function createCircle(A, B) {
    svgCircle(getMidPoint(A, B).x, getMidPoint(A, B).y, getDistanceInner(A, B) / 2, null, nodecircle)
}

//Function to get the nearest and farthest elements horizontally and vertically

//CONNECT ELEMENT IN A GROUP WITH A PATH

var nodeA = document.querySelector('[nodeId=node1]')
var nodeB = document.querySelector('[nodeId=node2]')
var nodeC = document.querySelector('[nodeId=node3]')
var nodeD = document.querySelector('[nodeId=node4]')
var nodesArray = [nodeA, nodeC, nodeB, nodeD];
// var copyArray = [nodeC, nodeB, nodeD];
// arrangeArray()

//Find Bounding Perimeter (convex hull)
function joinCirclesWithPaths(arrayName, setId) {
    var pathConnectingAll;
    var startM;
    var nL = arrayName.length;
    for (i = 0; i < nL; i++) {
        var elm = arrayName[i];
        elmX = getMidPoint(elm, elm).x;
        elmY = getMidPoint(elm, elm).y;
        if (i == 0) {
            startM = "M " + (elmX) + "," + (elmY) + " ";
            pathConnectingAll = startM;
        } else if (i != (nL - 1)) { //if it is not the last item in the array
            pathConnectingAll = pathConnectingAll + "L " + (elmX) + "," + (elmY) + " ";
        } else {
            pathConnectingAll = pathConnectingAll + "L " + (elmX) + "," + (elmY) + "z";
            console.log(pathConnectingAll);
            multipleNodesConnector(pathConnectingAll, setId)
        }
    }
    // ("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x + 75) + "," + (posnA.y) + " " + (posnB.x - 75) + "," + (posnB.y) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom)
}
// joinCirclesWithPaths(nodesArray);
function circleGroup(groupName) {
    var groupArray = document.getElementsByClassName(groupName);
    var lowX, highX, lowY, highY;
    if (groupArray.length == 1) {
        var A = groupArray[0];
        svgCircle(getMidPoint(A, A).x, getMidPoint(A, A).y, getDiagonalWidth(A) / 2, groupName, "svg-Venn")
    } else if (groupArray.length == 2) {
        for (i = 0; i < groupArray.length; i++) {
            var gi = groupArray[i]; 
            //Draw a circle around each element
            var Dxy = getDiagonalWidth(gi) / 2;
            var Ax = gi.offsetLeft + gi.offsetWidth / 2;
            var Ay = gi.offsetTop + gi.offsetHeight / 2;

            svgCircle(Ax, Ay, Dxy, gi.getAttribute('nodeid'))
        }
        var A = groupArray[0];
        var B = groupArray[1];
        svgCircle(getMidPoint(A, B).x, getMidPoint(A, B).y, getDistanceOuter(A, B) / 2, groupName, "svg-Venn")
    } else {
        for (i = 0; i < groupArray.length; i++) {
            var gi = groupArray[i]; //groupItem
            //work with line of same length with the diagonal distance
            //as if a circle was drawn around the element

            //Draw a circle around each element
            var Dxy = getDiagonalWidth(gi) / 2;
            var Ax = gi.offsetLeft + gi.offsetWidth / 2;
            var Ay = gi.offsetTop + gi.offsetHeight / 2;

            svgCircle(Ax, Ay, Dxy, gi.getAttribute('nodeid'))

            //Find the two farthest apart elements and make them the diameter of the circle to be drawn
            var smallX = gi.offsetLeft;
            var bigX = gi.offsetLeft + gi.offsetWidth;
            var smallY = gi.offsetTop;
            var bigY = gi.offsetTop + gi.offsetHeight;
            if (i == 0) {
                lowX = smallX;
                highX = bigX;
                lowY = smallY;
                highY = bigY;
            } else {
                if (lowX > smallX) {
                    lowX = smallX
                }
                if (highX < bigX) {
                    highX = bigX
                };
                if (lowY > smallY) {
                    lowY = smallY
                };
                if (highY < bigY) {
                    highY = bigY
                };
            }
        }
        var horDis = highX - lowX; //distance of vertically farthest objects
        var verDis = highY - lowY; //distance of horizontally farthest objets
        var largestRadius;
        if (verDis > horDis) {
            largestRadius = verDis / 2;
        } else {
            largestRadius = horDis / 2;
        }
        var currentSet = document.querySelector('#' + groupName);
        if (currentSet) {
            currentSet.remove()
        }
        svgCircle((lowX + (horDis / 2)), (lowY + (verDis / 2)), largestRadius + 100, groupName, "svg-Venn");
    }
    // svgCircle(getMidPoint(A, B).x, getMidPoint(A, B).y, getDistanceOuter(A, B) / 2);

}

//USE ARC TO DRAW AN OVAL SHAPE AROUND SET ITEMS
function createSet() {
    var divNodes2 = document.querySelectorAll('[nodeid]');
    for (j = 0; j < divNodes2.length; j++) {
        var dNodeClassList = divNodes2[j].classList;
        for (k = 0; k < dNodeClassList.length; k++) {
            if (dNodeClassList[k].startsWith('set')) {
                var setName = dNodeClassList[k];
                circleGroup(setName);
            }
        }
    }
}

createSet();