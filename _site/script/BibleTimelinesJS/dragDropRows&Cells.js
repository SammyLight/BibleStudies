var storyLineTable = document.getElementById('storyLineTable');

var isDragging = false;
var elemBelow;
var parentElem;
var bodyElem = document.querySelector('body');
var tableElem = document.querySelector('table');
var trORtd;

function makeTdDraggable() {
	trORtd = '#storyLineTable td';
	document.addEventListener('mousedown', draggableTD)
}

function makeTrDraggable() {
	trORtd = '#storyLineTable tr';
	document.addEventListener('mousedown', draggableTD)
}

function makeNOT() {
	trORtd = '';
	document.removeEventListener('mousedown', draggableTD)
}

var draggableTD = function (event) {

	var dragElement = event.target.closest(trORtd);

	if (!dragElement) return;

	event.preventDefault();

	dragElement.ondragstart = function () {
		return false;
	};

	var coords, shiftX, shiftY;

	startDrag(dragElement, event.clientX, event.clientY);

	function onMouseUp(event) {
		finishDrag();
	};

	function onMouseMove(event) {
		moveAt(event.clientX, event.clientY);

		//GET THE ELEMENT OVER WHICH THE DRAGELEMENT PRESENTLY IS
		dragElement.hidden = true;

		var elemPresentlyOver = document.elementFromPoint(event.clientX, event.clientY)
		elemBelow = elemPresentlyOver;

		dragElement.hidden = false;

		//GET THE PARENT ELEMENT
		if ((trORtd == '.storyLineTable tr') && (elemBelow.nodeName == 'TD')) {
			elemBelow = elemBelow.parentNode;
		}

		if ((elemBelow == bodyElem) || (elemBelow == tableElem)) {
			parentElem = tableElem;
		} else {
			parentElem = elemBelow.parentNode;
		}
		//		console.log(parentElem);
	}

	// on drag start:
	//   remember the initial shift
	//   move the element position:fixed and a direct child of body
	function startDrag(element, clientX, clientY) {
		if (isDragging) {
			return;
		}

		isDragging = true;

		document.addEventListener('mousemove', onMouseMove);
		element.addEventListener('mouseup', onMouseUp);

		shiftX = clientX - element.getBoundingClientRect().left;
		shiftY = clientY - element.getBoundingClientRect().top;

		element.style.position = 'fixed';

		moveAt(clientX, clientY);
	};

	// switch to absolute coordinates at the end, to fix the element in the document
	function finishDrag() {
		if (!isDragging) {
			return;
		}

		isDragging = false;

		dragElement.style.position = '';
		parentElem.insertBefore(dragElement, elemBelow);
		document.removeEventListener('mousemove', onMouseMove);
		dragElement.removeEventListener('mouseup', onMouseUp);

	}

	function moveAt(clientX, clientY) {
		// new window-relative coordinates
		var newX = clientX - shiftX;
		var newY = clientY - shiftY;

		// check if the new coordinates are below the bottom window edge
		var newBottom = newY + dragElement.offsetHeight; // new bottom

		// below the window? let's scroll the page
		if (newBottom > legendNstoryLineHolder.clientHeight) {
			// window-relative coordinate of document end
			var docBottom = legendNstoryLineHolder.getBoundingClientRect().bottom;

			// scroll the document down by 10px has a problem
			// it can scroll beyond the end of the document
			// Math.min(how much left to the end, 10)
			var scrollY = Math.min(docBottom - newBottom, 10);

			// calculations are imprecise, there may be rounding errors that lead to scrolling up
			// that should be impossible, fix that here
			if (scrollY < 0) scrollY = 0;

			window.scrollBy(0, scrollY);

			// a swift mouse move make put the cursor beyond the document end
			// if that happens -
			// limit the new Y by the maximally possible (right at the bottom of the document)
			newY = Math.min(newY, legendNstoryLineHolder.clientHeight - dragElement.offsetHeight);
		}

		// check if the new coordinates are above the top window edge (similar logic)
		if (newY < 0) {
			// scroll up
			var scrollY = Math.min(-newY, 10);
			if (scrollY < 0) scrollY = 0; // check precision errors

			window.scrollBy(0, -scrollY);
			// a swift mouse move can put the cursor beyond the document start
			newY = Math.max(newY, 0); // newY may not be below 0
		}

		/*
				// limit the new X within the window boundaries
				// there's no scroll here so it's simple
				if (newX < 0) newX = 0;
				if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
					//      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
				}
		*/
		elemBelow.style.backgroundColor = 'lightgreen';
		// reset the color after a short delay
		setTimeout(function() {
			elemBelow.target.style.color = "";
		}, 50);
		dragElement.style.left = newX + 'px';
		dragElement.style.top = newY + 'px';
	}
}