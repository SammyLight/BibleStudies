function collisionSwitch() {
    if (evaluatedNode.hasAttribute('setclass')) {
        collisionDetectionOn = 1;
    } else {
        collisionDetectionOn = 0;
    }
}
var currentNodeWidth;
var currentNodeHeight;
var xbeforeMove;
var ybeforeMove;
var allBigCircles = nodeCanvas.getElementsByClassName('svg-Venn');
var movingCircle;
var movingcircles_SetClasses;
var cnClasses;

function currentNodeStartPosition(ccc) {
movingcircles_SetClasses = [];
    if (ccc == undefined) {
        ccc = currentNode;
    }
    cnClasses = ccc.classList;
    for (k = 0; k < cnClasses.length; k++) {
        if (cnClasses[k].startsWith('set')) {
            movingcircles_SetClasses.push(cnClasses[k]);
        }
    }

    movingCircle = document.getElementById(ccc.getAttribute('nodeid')); //the div's nodeId is its circle's Id
    currentNodeWidth = ccc.offsetWidth;
    currentNodeHeight = ccc.offsetHeight;
    xbeforeMove = Number(movingCircle.getAttribute('cx'));
    ybeforeMove = Number(movingCircle.getAttribute('cy'));
    // console.log(currentNodeWidth + ',' + currentNodeHeight)
    // console.log(xbeforeMove + ',' + ybeforeMove)

    detectCollision();
}

var movingX;
var movingY;
var circle2X;
var circle2Y;
var movingR;
var circle2;
var circle2R;

function detectCollision() {
    var circles2avoid = [];
    // for (k = 0; k < movingcircles_SetClasses.length; k++) {
        for (l = 0; l < allBigCircles.length; l++) {
            if ((movingcircles_SetClasses.indexOf(allBigCircles[l].id) == -1)) {
                circles2avoid.push(allBigCircles[l]);
            }
            // }
        }

    movingCircle = document.getElementById(evaluatedNode.getAttribute('nodeid'));
    movingX = Number(movingCircle.getAttribute('cx'));
    movingY = Number(movingCircle.getAttribute('cy'));
    movingR = Number(movingCircle.getAttribute('r'));
    for (i = 0; i < circles2avoid.length; i++) {
        circle2 = circles2avoid[i];
        circle2X = Number(circle2.getAttribute('cx'));
        circle2Y = Number(circle2.getAttribute('cy'));
        circle2R = Number(circle2.getAttribute('r'));
    }
    if(circles2avoid.length == 0){collisionDetectionOn = 0;}
    lastX = movingX;
    lastY = movingY;
}

function actIfCollision() {

    var dx = movingX - circle2X;
    var dy = movingY - circle2Y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < (movingR + circle2R)) {
        // collision detected!
        console.log('collision detected!')
        movingCircle.setAttribute('cx', xbeforeMove);
        movingCircle.setAttribute('cy', ybeforeMove);
        currentNode.style.left = xbeforeMove - currentNodeWidth / 2 + 'px';
        currentNode.style.top = ybeforeMove - currentNodeHeight / 2 + 'px';
    }
    circle2 = null;
    movingX;
    circle2X;
    movingY;
    circle2Y;
}