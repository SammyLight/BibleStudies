// Make the DIV element draggable:
//dragElement(document.getElementById("draggable"));
dragElement(document.getElementById("navSection4navDivButtonHolder"));
dragElement(document.getElementById("detailsSection"), "horizontal");
dragElement(document.getElementById("alternateStoryLineEditorButtons"), "horizontal");
dragElement(slideShowListMaster);
//dragElement(document.getElementById("timePeriodMenu"));

function dragElement(elmnt, dragDirection) {
	//if the dragDirection is set to "horizontal", then the element will only move horizontally
	//if the dragDirection is set to "vertical", then the element will only move vertically
	//if dragDirection is not set, it will move in all directions
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position (if dragDirection is not set, it will move in all directions)
		//if the dragDirection is set to "vertical", then the element will NOT move in horizontally
		if (dragDirection != "vertical") {
			elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		}
		//if the dragDirection is set to "horizontal", then the element will NOT move in vertically
		if (dragDirection != "horizontal") {
			elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		}
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}