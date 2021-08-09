//GET THE DIAGONAL WIDTH OF AN ELEMENT
function getDiagonalWidth(A) {
    // M = Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2))
    var diagonalWidth = Math.sqrt(Math.pow((A.offsetWidth), 2) + Math.pow((A.offsetHeight), 2));
    return (diagonalWidth)
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

    return (midPoint)
    //getMidPoint(A,B).x
    //getMidPoint(A,B).y
}

//I initially tried using circles as in normal venn diagrams, but it required to much time to get right so I abandoned it for Rectangles instead.
//And I actually prefer the rectangles

//FUNCTION TO DRAW SVG RECTANGLE
function setRectangle(ax, ay, width, height, groupName, circleclass) {

    //if the rectangle already exists, delete it before redrawing it
    var allDivNodeOfSet = nodeCanvas.querySelectorAll('.divNode.' + groupName);
    //check to see if all divNodes of set are hidden or at least one is not
    function atLeastOneDivNodeIsShowing(x) {
        for (i = 0; i < x.length; i++) {
            if (x[i].style.display != 'none') {
                return true
            } 
        }
        return false
    }

    //if the set already exists and at least one of its members is showing
    if ((rect2modify = document.getElementById(groupName)) && (atLeastOneDivNodeIsShowing(allDivNodeOfSet))) {
        rect2modify.style.left = ax + "px";
        rect2modify.style.top = ay + "px";
        rect2modify.style.width = width + 'px';
        rect2modify.style.height = height + 'px';
    }
    //if the set already exists but all its members are display none
    else if (rect2modify = document.getElementById(groupName)) {
        rect2modify.style.left = "";
        rect2modify.style.top = "";
        rect2modify.style.width = "";
        rect2modify.style.height = "";
        // rect2delete.remove()
    }
    //if the set does not yet exist
    else {
        var rect1 = document.createElement("DIV");
        nodeCanvas.appendChild(rect1);

        rect1.style.left = ax + "px";
        rect1.style.top = ay + "px";
        rect1.style.width = width + 'px';
        rect1.style.height = height + 'px';
        rect1.classList.add(circleclass);
        rect1.id = "" + (groupName || '');
        rect1.innerHTML = `<h3 title=` + groupName.slice(3) + `>` + groupName.slice(3) + `</h3`;
        rect1.setAttribute('title', groupName.slice(3));
    }
}

//RECTANGLE (ELEMENTS) ARRAY
function rectangleGroup(groupName) {
    var groupArray = document.getElementsByClassName(groupName);
    var notHiddenNodes = [];
    for (i = 0; i < groupArray.length; i++) {
        if (groupArray[i].style.display != 'none') {
            notHiddenNodes.push(groupArray[i]);
        }
    }
    var x1;
    var y1;
    var x2;
    var y2;
    var gi;
    for (i = 0; i < notHiddenNodes.length; i++) {
        gi = notHiddenNodes[i];

        //Draw a circle around each element
        if (i == 0) {
            x1 = gi.offsetLeft;
            y1 = gi.offsetTop;
            x2 = gi.offsetLeft + gi.offsetWidth;
            y2 = gi.offsetTop + gi.offsetHeight;
        } else {
            bx1 = gi.offsetLeft;
            by1 = gi.offsetTop;
            bx2 = gi.offsetLeft + gi.offsetWidth;
            by2 = gi.offsetTop + gi.offsetHeight;
            //GENERATE COORDINATES FOR NEW ENCLOSING RECTANGLE
            if (bx1 < x1) {
                x1 = bx1
            } //top-most
            if (by1 < y1) {
                y1 = by1
            } //left-most
            if (bx2 > x2) {
                x2 = bx2
            } //bottom-most
            if (by2 > y2) {
                y2 = by2
            } //right-most
        }
    }
    // setRectangle(ax, ay, width, height,groupName, circleclass);
    setRectangle(x1 - 20, y1 - 50, (x2 - x1 + 40), (y2 - y1 + 70), groupName, "svg-Venn");
}
//CONVERT ARRAY OF ELEMENTS TO ARRAY OF MIDPOINTS OBJECTS
function createSet(shape) {
    if (currentNode) {
        var dNodeClassList = currentNode.classList;
        for (k = 0; k < dNodeClassList.length; k++) {
            if (dNodeClassList[k].startsWith('set')) {
                var setName = dNodeClassList[k];
                if (shape == 'circle') {
                    circleGroup(setName);
                }
                if (shape == 'rectangle') {
                    rectangleGroup(setName);
                }
            }
        }
    }
}

// createSet('rectangle');

//Mousedown eventListner for SET checkbox selection
nodeDivCustomContextMenu.addEventListener('mousedown', function (ev) {
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    //FOR SET SELECTION
    if (doesAnyAnscestorOfClass(target, 'setselect').truth == true) {
        parentLI = doesAnyAnscestorOfClass(target, 'setselect', nodeDivCustomContextMenu).parentOfClass;
        setClass = parentLI.querySelector('input').name;
        if (parentLI.querySelector('input').checked) {
            currentNode.classList.remove(setClass)
            rectangleGroup(setClass);
        } else {
            currentNode.classList.add(setClass);
            rectangleGroup(setClass);
        }
    }
});

//FOR SETS CHECKBOXES ON RIGHTCLICK CONTEXTMENU
//Checks for available sets and creates menu item with checkbox for it
function showCurrentValue(event) {
    const value = event.target.value;
    document.getElementById("setnewset").innerText = value;

    if (event.key === 'Enter') {
        if (value.trim() != '') { //GET SETS CHECBOXES
            setselect.innerHTML = setselect.innerHTML +
                `<li class='setselect'>
                    <input type="checkbox" id="input_set` + value + `" name="set` + value + `" value="` + value + `">
                    <label for="input_set` + value + `">` + value + `</label>
                </li>`
        }
        currentNode.classList.add("set" + value);
        rectangleGroup("set" + value);
        document.getElementById("input_set" + value).checked = true;
        document.getElementById("setnewset").value = '';
    }
}
//TO HIDE THE SETS CONTEXTMENU
function setsCMenu() {
    var setsCheckBoxes = nodeDivCustomContextMenu.querySelectorAll('#setselect>li');
    var setsListItem = [];
    setsListItem.push(setnewset);
    setsCheckBoxes.forEach(element => {
        setsListItem.push(element)
    });
    for (let i = 1; i <= setsListItem.length; i++) {
        setTimeout(() => showHideSiteNav(setsListItem[i - 1]), 20 * i)
    }
}
setsCMenu()

//Redraw currentNodes sets
function modifyCurrentNodesSets(){
    for (a = 0; a < currentNodesSetsArray.length; a++) {rectangleGroup(currentNodesSetsArray[a])}
}