var documentHTML = document.querySelector('html');
var documentBody = document.querySelector('body');

var divTableContainer = document.getElementById('divTableContainer');
var masterTable = document.getElementById('masterTable');
var svgMaster = document.getElementById('svg');
var legendTable = document.querySelector('#legendTable');

var storyLineTable = document.getElementById('storyLineTable');
var stLtBody = document.getElementsByTagName('tbody');
var rows = storyLineTable.getElementsByTagName('tr');
var allRowz = rows;
var allCells = storyLineTable.getElementsByTagName('td');
var cells = allCells;

var alternateStoryLineEditorButtons = document.getElementById('alternateStoryLineEditorButtons');

var storyLineTableTitleHeader = document.getElementById('storyLineTableTitleHeader');

var storyLineTableTHead = storyLineTable.querySelector('thead');
var storyLineTHeadRowz = storyLineTableTHead.getElementsByTagName('tr');

var timePeriodMenu = document.getElementById('timePeriodMenu');
var onPageLoadTimeMenuWidth;
var timeMenuListDiv = document.getElementById('timeMenuListDiv');
var timeMenuList = document.getElementById('timeMenuList');
var timesMenuH3 = document.getElementById('timesMenuH3');
var rowNamesArray = [];
var rowsNameLLowerCaseArray = [];

var customAlertBack = document.getElementById('customAlertBack');

var divDeleteButton = document.querySelector('#divDeleteButton');
var deletButtonColorTimeOut;
var clickedDIVColorTimeOut;
var initialColor;
var connectAccording2RowNames = 0;

var TypeOfHtmlHeader = 'H4';
var celldeselect;
var tblReady;
var selectedCell;

var clickedDIV;
var nameLabelDiv = storyLineTable.getElementsByClassName('nameLabelDiv');
var divNameArray = [];
var divClassArray = [];
var divClassAttributeArray = [];
var divNameAttributeArray = [];
var divopt_ClassArray = [];
var opacityCounter = 0;
var divNameOptionsDropdown = document.getElementById('divNameOptionsDropdown');
var divClassOptionsDropdown = document.getElementById('divClassOptionsDropdown');
var addDetailKeys;
var locationsArray = [];

var expandMinimizeButtons = document.querySelectorAll('.expandMinimizeButton');

function toggleAllMasterNavBtnz() {
	expandMinimizeButtons.forEach(function (btn) {
		if (btn.innerHTML != '&#9776;') {
			btn.click()
		};
	})
}


/*HOW TO CONNECT THE DIVS******************************/
/******************************************************/
function howShouldDivsBeConnected(x) {

	for (i = 0; i < rows.length; i++) {
		if (!rows[i].getAttribute('rowname')) {
			customAlert('ONLY ACTORS IN TIMLINES WITH ROWNAME WILL BE CONNECTED!')
			break;
		}
	}

	if (connectByTimelines.checked == true) {
		connectAccording2RowNames = 0;
		connectByTimelines.checked = false;
		connectAllDraggableDivsWithSVGLines();
		x.style.backgroundColor = '';
	} else if (connectByTimelines.checked == false) {
		connectAccording2RowNames = 1;
		connectByTimelines.checked = true;
		connectAllDraggableDivsWithSVGLines();
		x.style.backgroundColor = 'pink';
	}
}
/******************************************************/
/******************************************************/

//CUSTOM ALERT
function customAlert(x) {
	customAlertBack.style.display = 'flex';
	customAlertContent.innerHTML = x;

}

function customAlertClose() {
	customAlertBack.style.display = 'none';
}
/*FUNCTION TO REMOVE ALL CHILDREN OF PARENT*/
function removeAllChildNodesOf(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

//FUNCTION FOR REMOVING CLASSES
function removeClassByPrefix(node, prefix) {
	var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
	node.className = node.className.replace(regx, '');
	return node;
}

/****************************************************/
/*GENERATE LOCATIONS ARRAY***************************/
/****************************************************/
function generateLocationsArrayOnLoad() {
	//	var locationsMenuList = document.getElementById('locationsMenuList');
	var locationsLabels = locationsMenuList.querySelectorAll('label');
	if (locationsLabels) {
		for (i = 0; i = locationsLabels.length; i++) {
			var location = locationsLabels[i].getAttribute('for');
			if (locationsArray.indexOf(location) == -1) {
				locationsArray.push(location);
			};
		}
	}
}
/****************************************************/
/****************************************************/

/****************************************************/
/*GENERATE LABEL/ACTORS ARRAYS ONLOAD****************/
/****************************************************/
function generateActorsNodesArrayOnLoad() {
	for (i = 0; i < nameLabelDiv.length; i++) {

		var divzClass = nameLabelDiv[i].getAttribute('divclassname');
		var divzName = nameLabelDiv[i].innerHTML;

		//ARRAYS FOR DIV'S & THEIR CLASSES
		if (divClassArray.indexOf(divzClass) == -1) {
			divClassArray.push(divzClass);
			buildActorsMenu(divzClass);
			divopt_ClassArray.push('opt_' + divzClass);
		}
		if (divNameArray.indexOf(divzName) == -1) {
			divNameArray.push(divzName)
		}
	}
}
/****************************************************/
/****************************************************/

/******************************************************/
/******************************************************/

//TO DESELECT TD ON CLICK OUTSIDE THE TABLE
function deslectOnClickAway() {
	divTableContainer.addEventListener('click', function (e) {
		if (e.target !== this) return; {

			if ((celldeselect !== undefined) && (celldeselect.classList.contains('clicked') == true)) {
				var h2r = celldeselect.querySelector(TypeOfHtmlHeader);

				if (h2r.innerHTML == "") {
					h2r.remove()
					celldeselect.style.backgroundColor = '';
					celldeselect.classList.remove('clicked');
				}
			}
			connectAllDraggableDivsWithSVGLines();
		}
	})
}

//ONLOAD FUNCTIONS
onload = onloadAnalysis();

function onloadAnalysis() {

	rowListeners();
	cellListeners();
	deslectOnClickAway();

	/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DRAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED****************************************/
	var tdsWithDragOverELAddedClass = storyLineTable.querySelectorAll('.dragOverELAdded');
	if (tdsWithDragOverELAddedClass) {
		for (i = 0; i < tdsWithDragOverELAddedClass.length; i++) {
			tdsWithDragOverELAddedClass[i].classList.remove('dragOverELAdded');
		}
	}
	var divsWithdragEventListnerAddedClass = storyLineTable.querySelectorAll('.dragEventListnerAdded');
	if (divsWithdragEventListnerAddedClass.length != 0) {
		/***************************************************/
		nameLabelDiv = storyLineTable.getElementsByClassName('nameLabelDiv');
		/***************************************************/
		for (i = 0; i < divsWithdragEventListnerAddedClass.length; i++) {
			divsWithdragEventListnerAddedClass[i].classList.remove('dragEventListnerAdded');

			/*TO REBUILD THE divClassAttributeArray**********************/
			var divClassNameAttrValue = divsWithdragEventListnerAddedClass[i].getAttribute('divClassName');
			//ADD THE CLASS TO THE ARRAY IF IT DOESN'T ALREADY EXIST IN IT
			if (divClassAttributeArray.indexOf(divClassNameAttrValue) == -1) {
				divClassAttributeArray.push(divClassNameAttrValue)
			}
			/************************************************************/
		}

		connectAllDraggableDivsWithSVGLines();
		//		dragDiv2TD();
		divListeners();
		if (clickedCell) {
			deselectEmptyCell();
		}
		buildLegendTable();
		resetClasses();
	}
	/*****************************************/
	else {
		generateColumnClasses();
	}

	//////////////////////////////////////////////
	//instead of btn_buildLegendTable() function;
	dragDiv2TD();
	divListeners();
	if (clickedCell) {
		deselectEmptyCell();
	}
	buildLegendTable();
	resetClasses();
	//////////////////////////////////////////////
	buildLegendTable();

	/****************************************************/
	/*ASSIGN EVENT LISTNERS TO CHECKBOXES****************/
	/****************************************************/
	var labelListNameCheckBox = document.querySelectorAll('input.labelListNameCheckBox');
	if (labelListNameCheckBox.length > 0) {
		for (i = 0; i < labelListNameCheckBox.length; i++) {
			labelListNameCheckBox[i].addEventListener('click', function () {
				if (this.checked) {
					var classOfDivsToHide = this.value;
					var allDivsofClassToHide = masterTable.getElementsByClassName(classOfDivsToHide);
					for (i = 0; i < allDivsofClassToHide.length; i++) {
						allDivsofClassToHide[i].style.display = "none";
					}
					connectAllDraggableDivsWithSVGLines();
				} else if (!this.checked) {
					var classToShow = this.value;
					var allDivsofClassToHide = masterTable.getElementsByClassName(classToShow);

					for (i = 0; i < allDivsofClassToHide.length; i++) {
						allDivsofClassToHide[i].style.display = "";
					}
					connectAllDraggableDivsWithSVGLines();
				}
			});
		}
		connectAllDraggableDivsWithSVGLines();
	}

	generateLocationsArrayOnLoad();
	timeLinesMenu();
	
	//GENERATE ACTORS NODES ARRAY AND MENU
	generateActorsNodesArrayOnLoad()
}

/*BECAUSE COORDINATES CHANGE WHEN BROWSER WINDOW IS RESIZED******************************/
/****************************************************************************************/
window.addEventListener("resize", function () {
	btn_buildLegendTable();
	connectAllDraggableDivsWithSVGLines();
});
/****************************************************************************************/
/****************************************************************************************/

function analyzeTable() {
	rowListeners();
	cellListeners();
	resetClasses();
	deselectEmptyCell();
	buildLegendTable();

}
/*CHANGE CONTROL AND DETAILS SECTION Z-INDEX*********************************************/

alternateStoryLineEditorButtons.addEventListener('mousedown', function (e) {
	var a = getComputedStyle(alternateStoryLineEditorButtons, null).getPropertyValue('z-Index');
	var d = getComputedStyle(detailsSection, null).getPropertyValue('z-Index');
	var aN = Number(a);
	var dN = Number(d);

	if (aN < dN) {
		alternateStoryLineEditorButtons.style.zIndex = dN;
		detailsSection.style.zIndex = aN;
	}
})

detailsSection.addEventListener('mousedown', function (e) {
	var a = getComputedStyle(alternateStoryLineEditorButtons, null).getPropertyValue('z-Index');
	var d = getComputedStyle(detailsSection, null).getPropertyValue('z-Index');
	var aN = Number(a);
	var dN = Number(d);

	if (dN < aN) {
		alternateStoryLineEditorButtons.style.zIndex = dN;
		detailsSection.style.zIndex = aN;
	}
})

/****************************************************************************************/


/*EMPTY CELL DESELECT*********************************************************************/

function deselectEmptyCell() {
	var h2r = celldeselect.querySelector(TypeOfHtmlHeader);
	emptyCellDeselect(h2r);
}

/***********/
function emptyCellDeselect(v) {
	if (celldeselect.classList.contains('clicked') == true) {
		if (v.innerHTML == "") {
			v.remove()
		}
		celldeselect.style.backgroundColor = '';
		celldeselect.classList.remove('clicked');
	}
}

/***********************************************************************/

/*RESET CLASSES***************************************************************************/

function resetClasses() {
	//REMOVE ALL CLASSES PREFIXED WITH 'COL-'
	//	var allCells = storyLineTable.getElementsByTagName('td');
	for (i = 0; i < allCells.length; i++) {
		removeClassByPrefix(allCells[i], 'col-');
	}
	//RESET ALL THE COL-X CLASSES
	generateColumnClasses();

	//	var allRowz = storyLineTable.querySelectorAll('tr');
	for (i = 0; i < allRowz.length; i++) {
		var allTdzInRow = allRowz[i].querySelectorAll('td');
		for (j = 0; j < allTdzInRow.length; j++) {
			allTdzInRow[j].setAttribute('rIndex', i)
		}
	}
}

/*HIGHLIGHT CLICKED CELL******************************************************************/
var prev_x = null;

function cellHighlight(x) {
	if (makeEditableCheckbox.checked == true) {

		var heading = document.createElement(TypeOfHtmlHeader);
		var hdtxt = '';

		if (prev_x != null) {
			prev_x.classList.remove('clicked');
			prev_x.style.backgroundColor = '';

			//REMOVE HEADING FROM THE PREVIOUSLY CLICKED ELEMENT IF IT WAS NOT MODIFIED
			if ((prev_x.querySelector(TypeOfHtmlHeader)) && (prev_x.querySelector(TypeOfHtmlHeader).innerHTML == hdtxt)) {
				prev_x.querySelector(TypeOfHtmlHeader).remove();
			}
		}
		prev_x = x;

		x.style.backgroundColor = 'white';
		x.classList.add('clicked');

		//IF THERE IS NO HEADING CREATE ONE
		if (!x.querySelector(TypeOfHtmlHeader)) {
			heading.setAttribute('contentEditable', 'true');
			heading.innerHTML = hdtxt;
			x.prepend(heading);
			var h2r = x.querySelector(TypeOfHtmlHeader);

			function shs() {
				if (h2r.innerHTML == hdtxt) {
					h2r.remove()
				}
			}

			setTimeout(() => [x.style.backgroundColor = '', x.classList.remove('clicked'), shs(), connectAllDraggableDivsWithSVGLines()], 5000);
			//	setTimeout(() => [], 22000);
		}
	}
}
/*****************************************************************************************/
/*****************************************************************************************/



/*****************************************************************************************/
/*ONCLICK EVENTLISTENERS******************************************************************/
/*****************************************************************************************/

var clickedRow;
var clickedCell;
var aboveRow;
var belowRow;
var beforeCell;
var afterCell;
var newIrow;
var newIcell;

//FIND ROW INDEX OF CLICKED CELL/ROW

function rowListeners() {

	for (i = 0; i < rows.length; i++) {
		rows[i].onclick = function () {
			newIrow = null;
			clickedRow = this.rowIndex;
			aboveRow = newIrow || clickedRow;
			belowRow = (newIrow || clickedRow) + 1;

			aRowIsClicked = 1;

			rowListeners();
		}
	}
}

//FIND INDEX OF CLICKED CELL
function cellListeners() {
	//	var cells = storyLineTable.querySelectorAll('td');
	for (i = 0; i < cells.length; i++) {
		cells[i].onclick = function () {
			newIcell = null;
			clickedCell = this.cellIndex;

			beforeCell = newIcell || clickedCell;
			afterCell = (newIcell || clickedCell) + 1;

			//HIGHLIGHT CLICKED CELL TO INDICATE CLICKED CELL AND ROW
			cellHighlight(this);
			celldeselect = this;
			selectedCell = this;

			//REDRAW SVG CONNECTOR LINES
			connectAllDraggableDivsWithSVGLines();
			//CREATE DETAILS KEY WHEN CELL IS CLICKED
			addDetailKeys();

			aCellIsClicked = 1;
		}
	}
}

//FIND INDEX OF CLICKED DIV
function divListeners() {
	//	var cells = storyLineTable.querySelectorAll('td');
	var allDivs;
	for (i = 0; i < cells.length; i++) {
		allDivs = cells[i].querySelectorAll('div');

		for (j = 0; j < allDivs.length; j++) {
			var divClickCounter = 0;

			allDivs[j].onclick = function () {
				if (clickedDIV) {
					clickedDIV.style.backgroundColor = initialColor;
					clearTimeout(deletButtonColorTimeOut);
					clearTimeout(clickedDIVColorTimeOut);
				}

				clickedDIV = this;
				initialColor = this.style.backgroundColor;
				this.style.backgroundColor = "lightgrey";

				initialdeleteDivBtnColor = divDeleteButton.style.backgroundColor;
				divDeleteButton.style.backgroundColor = 'pink';

				clickedDIVColorTimeOut = setTimeout(() => [clickedDIV.style.backgroundColor = initialColor], 5000);
				deletButtonColorTimeOut = setTimeout(() => [divDeleteButton.style.backgroundColor = ''], 5000);
			}
		}
	}
}

/*****************************************************************************************************/
/*CELLS***********************************************************************************************/
/*****************************************************************************************************/

//CREATE CELL BEFORE CLICKED CELL
function createCellBefore() {
	var x = document.getElementById('myText').value;
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].insertCell(newIcell || beforeCell);
	cell.innerHTML = x || '';

	newIcell = (newIcell || beforeCell) + 1;

	analyzeTable();
	connectAllDraggableDivsWithSVGLines();
}

//CREATE CELL AFTER CLICKED CELL
function createCellAfter() {
	var x = document.getElementById('myText').value; //GETS VALUE FROM INPUT BOX
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].insertCell(afterCell);
	cell.innerHTML = x || '';

	analyzeTable();
	connectAllDraggableDivsWithSVGLines();
}

//INCREASE CELL COLSPAN
function increaseCellColspan() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td')[clickedCell];
	var currentColspan = cell.getAttribute('colspan');
	++currentColspan;
	currentColspan = cell.setAttribute('colspan', currentColspan);

	analyzeTable();
}

//DECREASE CELL COLSPAN
function decreaseCellColspan() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td')[clickedCell];
	var currentColspan = cell.getAttribute('colspan');
	currentColspan = (currentColspan - 1) || 1;
	currentColspan = cell.setAttribute('colspan', currentColspan);

	analyzeTable();
}


//DELETE CELL
function deleteCell() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td');
	cell[clickedCell].style.display = 'none';
}

//HIDE CELL
function hideCell() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td');
	cell[clickedCell].style.visibility = 'hidden';

	analyzeTable();
}

//DESTROY CELL (I.E. REMOVE FROM DOM)
function destroyCell() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td');
	cell[clickedCell].remove();

	analyzeTable();
}

//SELECT CELLS TO MERGE
var cellSelectBtn;
var selectCellsToMerge = 1; //TO DETERMINE IF CELLS CAN BE SELECTED FOR MERGING OR NOT
var mergeColspan = 0;
var shouldContentsBeMerged;
var active = 'aquamarine';
var deactivated = '';
var cellsContentBtn;
var cCBtnCounter = 0;
var selectedCellsArray = [];
var controlArray = [];
var controlArray4RowIndex = [];


function selectCells(dbtn) {

	if (selectCellsToMerge == 1) {

		dbtn.style.background = active;
		selectCellsToMerge = 0
		cellSelectBtn = dbtn;
		shouldContentsBeMerged = 1;

		var cells = storyLineTable.querySelectorAll('td');

		for (i = 0; i < cells.length; i++) {
			cells[i].onclick = function () {

				if ((!this.classList.contains('selected')) && (dbtn.style.background == active) && (this.rowSpan == 1)) {
					this.style.backgroundColor = 'pink';
					this.classList.add('selected')
					var cspan = this.colSpan;
					mergeColspan = mergeColspan + cspan;
					selectedCellsArray.push(this); //ADD THE CLICKED CELL TO THE SELECTED CELLS ARRAY
					controlArray.push(this.cellIndex); //GET THE CELL INDEX OF THE CLICKED CELL AND ADD IT TO THE CONTROL ARRAY
					var clickedCellRowIndex = this.getAttribute('rIndex'); //GET ROW INDEX FROM CUSTOM ATTRIBUTE 'rIndex'
					controlArray4RowIndex.push(clickedCellRowIndex); //GET THE INDEX OF THE CLICKED ROW

				} else if (this.classList.contains('selected')) {
					this.style.backgroundColor = '';
					var cspan = this.colSpan;
					mergeColspan = mergeColspan - cspan;

					index2Remove = selectedCellsArray.indexOf(this);
					selectedCellsArray.splice(index2Remove, 1);
					controlArray.splice(index2Remove, 1);
					controlArray4RowIndex.splice(index2Remove, 1);

					this.classList.remove('selected')
				}
			}
		}

	} else if (selectCellsToMerge == 0) {
		dbtn.style.background = deactivated;
		selectCellsToMerge = 1;
		cellSelectBtn = null;
		shouldContentsBeMerged = null;
		selectedCellsArray = [];
		controlArray = [];
		controlArray4RowIndex = [];

		if (cellsContentBtn) {
			cellsContentBtn.style.background = deactivated;
		}

		var deselect = document.querySelectorAll('.selected');
		for (k = 0; k < deselect.length; k++) {
			deselect[k].style.backgroundColor = '';
			deselect[k].classList.remove('selected');
			mergeColspan = 0;
		}
	}
}

//TO MERGE CONTENTS OF MERGED CELLS
function mergeContents(cCBtn) {
	if (shouldContentsBeMerged == 1) {
		cCBtn.style.background = active;
		shouldContentsBeMerged = 0;
		cellsContentBtn = cCBtn;
	} else if (shouldContentsBeMerged == 0) {
		cCBtn.style.background = deactivated;
		cellsContentBtn = null;
		shouldContentsBeMerged = 1;
	}

}

//MERGE CELL
function mergeCells() {
	cellSelectBtn.style.background = deactivated;
	cellSelectBtn = null;
	selectCellsToMerge = 1;

	if (cellsContentBtn) {
		cellsContentBtn.style.background = deactivated;
	}
	shouldContentsBeMerged = 1;
	cellsContentBtn = null;
	var sca = selectedCellsArray;
	var controlIndex = controlArray.indexOf(Math.min(...controlArray)); //FIND THE INDEXOF THE LOWEST ELEMENT IN THE CONTROL ARRAY. THIS WILL BE THE INDEX OF THE ELEMENT IN THE CLICKED ARRAY TO KEEP 

	for (s = 0; s < sca.length; s++) {
		if (s != controlIndex) {
			sca[s].remove()
		}
		sca[controlIndex].colSpan = mergeColspan;
		sca[controlIndex].setAttribute('originalcolspan', mergeColspan);
		sca[controlIndex].style.background = deactivated;
		sca[controlIndex].classList.remove('selected');
	}

	controlArray4RowIndex = [];
	selectedCellsArray = [];
	controlArray = [];
	mergeColspan = 0;

	analyzeTable();
}

//SPLIT CELL
function splitCell() {
	cellSelectBtn.style.background = deactivated;
	cellSelectBtn = null;
	selectCellsToMerge = 1;

	if (cellsContentBtn) {
		cellsContentBtn.style.background = deactivated;
	}

	var sca = selectedCellsArray;
	for (i = 0; i < sca.length; i++) {
		if (sca[i].colSpan > 1) {
			var numOfCells2Make = (sca[i].colSpan) - 1;
			for (j = 0; j < numOfCells2Make; j++) {
				//				var x = document.getElementById('myText').value;//GETS VALUE FROM INPUT BOX
				var row = storyLineTable.querySelectorAll('tr');
				var splitRowIndex = row[controlArray4RowIndex[i]];
				var cell = splitRowIndex.insertCell(controlArray[i] + 1);
				//				cell.innerHTML = 'splitCell';
			}
			sca[i].colSpan = 1;
			sca[i].setAttribute('originalcolspan', 1);
		}
		sca[i].style.background = deactivated;
		sca[i].classList.remove('selected');
	}

	controlArray4RowIndex = [];
	selectedCellsArray = [];
	controlArray = [];
	mergeColspan = 0;

	analyzeTable();
}
/****************************************************************************************************/
/****************************************************************************************************/

/****************************************************************************************************/
/*ROWS***********************************************************************************************/
/****************************************************************************************************/
//CREATE ROW ABOVE CLICKED ROW
var x = 0;

function createRowAbove() {
	var cellZ2deselect = storyLineTable.querySelectorAll('.clicked');
	for (i = 0; i < cellZ2deselect.length; i++) {

		celldeselect = cellZ2deselect[i];
		var h2r = celldeselect.querySelector(TypeOfHtmlHeader);

		celldeselect.style.backgroundColor = '';
		celldeselect.classList.remove('clicked');
	}

	var itm = storyLineTable.querySelectorAll('tr')[newIrow || aboveRow];
	var cln = itm.cloneNode(true);
	var clonedRow = itm.before(cln);
	/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DTAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED****************************************/
	var clonedRowTds = cln.querySelectorAll('td');


	for (i = 0; i < clonedRowTds.length; i++) {
		clonedRowTds[i].innerHTML = '';
		if (clonedRowTds[i].classList.contains('dragOverELAdded')) {
			clonedRowTds[i].classList.remove('dragOverELAdded');
		}
	}
	/*****************************************/
	newIrow = (newIrow || aboveRow) + 1;

	analyzeTable();
	//	generateColumnClasses();
	dragDiv2TD();
	divListeners();
	connectAllDraggableDivsWithSVGLines();
}

//CREATE ROW BELOW CLICKED ROW
function createRowBelow() {
	var cellZ2deselect = storyLineTable.querySelectorAll('.clicked');
	for (i = 0; i < cellZ2deselect.length; i++) {

		celldeselect = cellZ2deselect[i];
		var h2r = celldeselect.querySelector(TypeOfHtmlHeader);

		celldeselect.style.backgroundColor = '';
		celldeselect.classList.remove('clicked');
	}

	var itm = storyLineTable.querySelectorAll('tr')[newIrow || aboveRow];
	var cln = itm.cloneNode(true);
	var clonedRow = itm.after(cln);
	/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DTAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED****************************************/
	var clonedRowTds = cln.querySelectorAll('td');


	for (i = 0; i < clonedRowTds.length; i++) {
		clonedRowTds[i].innerHTML = '';
		if (clonedRowTds[i].classList.contains('dragOverELAdded')) {
			clonedRowTds[i].classList.remove('dragOverELAdded');
		}
	}
	/*****************************************/
	newIrow = (newIrow || aboveRow) + 1;

	analyzeTable();
	//	generateColumnClasses();
	dragDiv2TD();
	divListeners();
	connectAllDraggableDivsWithSVGLines();
}

//CLONE ROW ABOVE CLICKED ROW
function cloneRowAbove() {
	var itm = storyLineTable.querySelectorAll('tr')[newIrow || aboveRow];
	var cln = itm.cloneNode(true);
	var clonedRow = itm.before(cln);
	/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DTAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED****************************************/
	var clonedRowTds = cln.querySelectorAll('.dragOverELAdded');
	if (clonedRowTds) {
		for (i = 0; i < clonedRowTds.length; i++) {
			clonedRowTds[i].classList.remove('dragOverELAdded');
		}
	}
	var divsInClonedRow = cln.querySelectorAll('.dragEventListnerAdded');
	if (divsInClonedRow) {
		for (i = 0; i < divsInClonedRow.length; i++) {
			divsInClonedRow[i].classList.remove('dragEventListnerAdded')
		}
	}
	/*****************************************/
	newIrow = (newIrow || aboveRow) + 1;

	var cellZ2deselect = storyLineTable.querySelectorAll('.clicked');
	for (i = 0; i < cellZ2deselect.length; i++) {

		celldeselect = cellZ2deselect[i];
		var h2r = celldeselect.querySelector(TypeOfHtmlHeader);

		if (h2r.innerHTML == "") {
			h2r.remove()

			celldeselect.style.backgroundColor = '';
			celldeselect.classList.remove('clicked');

		}
	}
	analyzeTable();
	//	generateColumnClasses();
	dragDiv2TD();
	divListeners();
	connectAllDraggableDivsWithSVGLines();
}

//CLONE ROW BELOW CLICKED ROW

function cloneRowBelow() {
	var itm = storyLineTable.querySelectorAll('tr')[aboveRow];
	var cln = itm.cloneNode(true);
	var clonedRow = itm.after(cln);
	/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DTAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED TO THEM****************************************/
	var clonedRowTds = cln.querySelectorAll('.dragOverELAdded');
	if (clonedRowTds) {
		for (i = 0; i < clonedRowTds.length; i++) {
			clonedRowTds[i].classList.remove('dragOverELAdded');
		}
	}
	var divsInClonedRow = cln.querySelectorAll('.dragEventListnerAdded');
	if (divsInClonedRow) {
		for (i = 0; i < divsInClonedRow.length; i++) {
			divsInClonedRow[i].classList.remove('dragEventListnerAdded')
		}
	}
	/*****************************************/
	var cellZ2deselect = storyLineTable.querySelectorAll('.clicked');

	for (i = 0; i < cellZ2deselect.length; i++) {
		celldeselect = cellZ2deselect[i];

		var h2r = celldeselect.querySelector(TypeOfHtmlHeader);
		//		analyzeTable();

		if (h2r.innerHTML == "") {
			h2r.remove()

			celldeselect.style.backgroundColor = '';
			celldeselect.classList.remove('clicked');

		}
	}
	analyzeTable();
	//	generateColumnClasses();
	dragDiv2TD();
	divListeners();
	connectAllDraggableDivsWithSVGLines();

}


//DELETE ROW
function deleteRow() {
	var row = storyLineTable.querySelectorAll('tr');
	row[clickedRow].style.display = 'none';

	analyzeTable();
	connectAllDraggableDivsWithSVGLines();
}

//HIDE ROW
function hideRow() {
	var row = storyLineTable.querySelectorAll('tr');
	row[clickedRow].style.visibility = 'hidden';

	analyzeTable();
	connectAllDraggableDivsWithSVGLines();
}

//DESTROY ROW (I.E. REMOVE FROM DOM)
function destroyRow() {
	var row = storyLineTable.querySelectorAll('tr');
	row[clickedRow].remove();

	analyzeTable();
	connectAllDraggableDivsWithSVGLines();
}
/*******************************************************************************************************/
/*******************************************************************************************************/


/*******************************************************************************************************/
/*COLUMNS***********************************************************************************************/
/*******************************************************************************************************/
//CREATE COLUMN BEFORE CLICKED COLUMN

function createColumnBefore() {

	var row = storyLineTable.querySelectorAll('tr');

	/***********************************************************/

	//find true index of clicked cell
	var trueIndex = -1;
	for (i = 0; i < (clickedCell + 1); i++) {
		var cellsUp2clickedCell = row[clickedRow].cells[i];

		trueIndex = trueIndex + row[clickedRow].cells[i].colSpan; //all colspans minus 1 will give the trueindex
	}

	//for when clickedCell has colSpan > 1
	var colSpanOfClickedCell = row[clickedRow].cells[clickedCell].colSpan;
	if (colSpanOfClickedCell > 1) {
		trueIndex = trueIndex - colSpanOfClickedCell + 1;
	}

	var colClass2query = 'col-' + (trueIndex + 1);
	var lessThanColClass2query = 'col-' + (trueIndex);
	var greaterThanColClass2query = 'col-' + (trueIndex + 2);
	//in each row, add cell before cell with the class of colClass2query

	/***********************************************************/
	for (j = 0; j < row.length; j++) {
		beforeCell = row[j].querySelector('.' + colClass2query).cellIndex; //getting index of cell with class of colClass2query. this is for insertion before

		if (row[j].querySelector('.' + colClass2query).classList.contains(lessThanColClass2query)) {
			row[j].cells[beforeCell].colSpan = row[j].cells[beforeCell].colSpan + 1;
		} else {
			row[j].insertCell(newIcell || beforeCell);
		}

	}
	/***********************************************************/

	//	
	//	for (j = 0; j < row.length; j++) {
	//		/*var cell =*/ row[j].insertCell(newIcell || beforeCell);
	//	}

	//	newIcell = (newIcell || beforeCell) + 1;
	analyzeTable();
	generateColumnClasses();
	connectAllDraggableDivsWithSVGLines();
	dragDiv2TD();
	divListeners();
}

//CREATE COLUMN AFTER CLICKED COLUMN
function createColumnAfter() {
	var row = storyLineTable.querySelectorAll('tr');

	/***********************************************************/

	//find true index of clicked cell
	var trueIndex = -1;
	for (i = 0; i < (clickedCell + 1); i++) {
		var cellsUp2clickedCell = row[clickedRow].cells[i];
		trueIndex = trueIndex + row[clickedRow].cells[i].colSpan; //all colspans minus 1 will give the trueindex
	}
	var colClass2query = 'col-' + (trueIndex + 1);
	var lessThanColClass2query = 'col-' + (trueIndex);
	var greaterThanColClass2query = 'col-' + (trueIndex + 2);
	//in each row, add cell before cell with the class of colClass2query

	/***********************************************************/
	for (j = 0; j < row.length; j++) {
		beforeCell = row[j].querySelector('.' + colClass2query).cellIndex; //getting index of cell with class of colClass2query. this is for insertion before
		afterCell = beforeCell + 1;

		if (row[j].querySelector('.' + colClass2query).classList.contains(greaterThanColClass2query)) {
			row[j].cells[beforeCell].colSpan = row[j].cells[beforeCell].colSpan + 1;
		} else {
			row[j].insertCell(newIcell || afterCell);
		}

	}
	/***********************************************************/

	//	newIcell = (newIcell || afterCell) + 1;
	analyzeTable();
	generateColumnClasses();
	connectAllDraggableDivsWithSVGLines();
	dragDiv2TD();
	divListeners();
}

//DELETE COLUMN
function deleteColumn() {}

//HIDE COLUMN
function hideColumn() {}

//DESTROY COLUMN (I.E. REMOVE FROM DOM)
function destroyRow() {
	var row = storyLineTable.querySelectorAll('tr');
	row[clickedRow].remove();
}


/*SHOW ALL (FOR ROWS AND CELLS WITH DISPLAY == 'NONE' AND VISIBILITY == 'HIDDEN')***********************/
function showAll() {
	var row = storyLineTable.querySelectorAll('tr');
	for (j = 0; j < row.length; j++) {
		row[j].style.visibility = '';
		row[j].style.display = '';
	}
	var cell = storyLineTable.querySelectorAll('td');
	for (j = 0; j < cell.length; j++) {
		cell[j].style.visibility = '';
		cell[j].style.display = '';
	}
}
/******************************************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*CHANGEING POSITION OF ROWS AND CELLS*****************************************************/
/******************************************************************************************/
var aRowIsClicked;
var iOfR2move;

//MOVE ROW UP
function moveRowUp() {
	var rowAboveClickedRow;

	if (clickedRow) {
		if (aRowIsClicked == 1) {
			iOfR2move = clickedRow;
		}

		if (iOfR2move > 0) {
			var clonedRow = rows[iOfR2move].cloneNode(true);
			var parentTable = rows[iOfR2move].parentNode;
			rowAboveClickedRow = iOfR2move - 1;
			rows[iOfR2move].remove();
			rows[rowAboveClickedRow].before(clonedRow);

			/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DTAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED****************************************/
			var clonedRowTds = clonedRow.querySelectorAll('.dragOverELAdded');
			if (clonedRowTds) {
				for (i = 0; i < clonedRowTds.length; i++) {
					clonedRowTds[i].classList.remove('dragOverELAdded');
				}
			}
			var divsInClonedRow = clonedRow.querySelectorAll('.dragEventListnerAdded');
			if (divsInClonedRow) {
				for (i = 0; i < divsInClonedRow.length; i++) {
					divsInClonedRow[i].classList.remove('dragEventListnerAdded')
				}
			}
			/*****************************************/


			//CLONED ELEMENT LOOSES EVENTLISTNERS SO RE-ADD THEM
			rowListeners();
			cellListeners();
			divListeners();
			dragDiv2TD();
			connectAllDraggableDivsWithSVGLines();


			aRowIsClicked = 0;
			iOfR2move = iOfR2move - 1;
		}
	} else {
		customAlert('Please select a Row to move')
	}
}

//MOVE ROW DOWN
function moveRowDown() {
	var rowBelowClickedRow;
	if (clickedRow) {
		var rowLength = rows.length - 1;

		if (aRowIsClicked == 1) {
			iOfR2move = clickedRow;
		}

		if (iOfR2move < rowLength) {
			var clonedRow = rows[iOfR2move].cloneNode(true);
			var parentTable = rows[iOfR2move].parentNode;
			rowBelowClickedRow = iOfR2move + 1;
			rows[rowBelowClickedRow].after(clonedRow);
			rows[iOfR2move].remove();

			/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DTAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED****************************************/
			var clonedRowTds = clonedRow.querySelectorAll('.dragOverELAdded');
			if (clonedRowTds) {
				for (i = 0; i < clonedRowTds.length; i++) {
					clonedRowTds[i].classList.remove('dragOverELAdded');
				}
			}
			var divsInClonedRow = clonedRow.querySelectorAll('.dragEventListnerAdded');
			if (divsInClonedRow) {
				for (i = 0; i < divsInClonedRow.length; i++) {
					divsInClonedRow[i].classList.remove('dragEventListnerAdded')
				}
			}
			/*****************************************/

			//CLONED ELEMENT LOOSES EVENTLISTNERS SO RE-ADD THEM
			rowListeners();
			cellListeners();
			divListeners();
			dragDiv2TD();
			connectAllDraggableDivsWithSVGLines();


			aRowIsClicked = 0;
			iOfR2move = iOfR2move + 1;
		}
	} else {
		customAlert('Please select a Row to move')
	}
}

var iOfCELL2move;

//MOVE CELL LEFT
function moveCellLeft() {
	var cellBeforeClickedCell;
	if (clickedCell != null) {
		if (aRowIsClicked == 1) {
			iOfR2move = clickedRow;
		}
		var parentRow = rows[iOfR2move];
		var tdsInClickedRow = parentRow.querySelectorAll('td');

		if (aCellIsClicked == 1) {
			iOfCELL2move = clickedCell;
		}

		if (iOfCELL2move > 0) {
			var clonedCELL = tdsInClickedRow[iOfCELL2move].cloneNode(true);
			cellBeforeClickedCell = iOfCELL2move - 1;
			tdsInClickedRow[iOfCELL2move].remove();
			tdsInClickedRow[cellBeforeClickedCell].before(clonedCELL);

			/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DRAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED****************************************/
			clonedCELL.classList.remove('dragOverELAdded');

			var divsInClonedCell = clonedCELL.querySelectorAll('.dragEventListnerAdded');
			if (divsInClonedCell) {
				for (i = 0; i < divsInClonedCell.length; i++) {
					divsInClonedCell[i].classList.remove('dragEventListnerAdded')
				}
			}
			/*****************************************/


			//CLONED ELEMENT LOOSES EVENTLISTNERS SO RE-ADD THEM
			resetClasses();
			cellListeners();
			divListeners();
			dragDiv2TD();
			connectAllDraggableDivsWithSVGLines();
			if (clickedCell) {
				deselectEmptyCell();
			}
			buildLegendTable();


			aCellIsClicked = 0;
			iOfCELL2move = iOfCELL2move - 1;
		}
	} else {
		customAlert('Please select an <strong>event/region</strong> to move')
	}
}

//MOVE CELL RIGHT
function moveCellRight() {
	var cellAfterClickedCell;
	if (clickedCell != null) {
		if (aRowIsClicked == 1) {
			iOfR2move = clickedRow;
		}
		var parentRow = rows[iOfR2move];
		var tdsInClickedRow = parentRow.querySelectorAll('td');
		var cellsInRowLength = tdsInClickedRow.length - 1;

		if (aCellIsClicked == 1) {
			iOfCELL2move = clickedCell;
		}

		if (iOfCELL2move < cellsInRowLength) {
			var clonedCELL = tdsInClickedRow[iOfCELL2move].cloneNode(true);
			cellAfterClickedCell = iOfCELL2move + 1;
			tdsInClickedRow[cellAfterClickedCell].after(clonedCELL);
			tdsInClickedRow[iOfCELL2move].remove();

			/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DRAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED****************************************/
			clonedCELL.classList.remove('dragOverELAdded');

			var divsInClonedCell = clonedCELL.querySelectorAll('.dragEventListnerAdded');
			if (divsInClonedCell) {
				for (i = 0; i < divsInClonedCell.length; i++) {
					divsInClonedCell[i].classList.remove('dragEventListnerAdded')
				}
			}
			/*****************************************/

			//CLONED ELEMENT LOOSES EVENTLISTNERS SO RE-ADD THEM
			resetClasses();
			cellListeners();
			divListeners();
			dragDiv2TD();
			connectAllDraggableDivsWithSVGLines();
			if (clickedCell) {
				deselectEmptyCell();
			}
			buildLegendTable();
			////////////////////////////
			aCellIsClicked = 0;
			iOfCELL2move = iOfCELL2move + 1;
		}
	} else {
		customAlert('Please select an <strong>event/region</strong> to move')
	}
}
/******************************************************************************************/



/******************************************************************************************/
/*HIDE ELEMENT FAMILY--SIBLINGS & PARENT***************************************************/
/******************************************************************************************/
function toggleBtnzFamily(a, y) {

	var b = a.parentNode;

	if (b.nextElementSibling.style.display == 'none') {
		if (y) {
			a.innerHTML = '&#9776;';
		}
		a.nextElementSibling.style.display = '';
		while (b.nextElementSibling) {
			b.nextElementSibling.style.display = '';
			b = b.nextElementSibling;
		}
	} else {
		if (y) {
			a.innerHTML = y;
		}
		a.nextElementSibling.style.display = 'none';
		while (b.nextElementSibling) {
			b.nextElementSibling.style.display = 'none';
			b = b.nextElementSibling;
		}
	}
}

/******************************************************************************************/

/******************************************************************************************/
/*CONTROL BUTTONS ACCORDION****************************************************************/
/******************************************************************************************/

function minimizeMaximize(a, b) {

	b.style.cursor = 'pointer';

	a.onclick = function () {
		if (b.nextElementSibling.style.display == 'none') {
			b.nextElementSibling.style.display = '';
			a.innerHTML = '&#9866;';
		} else {
			b.nextElementSibling.style.display = 'none';
			a.innerHTML = '&#9776;';
		}
	}
}


var accordionCancel = document.getElementById('tableBuilderheaderHandle');

var minMaxAccordion = document.getElementById('max-min');
//var draggable = document.getElementById('tableBuilderheader');
//var draggableParent = draggable.parentNode;

//minimizeMaximize(minMaxAccordion, draggable);

var tableBuilderSections = document.getElementsByClassName('tableBuilderSections');
for (i = 0; i < tableBuilderSections.length; i++) {
	tableBuilderSections[i].style.cursor = 'pointer';
	var hSib1 = tableBuilderSections[i].nextElementSibling;
	//TO HIDE ALL NEXT SIBLINGS
	while (hSib1 && hSib1.tagName != 'H3') {
		hSib1.style.display = 'none';
		hSib1 = hSib1.nextElementSibling;
	}

	//TO SHOW OR HIDE NEXTSIBLINGS
	tableBuilderSections[i].onclick = function () {
		var h3clicked = this;
		var hSib2 = h3clicked.nextElementSibling;
		for (let j = 0, hSib2 = h3clicked.nextElementSibling;
			((hSib2 != null) && (hSib2.tagName != 'H3')); j++, hSib2 = hSib2.nextElementSibling) {
			setTimeout(() => {
				if (hSib2.style.display == 'none') {
					hSib2.style.display = ''
				} else if (hSib2.style.display != 'none') {
					hSib2.style.display = 'none'
				}
			}, 20 * ++j)
		}
	}
}


/*var tableBuilder = document.getElementById('tableBuilder');
var h3 = tableBuilder.getElementsByTagName('h4');
for (i = 0; i < h3.length; i++) {
	h3[i].style.cursor = 'pointer';
	var hSib1 = h3[i].nextElementSibling;
	//TO HIDE ALL THE NEXTSIBLINGS
	while (hSib1) {
		hSib1.style.display = 'none';
		hSib1 = hSib1.nextElementSibling;
	}

	//TO SHOW OR HIDE NEXTSIBLINGS
	h3[i].onclick = function () {
		var h3clicked = this;
		var hSib2 = h3clicked.nextElementSibling;
		for (let j = 0, hSib2 = h3clicked.nextElementSibling; hSib2 != null; j++, hSib2 = hSib2.nextElementSibling) {
			setTimeout(() => {
				if (hSib2.style.display == 'none') {
					hSib2.style.display = ''
				} else if (hSib2.style.display != 'none') {
					hSib2.style.display = 'none'
				}
			}, 20 * ++j)
		}
	}
}*/
/******************************************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*ADD HEADING TO CLICKED CELL**************************************************************/
/******************************************************************************************/
//THIS IS SO THAT ENTER KEY WILL WORK ON THE INPUT
function inputEnter(inpt, inptBtn) {
	inpt.addEventListener('keyup', function (event) {
		// Number 13 is the 'Enter' key on the keyboard
		if (event.keyCode === 13) {
			// Cancel the default action, if needed
			event.preventDefault();
			// Trigger the button element with a click
			document.getElementById(inptBtn).click();

			var h2r = celldeselect.querySelector(TypeOfHtmlHeader);
			emptyCellDeselect(h2r);

		}
	})
}
/************************************************************/


var input4heading = document.getElementById('cellHeading'); //GETS VALUE FROM INPUT BOX
var input4rowName = document.getElementById('rowName'); //GETS VALUE FROM INPUT BOX

inputEnter(input4heading, 'applyHeadingBtn');
inputEnter(input4rowName, 'applyRowEditBtn');


function insertHeading() {
	var x = input4heading.value; //GETS VALUE FROM INPUT BOX

	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td')[clickedCell];

	if (x) {
		var heading = cell.querySelector(TypeOfHtmlHeader);
		//		heading.setAttribute('contentEditable', 'true');
		heading.innerHTML = x;
		input4heading.value = ''; //THIS CLEARS THE INPUT BOX
		celldeselect = cell;

		buildLegendTable();
	}
	analyzeTable();
}
var input4text = document.getElementById('cellText'); //GETS VALUE FROM INPUT BOX
var input4rowName = document.getElementById('rowName'); //GETS VALUE FROM INPUT BOX

inputEnter(input4text, 'applyHeadingBtn');
inputEnter(input4rowName, 'applyRowEditBtn');

function insertTextIntoTD() {
	var x = input4text.value; //GETS VALUE FROM INPUT BOX

	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td')[clickedCell];

	if (x) {
		var cell_p_text = document.createElement('p');
		cell_p_text.innerHTML = x;
		cell_p_text.setAttribute('contentEditable', 'true');

		var heading = cell.querySelector(TypeOfHtmlHeader);
		heading.after(cell_p_text);

		input4text.value = ''; //THIS CLEARS THE INPUT BOX
		celldeselect = cell;

		buildLegendTable();
	}
	analyzeTable();
}

var eventDuration = document.getElementById('eventDuration'); //GETS VALUE FROM INPUT BOX
inputEnter(eventDuration, 'applyDurationBtn');

function insertDurationIntoTD() {
	var x = eventDuration.value; //GETS VALUE FROM INPUT BOX

	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td')[clickedCell];

	if (x) {
		cell.setAttribute('eventDuration', x);

		eventDuration.value = ''; //THIS CLEARS THE INPUT BOX
		celldeselect = cell;

		buildLegendTable();
	}
	analyzeTable();
}

function rowEdit() {
	var x = input4rowName.value; //GETS VALUE FROM INPUT BOX
	var x = x.trim(); //REMOVE SPACES FROM START AND END OF STRING


	if (clickedRow == null) {
		customAlert('Please select a row to name.')
	}
	var row = storyLineTable.querySelectorAll('tr')[clickedRow];
	if ((x) && (x == 'remove')) {
		var oldRowName = row.getAttribute('rowname');
		if (oldRowName) {
			row.removeAttribute('rowName');
			row.removeAttribute('title');
			input4rowName.value = ''; //THIS CLEARS THE INPUT BOX

			var cell = row.querySelectorAll('td')[clickedCell];
			celldeselect = cell;

			//REMOVE FROM ROWNAME ARRAYS////////////////////////
			var index2Remove = rowNamesArray.indexOf(oldRowName);
			rowNamesArray.splice(index2Remove, 1);
			rowsNameLLowerCaseArray.splice(index2Remove, 1);
			////////////////////////////////////////////////////

			buildLegendTable();
			timeLinesMenu();
		}

	} else if ((x) && (x != 'remove')) {
		row.setAttribute('rowName', x);
		row.setAttribute('title', x);
		input4rowName.value = ''; //THIS CLEARS THE INPUT BOX

		var cell = row.querySelectorAll('td')[clickedCell];
		celldeselect = cell;

		buildLegendTable();
		timeLinesMenu();

	}
	//	analyzeTable();

}

var arrayOfRowNames = [];


/******************************************************************************************/
/*LEGEND TABLE SCRIPT**********************************************************************/
/******************************************************************************************/

var headerClear;
var bodyClear;
var clear;

function buildLegendTable() {

	var ltbl_thead = legendTable.querySelector('thead');
	var ltbl_tbody = legendTable.querySelector('tbody');
	var ltbl_thd_tr = ltbl_thead.querySelectorAll('tr');
	var ltbl_tbdy_tr = ltbl_tbody.querySelectorAll('tr');

	var storyLineTable = document.querySelector('#storyLineTable');
	//	storyLineTable;
	var st_thd = storyLineTable.querySelector('thead');
	var st_tbdy = storyLineTable.querySelector('tbody');
	var st_thd_tr = st_thd.querySelectorAll('tr');
	var st_tbdy_tr = st_tbdy.querySelectorAll('tr');


	//CLEAR ALL ROWS
	/*	if (clear) {
			var trClear = legendTable.querySelectorAll("tr");
			for (i = 0; i < trClear.length; i++) {
				trClear[i].remove();
			}
		}*/
	if (headerClear) {
		var trClear = ltbl_thead.querySelectorAll("tr");
		for (i = 0; i < trClear.length; i++) {
			trClear[i].remove();
		}
	}
	if (bodyClear) {
		var trClear = ltbl_tbody.querySelectorAll("tr");
		for (i = 0; i < trClear.length; i++) {
			trClear[i].remove();
		}
	}


	//CREATE <TR> TO APPEND TO LEGEND-TABLE
	//newLTrow ==== new legend table row
	function newLTrow(heightAtt, newTRtxt, appendHere) {

		var newTR = document.createElement('TR');
		var newTD = document.createElement('TD');
		var newH1 = document.createElement(TypeOfHtmlHeader);

		var hAtt = heightAtt || null;
		newTD.style.height = hAtt;

		var nTR = newTRtxt || null;
		newH1.innerHTML = nTR;

		newH1.style.marginBottom = '0';

		newTR.setAttribute('rowname', newTRtxt);

		appendHere.appendChild(newTR).appendChild(newTD).prepend(newH1);

		x1 = null;
		x2 = null;

	}


	//FOR TBODY ROWS
	function createLegendTable(TRS4rm, TRsection2o) {
		var rowNameCounter = 0;
		var tdsHeight = null;
		var x1 = null;
		var x2 = null;
		var newTRtxt
		var rowName;
		var rowName1 = 1;
		var rowName2 = 1;
		var bottom_Y_otherTRinNameSet;
		var top_Y_firstTRinNameSet;
		var derivedHeight;

		//LOOP THROUGH ROWS TO CREATE
		//FOR THEAD ROWS6
		for (i = 0; i < TRS4rm.length; i++) {

			//create row only when you meet a new row name or when this is the last row you are checking
			//you must have the height and row name ready

			var currentRightTableRow = TRS4rm[i];
			rowName = currentRightTableRow.getAttribute('rowname');
			//Dimensions of currentRightTableROw
			var currentRightTableRowTDtopBorderWidth = (getComputedStyle(currentRightTableRow.cells[0]).borderTopWidth.slice(0, -2));
			var currentRightTableRowTDbottomBorderWidth = (getComputedStyle(currentRightTableRow.cells[0]).borderBottomWidth.slice(0, -2));
			var currentRightTableRowTDpaddingTop = (getComputedStyle(currentRightTableRow.cells[0]).paddingTop.slice(0, -2));
			var currentRightTableRowTDpaddingBottom = (getComputedStyle(currentRightTableRow.cells[0]).paddingBottom.slice(0, -2));
			//The slice(0,-2) is to remove the 'px' at the end of the returned string
			//The '+' is to turn it into an interger since it was originally a string

			var bWt = +currentRightTableRowTDtopBorderWidth;
			var bWb = +currentRightTableRowTDbottomBorderWidth;
			var pT = +currentRightTableRowTDpaddingTop;
			var pB = +currentRightTableRowTDpaddingBottom;

			var createTD = 'no';


			if (rowName1 == 1) {
				rowName1 = rowName;

				tdsHeight = currentRightTableRow.clientHeight - (bWt + bWb + pT + pB - 0.1) + "px";

				if (i == TRS4rm.length - 1) {
					newLTrow(tdsHeight, rowName1, TRsection2o);
				}

				//FIND TOPMOST POINT
				top_Y_firstTRinNameSet = currentRightTableRow.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
			} else if (rowName1 != 1) {
				rowName2 = rowName;

				//CHECK IF ROWNAMES CORRESPOND OR NOT
				if (rowName1 == rowName2) {

					bottom_Y_otherTRinNameSet = currentRightTableRow.getBoundingClientRect().top + currentRightTableRow.clientHeight /*+ (window.pageYOffset || document.documentElement.scrollTop) */ ;

					tdsHeight = (bottom_Y_otherTRinNameSet - top_Y_firstTRinNameSet) - (bWt + bWb + pT + pB - 0.1) + "px";
					rowName1 = rowName2;
					if (i == TRS4rm.length - 1) {
						newLTrow(tdsHeight, rowName1, TRsection2o);
					}

				} else if (rowName1 != rowName2) {

					newLTrow(tdsHeight, rowName1, TRsection2o);
					rowName1 = rowName;

					bottom_Y_otherTRinNameSet = currentRightTableRow.getBoundingClientRect().top + currentRightTableRow.clientHeight //+ (window.pageYOffset || document.documentElement.scrollTop) ;
					tdsHeight = (bottom_Y_otherTRinNameSet - top_Y_firstTRinNameSet) - (bWt + bWb + pT + pB - 0.1) + "px";

					tdsHeight = currentRightTableRow.clientHeight - (bWt + bWb + pT + pB - 0.1) + "px";

					//FIND TOPMOST POINT
					top_Y_firstTRinNameSet = currentRightTableRow.getBoundingClientRect().top //+ (window.pageYOffset || document.documentElement.scrollTop) ;

					if (i == TRS4rm.length - 1) {
						newLTrow(null, rowName1, TRsection2o);
					}
				}
			}
		}

	}
	createLegendTable(st_thd_tr, ltbl_thead);
	createLegendTable(st_tbdy_tr, ltbl_tbody);

	headerClear = 1;
	bodyClear = 1;
	clear = 1;

}

/******************************************************************************************/
/*SET HEIGHT OF LEGEND CELLS***************************************************************/
/******************************************************************************************/
function btn_buildLegendTable() {
	uncheckAllBoxes('.timeLINameCheckBox');
	dragDiv2TD();
	divListeners();
	if (clickedCell) {
		deselectEmptyCell();
	}
	buildLegendTable();
	resetClasses();
	createTimeMenu("ROW");
}
/******************************************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*ISERT DIV********************************************************************************/
/******************************************************************************************/

var input4divName = document.getElementById('divName'); //GETS INPUT BOX
var input4divClass = document.getElementById('divClass'); //GETS INPUT BOX

function createDIV() {
	var dName = input4divName.value;
	var dClass = input4divClass.value;
	if (dName && dClass) {
		var c = dClass.slice(0, 1);
		if (isNaN(parseInt(c))) {
			var dIVwtLabel = document.createElement('DIV');
			dIVwtLabel.classList.add('opt_' + dClass);
			dIVwtLabel.classList.add('draggableDiv');
			dIVwtLabel.classList.add('nameLabelDiv');
			dIVwtLabel.setAttribute('divClassName', dClass);
			dIVwtLabel.setAttribute('title', dClass);
			dIVwtLabel.innerHTML = dName;
			//	dIVwtLabel.style.backgroundColor = 'pink';
			dIVwtLabel.setAttribute('draggable', 'true');
			//	dIVwtLabel.onclick = dragDiv2TD;


			if (selectedCell) {
				selectedCell.appendChild(dIVwtLabel);


				analyzeTable();

				//ARRAYS FOR DIV'S & THEIR CLASSES
				if (divClassArray.indexOf(dClass) == -1) {
					divClassArray.push(dClass);
					buildActorsMenu(dClass);
				}
				if (divNameArray.indexOf(dName) == -1) {
					divNameArray.push(dName)
				}

				/******************************************************************************************/
				/*SOME VARIBLES FOR CREATING THE OPTIONS FOR THE SELECT ELEMENTS***************************/
				/******************************************************************************************/
				//	var divNameOptionsDropdown = document.getElementById('divNameOptionsDropdown');
				var divNameOptions = divNameOptionsDropdown.getElementsByTagName('option');
				//	var divClassOptionsDropdown = document.getElementById('divClassOptionsDropdown');
				/******************************************************************************************/
				/******************************************************************************************/


				/*WHAT TO DO THE FIRST TIME DIV-CLASS IS CREATED*******************************************/
				/******************************************************************************************/
				//ADD THE CLASS TO THE ARRAY (divClassAttributeArray) IF IT DOESN'T ALREADY EXIST IN IT
				if (divClassAttributeArray.indexOf(dClass) == -1) {
					divClassAttributeArray.push(dClass);
					divopt_ClassArray.push('opt_' + dClass);

					/****************************************/
					/* ASSIGN COLOR TO DIV CLASS ************/
					var colorFromArray = cssColorNamesArray[Math.floor(Math.random() * cssColorNamesArray.length)];
					var headerStyles = document.getElementById('divColorStyles');
					var styles = `.opt_` + dClass + `{ background-color: ` + colorFromArray + `; stroke: ` + colorFromArray + ` }`;
					headerStyles.appendChild(document.createTextNode(styles));
					/****************************************/



					/******************************************************************************************/
					/*CREATING THE OPTIONS FOR THE DIVCLASS SELECT ELEMENTS************************************/
					/******************************************************************************************/
					var divClassOption = document.createElement('OPTION');
					divClassOption.text = dClass;

					divClassOption.setAttribute('optCounter', 1);
					divClassOptionsDropdown.append(divClassOption);
				}
				/******************************************************************************************/
				/*WHAT TO DO IF THE DIVCLASS HAS ALREADY BEEN CREATED**************************************/
				/******************************************************************************************/
				else if (divClassAttributeArray.indexOf(dClass) != -1) {
					//find the option that has this classname as its text and increase its optCounter value
					var divClassOptions = divClassOptionsDropdown.getElementsByTagName('option');

					for (j = 0; j < divClassOptions.length; j++) {
						if (divClassOptions[j].text == dClass) {
							var optCounterValue = Number(divClassOptions[j].getAttribute('optCounter'))
							divClassOptions[j].setAttribute('optCounter', ++optCounterValue);
							break;
						}
					}
				}

				/******************************************************************************************/
				/*WHAT TO DO THE FIRST TIME DIV-NAME IS CREATED********************************************/
				/******************************************************************************************/
				//ADD THE NAME TO THE ARRAY (divNameAttributeArray) IF IT DOESN'T ALREADY EXIST IN IT
				if (divNameAttributeArray.indexOf(dName) == -1) {
					divNameAttributeArray.push(dName);

					var dNmoption = document.createElement('OPTION');
					dNmoption.text = dName;

					dNmoption.setAttribute('optCounter', 1);
					dNmoption.setAttribute('optClassName', dClass);
					divNameOptionsDropdown.append(dNmoption);
				}
				/******************************************************************************************/
				/*WHAT TO DO IF THE DIVCLASS HAS ALREADY BEEN CREATED**************************************/
				/******************************************************************************************/
				else if (divClassAttributeArray.indexOf(dClass) != -1) {
					//find the option that has this name as its text and increase its optCounter value
					var divNameOptions = divNameOptionsDropdown.getElementsByTagName('option');

					for (j = 0; j < divNameOptions.length; j++) {
						if (divNameOptions[j].text == dName) {
							var optCounterValue = Number(divNameOptions[j].getAttribute('optCounter'));
							divNameOptions[j].setAttribute('optCounter', ++optCounterValue);
							break;
						}
					}

				}

				makeInputSelectable();
				divListeners();
				dragDiv2TD();
				connectAllDraggableDivsWithSVGLines();

				darkOrLightBG(dIVwtLabel);

			} else {
				customAlert('Please select a location to add the <strong>ACTOR</strong> to.');
			}
		} else {
			customAlert('!!!Main Name cannot start with a <strong>number</strong>!!!')
		}
	} else {
		customAlert('Please, fill the name fields.');
	}
}

function deleteDIV() {

	if (clickedDIV) {
		var divNameOptions = divNameOptionsDropdown.getElementsByTagName('option');
		var dName = clickedDIV.innerHTML;
		for (j = 0; j < divNameOptions.length; j++) {

			if (divNameOptions[j].text == dName) {
				var optCounterValue = Number(divNameOptions[j].getAttribute('optCounter'));
				divNameOptions[j].setAttribute('optCounter', --optCounterValue);

				//REDUCE OPTIONS COUNT OF CLASS TO WHICH DELETED DIV BELONGS
				var optionsClassNameOfDivToBeDeleted = divNameOptions[j].getAttribute('optClassName');
				//find the class in the classOptionsDropdown and reduce its optCounter value
				var divClassOptions = divClassOptionsDropdown.getElementsByTagName('option');

				for (j = 0; j < divClassOptions.length; j++) {
					if (divClassOptions[j].text == optionsClassNameOfDivToBeDeleted) {
						var optCounterValue = Number(divClassOptions[j].getAttribute('optCounter'))
						divClassOptions[j].setAttribute('optCounter', --optCounterValue);

						if (optCounterValue == 0) {
							//REMOVE FROM ARRAY OF CLASS NAMES
							var indexToRemove = divClassAttributeArray.indexOf(optionsClassNameOfDivToBeDeleted);
							divClassAttributeArray.splice(indexToRemove, 1);
							//REMOVE CORRESPONDING CLASS-NAME OPTION
							divClassOptions[j].remove();
							//REMOVE CORRESPONDING LI WITH CORRESPONDING LABEL AND INPUT
							var inputOfLI2Remove = document.getElementById('opt_' + optionsClassNameOfDivToBeDeleted);
							inputOfLI2Remove.closest('li').remove();
						}
						break;
					}
				}

				if (optCounterValue == 0) {
					//REMOVE FROM ARRAY OF NAMES
					var indexOfName2Remove = divNameAttributeArray.indexOf(dName);
					divNameAttributeArray.splice(indexOfName2Remove, 1);
					//REMOVE THE OPTIONS ELEMENT ITSELF
					divNameOptions[j].remove();
				};
				break;
			}
		}

		clickedDIV.remove();
		divDeleteButton.style.backgroundColor = '';
		clearTimeout(deletButtonColorTimeOut);

		deselectEmptyCell();
		buildLegendTable();
		connectAllDraggableDivsWithSVGLines();
	}

}
/******************************************************************************************/
/*FOR ACTOR/LABEL CONSOLE******************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*HIDE OR SOLO DIV ON CHECKBOX CHECK/UNCHECK***********************************************/
/******************************************************************************************/
var divsOfCheckedClassHider = document.getElementById('hideDivsOfCheckedClass');
var divsOfCheckedClassSoloer = document.getElementById('soloDivsOfCheckedClass');
var shouldIHideDiv = 1;
var shouldISoloDiv = 0;

function hideDivsOfClass(x) {
	shouldIHideDiv = 1;
	shouldISoloDiv = 0;
	x.style.backgroundColor = 'rgba(255, 231, 0, 0.45)';
	divsOfCheckedClassSoloer.style.backgroundColor = '';
};

function hideAllOtherExcept4DivsOfClass(x) {
	var classesToUncheck = document.querySelectorAll('.labelListNameCheckBox');
	for (i = (classesToUncheck.length - 1); i > -1; i--) {
		if (classesToUncheck[i].checked) {
			classesToUncheck[i].click();
		}
	}
	shouldISoloDiv = 1;
	shouldIHideDiv = 0;
	x.style.backgroundColor = 'rgba(255, 231, 0, 0.45)';
	divsOfCheckedClassHider.style.backgroundColor = '';
};
/******************************************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*TO FILL THE TEXT INPUTS******************************************************************/
/******************************************************************************************/
//add this to create div button
function makeInputSelectable() {
	divNameOptionsDropdown.setAttribute('onchange', 'fillDivNameInput()');
	divClassOptionsDropdown.setAttribute('onchange', 'fillDivClassInput()');

}

function fillDivNameInput() {
	input4divName.value = divNameOptionsDropdown.value;
};

function fillDivClassInput() {
	input4divClass.value = divClassOptionsDropdown.value;
};
/******************************************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*MAKE TABLE EDITABLE BUTTON***************************************************************/
/******************************************************************************************/

var masterEditButton = document.getElementById('masterEditButton');

function alternateClose() {
	makeEditableCheckbox.checked = false;
	storyLineTableTitleHeader.contentEditable = 'false';
	alternateStoryLineEditorButtons.style.display = 'none';
}

var makeEditableCheckbox = document.getElementById('editableRadio');

function makeTableEditable() {
	//	alternateClose();
	//	storyLineTableTitleHeaderEditable();

	if (makeEditableCheckbox.checked == true) {
		makeEditableCheckbox.checked = false;
	} else {
		makeEditableCheckbox.checked = true;
	}

	if (makeEditableCheckbox.checked == true) {
		alternateStoryLineEditorButtons.style.display = '';
		storyLineTableTitleHeader.contentEditable = 'true';

		var allHInTable = storyLineTable.querySelectorAll('h4');
		var allPInTable = storyLineTable.querySelectorAll('p');
		allHInTable.forEach(function (itm) {
			itm.contentEditable = true
		})
		allPInTable.forEach(function (itm) {
			itm.contentEditable = true
		})
	} else {
		storyLineTableTitleHeader.contentEditable = 'false';
		alternateStoryLineEditorButtons.style.display = 'none';

		var allHInTable = storyLineTable.querySelectorAll('h4');
		var allPInTable = storyLineTable.querySelectorAll('p');
		allHInTable.forEach(function (itm) {
			itm.contentEditable = false
		})
		allPInTable.forEach(function (itm) {
			itm.contentEditable = false
		})
	}
}
/******************************************************************************************/
/******************************************************************************************/


/******************************************************************************************/
/******************************************************************************************/
/*TIME MENU FUNCTIONS**********************************************************************/
/******************************************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*HIDE OR SOLO TIME COLUMNS ON CHECKBOX CHECK/UNCHECK**************************************/
/******************************************************************************************/
var TDsOfCheckedClassHider = document.getElementById('hideAllColXOfCheckedTD');
var TDsOfCheckedClassSoloer = document.getElementById('soloAllColXOfCheckedTD');
var shouldIHideTD = 1;
var shouldISoloTD = 0;

function hideAllColXOfCheckedTD(x) {
	shouldIHideTD = 1;
	shouldISoloTD = 0;
	x.style.backgroundColor = 'rgba(255, 231, 0, 0.45)';
	TDsOfCheckedClassSoloer.style.backgroundColor = '';
};

function hideAllOtherColXsExcept4AllColXOfCheckedTD(x) {
	var classesToUncheck = document.querySelectorAll('.timeLINameCheckBox');
	for (i = (classesToUncheck.length - 1); i > -1; i--) {
		if (classesToUncheck[i].checked) {
			classesToUncheck[i].click();
		}
	}
	shouldISoloTD = 1;
	shouldIHideTD = 0;
	x.style.backgroundColor = 'rgba(255, 231, 0, 0.45)';
	TDsOfCheckedClassHider.style.backgroundColor = '';
};

function uncheckAllBoxes(x) {
	var classesToUncheck = document.querySelectorAll(x);
	classesToUncheck.forEach(function (itm) {
		if (itm.checked) {
			itm.click();
		}
	})
}
/******************************************************************************************/
/******************************************************************************************/


/******************************************************************************************/
/*BUILD LABELS/ACTORS MENU*****************************************************************/
/******************************************************************************************/
function createDivMenu(dClass) {
	/*CREATE DIV MANIPULATOR*****************/
	var labelNavSectionOL = document.querySelector('#labelList');
	//CREATE LI ELEMENT
	var liToHoldLabelListName = document.createElement('LI');

	//CREATE LABEL ELEMENT
	var labelListName = document.createElement('LABEL');
	labelListName.innerHTML = dClass;
	labelListName.setAttribute('for', 'opt_' + dClass);
	//APPEND LABEL ELEMENT TO LIST
	liToHoldLabelListName.appendChild(labelListName);

	//APPEND INPUT (CHECKBOX) ELEMENT TO LIST
	var labelListNameCheckBox = document.createElement('INPUT');
	labelListNameCheckBox.setAttribute('type', 'checkbox');
	labelListNameCheckBox.setAttribute('value', 'opt_' + dClass);
	labelListNameCheckBox.setAttribute('id', 'opt_' + dClass);
	labelListNameCheckBox.classList.add('labelListNameCheckBox');

	//ADD EVENTLISTNER TO INPUT ELEMENT
	labelListNameCheckBox.addEventListener('click', function () {
		if (shouldIHideDiv == 1) {
			if (this.checked) {
				var classOfDivsToHide = this.value;
				var allDivsofClassToHide = masterTable.getElementsByClassName(classOfDivsToHide);
				for (i = 0; i < allDivsofClassToHide.length; i++) {
					allDivsofClassToHide[i].style.display = "none";
				}
				connectAllDraggableDivsWithSVGLines();
			} else if (!this.checked) {
				var classToShow = this.value;
				var allDivsofClassToHide = masterTable.getElementsByClassName(classToShow);

				for (i = 0; i < allDivsofClassToHide.length; i++) {
					allDivsofClassToHide[i].style.display = "";
				}
				/*REMOVE OPACITY CLASS****************************************/
				var index2exempt = divopt_ClassArray.indexOf(this.value);
				for (i = 0; i < divopt_ClassArray.length; i++) {
					if (i != index2exempt) {
						var classToMakeOpaque = document.getElementsByClassName(divopt_ClassArray[i]);
						for (j = 0; j < classToMakeOpaque.length; j++) {
							classToMakeOpaque[j].classList.remove('opacityClass');
						}
					}
				}
				/*************************************************************/
				connectAllDraggableDivsWithSVGLines();
			}
		} else if (shouldISoloDiv == 1) {
			if (this.checked) {
				/*FIRST TIME*************************/
				var index2exempt = divopt_ClassArray.indexOf(this.value);
				lastSoloedClass = this.value;
				/************************************/
				for (i = 0; i < divopt_ClassArray.length; i++) {
					if (i == index2exempt) {
						var classToMakeOpaque = document.getElementsByClassName(divopt_ClassArray[i]);
						for (j = 0; j < classToMakeOpaque.length; j++) {
							classToMakeOpaque[j].classList.remove('opacityClass');
						}
					}
					if (i != index2exempt) {
						var classToMakeOpaque = document.getElementsByClassName(divopt_ClassArray[i]);
						for (j = 0; j < classToMakeOpaque.length; j++) {
							classToMakeOpaque[j].classList.add('opacityClass');
						}
					}
				}
			} else if (!this.checked) {
				var index2exempt = divopt_ClassArray.indexOf(this.value);
				for (i = 0; i < divopt_ClassArray.length; i++) {
					if (i != index2exempt) {
						var classToMakeOpaque = document.getElementsByClassName(divopt_ClassArray[i]);
						for (j = 0; j < classToMakeOpaque.length; j++) {
							classToMakeOpaque[j].classList.remove('opacityClass');
						}
					}
				}

				/*var classOfDivsToHide = this.value;
				var allDivsofClassToHide = masterTable.getElementsByClassName(classOfDivsToHide);
				for (i = 0; i < allDivsofClassToHide.length; i++) {
					allDivsofClassToHide[i].style.display = "none";
				}*/
			}
		}
	});

	//APPEND INPUT ELEMENT TO LIST
	liToHoldLabelListName.appendChild(labelListNameCheckBox);

	//APPEND LIST ELEMENT TO OL
	labelNavSectionOL.appendChild(liToHoldLabelListName);
	/****************************************/
}

function buildActorsMenu(x) {
	//	divClassArray
	//	divNameArray

	if (x) {
		createDivMenu(x)
	} else {
		divClassArray.forEach(function (divClassName) {
			createDivMenu(divClassName)
		})
	}

}
/******************************************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*BUILD TIME MENU**************************************************************************/
/******************************************************************************************/
var timeMenuArray = [];
var col_x_CellHeader;

function createTimeMenu(ROWorCOL) {

	/*ARRANGE THE TIMES BY COLUMN*/
	if (ROWorCOL == "COL") {
		if (timeMenuList) {
			removeAllChildNodesOf(timeMenuList);
		} else {
			var timeMenuList = document.createElement('OL');
			timeMenuList.id = "timeMenuList";
			timeMenuList.style.paddingLeft = '20px';
			timeMenuList.style.marginTop = 'auto';
		}
		//go through all the col-x Classes one after the other in the table head
		for (i = 0; i < arrayOfAllColClasses.length; i++) {
			var colClassInThead = storyLineTableTHead.querySelectorAll('.col-' + (i + 1));
			var elmLI_1 = document.createElement('LI');
			elmLI_1.innerHTML = "Column " + (i + 1);
			var addNewLI = "no"; //to determine whether to append the time to the timeMenuUL. It will remain "no" if the col-class cell is empty
			var elmUL = document.createElement('OL');

			for (j = 0; j < colClassInThead.length; j++) {
				col_x_CellHeader = colClassInThead[j].querySelector(TypeOfHtmlHeader);

				//check for which ones have h1 with content in it
				if (col_x_CellHeader != null) {

					addNewLI = "yes";

					//get the cell's content and append it to the timeMenu
					var elmLI = document.createElement('LI');
					elmLI.innerHTML = col_x_CellHeader.innerHTML;
					elmUL.appendChild(elmLI);
				}
			}
			if (addNewLI == "yes") {

				elmLI_1.appendChild(elmUL);
				timeMenuList.appendChild(elmLI_1);
			}
		}
	}

	/*ARRANGE THE TIMES BY ROWS*/
	if (ROWorCOL == "ROW") {
		cellColClassesArray = [];
		removeAllChildNodesOf(timeMenuListDiv);
		//GO THROUGH EACH ROW ONE AFTER ANOTHER
		for (i = 0; i < storyLineTHeadRowz.length; i++) {
			//CREATE <LI> FOR EACH ROW
			/*var elmLI_1 = document.createElement('LI');
			elmLI_1.innerHTML = "Row " + (i + 1);*/
			var addNewLI = "no";
			var elmUL = document.createElement('OL');

			//CHECK EACH CELL IN THE ROW
			var cellsInTheadRow = storyLineTHeadRowz[i].cells;

			for (j = 0; j < cellsInTheadRow.length; j++) {
				col_x_CellHeader = cellsInTheadRow[j].querySelector(TypeOfHtmlHeader);

				//check for which ones have h1 with content in it
				if (col_x_CellHeader != null) {

					addNewLI = "yes";
					var cellId = 'cell.' + i + '.' + j;

					//get the cell's content and append it to the timeMenu

					var elmLI = document.createElement('LI');

					//CREATE LABEL ELEMENT
					var labelListName = document.createElement('LABEL');
					labelListName.innerHTML = col_x_CellHeader.innerHTML;
					labelListName.setAttribute('for', cellId);


					//APPEND INPUT (CHECKBOX) ELEMENT TO LIST
					var labelListNameCheckBox = document.createElement('INPUT');
					labelListNameCheckBox.setAttribute('type', 'checkbox');
					labelListNameCheckBox.setAttribute('value', cellId);
					labelListNameCheckBox.setAttribute('id', cellId);
					//					labelListNameCheckBox.classList.add('labelListNameCheckBox');
					labelListNameCheckBox.setAttribute('targetRowIndex', i);
					labelListNameCheckBox.setAttribute('targetCellIndex', j);
					labelListNameCheckBox.classList.add('timeLINameCheckBox');

					/***************************************************************************************/
					/*ADD EVENTLISTNER TO INPUT ELEMENT TO SHOW/HIDE RESPECTIVE COL-X COLUMNS***************/
					/***************************************************************************************/
					labelListNameCheckBox.addEventListener('click', function () {

						var targetRowI = this.getAttribute('targetRowIndex');
						var targetCellI = this.getAttribute('targetCellIndex');
						var targetedTD = storyLineTableTHead.rows[targetRowI].cells[targetCellI];

						/*GET COL-X CLASSES AND ACT*********************/
						/***********************************************/
						var targetedTDClassList = targetedTD.classList;
						var prefix = 'col-';
						var prefixLength = prefix.length;

						if (shouldIHideTD == 1) {

							if (this.checked) {

								for (k = 0; k < targetedTDClassList.length; k++) {

									//GET THE COL-X CLASSES ONE AFTER ANOTHER BELONGING TO THE TARGETED TD
									if (targetedTDClassList[k].slice(0, prefixLength) == prefix) {
										var col_xClass = targetedTDClassList[k];

										/*
										What it does:
										1a. reduce colspan if it is greater than 2
										1b. hide td if colspan is equal to 1
										2. increase the count of hidden columns
										*/

										//GET COLLECTION OF TDs BELONGING TO THIS COL-X CLASS
										var tdsOfCheckedClass = storyLineTable.querySelectorAll('.' + col_xClass);

										//GO THROUGH EACH CELL BELONGING TO THIS CLASS
										for (l = 0; l < tdsOfCheckedClass.length; l++) {
											var TD = tdsOfCheckedClass[l];

											var orgColSpan = Number(TD.getAttribute('originalcolspan'));
											var hiddenColXCount = Number(TD.getAttribute('hiddencol_xs_count'));

											//ONLY ACT IF THE TD HAS NOT BEEN HIDDEN (I.E., IF ORIGINAL COLSPAN AND HIDDEN COL COUNT ARE THE SAME)
											if ((orgColSpan != hiddenColXCount)) {
												//IF COLSPAN OF TD OF THE COL-X CLASS IS 1, HIDE THE TD
												if ((orgColSpan - hiddenColXCount == 1)) {
													TD.style.display = 'none';
												}

												//ELSE IF COLSPAN OF TD OF THE COL-X CLASS IS GREATER THAN 1, THEN DON'T HIDE IT, RATHER JUST REDUCE THE COLSPAN BY 1
												if (TD.colSpan != 1) {
													TD.colSpan = Number(TD.colSpan) - 1;
												}

												TD.setAttribute('hiddencol_xs_count', hiddenColXCount + 1);

											}
										}
									}
								}
								connectAllDraggableDivsWithSVGLines();

							} else if (!this.checked) {

								for (k = 0; k < targetedTDClassList.length; k++) {
									//GET THE COL-X CLASSES BELONGING TO THE TARGETED TD
									if (targetedTDClassList[k].slice(0, prefixLength) == prefix) {
										var col_xClass = targetedTDClassList[k];

										/*
										What it does:
										1a. increase colspan if it is less than originalColsapn
										1b. show td if originalColsapn is greater than hiddenColXCount, which means that at least one of the col-x classe is to be shown
										2. decrease the count of hidden columns if it is not zero
										*/

										//GET COLLECTION OF TDs BELONGING TO THIS COL-X CLASS
										var tdsOfCheckedClass = storyLineTable.querySelectorAll('.' + col_xClass);

										/**************************************/
										//COMPARE ORIGINALCOLSPAN ATTRIBUTE WITH HIDDENCOL-XCLASSESCOUNT
										/**************************************/

										for (l = 0; l < tdsOfCheckedClass.length; l++) {

											var TD = tdsOfCheckedClass[l];

											var orgColSpan = Number(TD.getAttribute('originalcolspan'));
											var hiddenColXCount = Number(TD.getAttribute('hiddencol_xs_count'));

											//SHOW TD IF HIDDEN COL-X COUNT IS EQUAL TO THE ORGINAL COLSPAN
											if ((orgColSpan == hiddenColXCount)) {

												//SHOW THE TD
												TD.style.display = '';

											}
											//ONLY ACT IF THE TD HAS NOT BEEN HIDDEN (I.E., IF ORIGINAL COLSPAN AND HIDDEN COL COUNT ARE THE SAME)

											if (hiddenColXCount > 0) {


												//DECREASE THE HIDDENCOL-XCLASSESCOUNT BY 1
												TD.setAttribute('hiddencol_xs_count', hiddenColXCount - 1);
												var hiddenColXCount = Number(TD.getAttribute('hiddencol_xs_count'));

												//SET TDs COLSPAN (BECAUSE COLSPAN IS NEVER S0 SIMPLY ADDING ONE WILL PRODUCE IN ACCURACIES)
												TD.colSpan = orgColSpan - hiddenColXCount;
											}
										}
									}
								}
								connectAllDraggableDivsWithSVGLines();
							}
						}
					});
					/*************************************************/
					/*************************************************/

					//APPEND LABEL ELEMENT TO LIST
					elmLI.appendChild(labelListName);
					//APPEND INPUT ELEMENT TO LIST
					elmLI.appendChild(labelListNameCheckBox);
					//APPEND LIST ELEMENT TO OL
					elmUL.appendChild(elmLI);
				}
			}
			if (addNewLI == "yes") {
				timeMenuListDiv.appendChild(elmUL);
			}
		}
	}
}
/******************************************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*LOCATIONS MENU ARRAY*********************************************************************/
/******************************************************************************************/
function locationsMenuGenerate(LX) {
	//	locationsArray
	//get the cell's locationAttribute and append it to the timeMenu
	//CREATE LIST ELEMENT
	var lowerCaseLX = LX.toLowerCase();
	var LI4location = document.createElement('LI');
	LI4location.setAttribute('id', 'location_' + lowerCaseLX);
	//CREATE LABEL ELEMENT
	var locationListName = document.createElement('LABEL');
	locationListName.innerHTML = LX;
	locationListName.setAttribute('for', 'location_chkbox_' + lowerCaseLX);
	//APPEND INPUT (CHECKBOX) ELEMENT TO LIST
	var locationListNameCheckBox = document.createElement('INPUT');
	locationListNameCheckBox.setAttribute('type', 'checkbox');
	locationListNameCheckBox.setAttribute('value', lowerCaseLX);
	locationListNameCheckBox.setAttribute('id', 'location_chkbox_' + lowerCaseLX);
	locationListNameCheckBox.setAttribute('targetLocation', lowerCaseLX);
	locationListNameCheckBox.classList.add('locationsLINameCheckBox');

	/*ADD EVENTLISTNER TO INPUT ELEMENT TO SHOW/HIDE RESPECTIVE COL-X COLUMNS***************/
	/***************************************************************************************/
	locationListNameCheckBox.addEventListener('click', function () {
		var location2searchFor = this.getAttribute('targetLocation');
		var allTargetedTD = storyLineTable.querySelectorAll(`[location="` + location2searchFor + `"]`);
		if (this.checked == true) {
			allTargetedTD.forEach(function (itm) {
				itm.style.backgroundColor = 'rgba(0, 255, 127, 0.5)';
			})
		} else if (this.checked != true) {
			allTargetedTD.forEach(function (itm) {
				itm.style.backgroundColor = '';
				itm.style.border = '';
			})
		}
	});

	LI4location.addEventListener('mouseenter', function () {
		var location2searchFor = this.id.slice(9);
		console.log(location2searchFor);
		var allTargetedTD = storyLineTable.querySelectorAll(`[location="` + location2searchFor + `"]`);
		allTargetedTD.forEach(function (itm) {
			itm.style.backgroundColor = 'rgba(255, 231, 0, 0.56)';
			itm.style.border = '1px solid rgba(208, 164, 171, 0.48)';
		})
	});
	LI4location.addEventListener('mouseleave', function () {
		var locationCheckBox = this.querySelector('input');
		var location2searchFor = this.id.slice(9);
		var allTargetedTD = storyLineTable.querySelectorAll(`[location="` + location2searchFor + `"]`);
		if (!locationCheckBox.checked) {
			allTargetedTD.forEach(function (itm) {
				itm.style.backgroundColor = '';
				itm.style.border = '';
			})
		} else if (locationCheckBox.checked) {
			allTargetedTD.forEach(function (itm) {
				itm.style.backgroundColor = 'rgba(0, 255, 127, 0.5)';
			})
		}
	});

	//APPEND LABEL ELEMENT TO LIST
	LI4location.appendChild(locationListName);
	//APPEND INPUT ELEMENT TO LIST
	LI4location.appendChild(locationListNameCheckBox);
	//APPEND LIST ELEMENT TO OL
	locationsMenuList.appendChild(LI4location);

}

//APPEND LOCATION ATTRIBUTE
function createRegionAttribute() {
	var x = document.getElementById('locationInput').value;

	//	var row = storyLineTable.querySelectorAll('tr');
	var cell = rows[clickedRow].querySelectorAll('td')[clickedCell];

	if (cell.querySelector('.locationspan')) {
		var locationSpanElm = cell.querySelector('.locationspan');
		//		var formerAssignedLocation = cell.getAttribute('location');
		var formerAssignedLocation = locationSpanElm.innerHTML;
		//Remove Former LocationSpan Element
		locationSpanElm.remove();
		cell.setAttribute('location', x);

		//Check if there is any other LocationSpan with the same removed location
		//If none, then remove from the location menu list
		var newAssignedLocation = x;
		var allLocationSpanElm = storyLineTable.querySelectorAll('.locationspan');
		var doesLocationExist = 'no';

		for (i = 0; i < allLocationSpanElm.length; i++) {
			if (allLocationSpanElm[i].innerHTML == formerAssignedLocation) {
				doesLocationExist = 'yes';
				break;
			}
		}
		if (doesLocationExist == 'no') {
			console.log('NO-formerAssignedLocation is ' + formerAssignedLocation);
			console.log(document.getElementById('location_' + formerAssignedLocation.toLowerCase()));
			var indexOfLocation2Remove = locationsArray.indexOf(formerAssignedLocation.toLowerCase());
			console.log(indexOfLocation2Remove);
			locationsArray.splice(indexOfLocation2Remove, 1);
			document.getElementById('location_' + formerAssignedLocation.toLowerCase()).remove();
			document.getElementById('locopt_' + formerAssignedLocation.toLowerCase()).remove();
			console.log(locationsArray);
		}

	}

	if (x != '') {
		cell.setAttribute('location', x.toLowerCase());
		var locationSpan = document.createElement('SPAN');
		locationSpan.classList.add('locationspan');
		locationSpan.innerHTML = x;
		cell.prepend(locationSpan);

		var xLowerCase = x.toLowerCase();

		if (locationsArray.indexOf(xLowerCase) == -1) {
			locationsArray.push(xLowerCase);
			locationsMenuGenerate(x);

			//LOCATIONS OPTIONS
			var locationOption = document.createElement('OPTION');
			locationOption.text = x;
			locationOptionsDropdown.append(locationOption);
			locationOption.setAttribute('id', 'locopt_' + xLowerCase)
		};

		if (cell.hasAttribute('title')) {

			x = cell.getAttribute('title') + x;
			cell.setAttribute('title', x);
		}

		analyzeTable();
	}
}
/******************************************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*TIMELINES MENU ARRAY*********************************************************************/
/******************************************************************************************/
var shouldIhighlightRowName;
var shouldIhideRowName;

function hightlightCheckedTimelines(x) {
	uncheckAllBoxes('.timeLinesLINameCheckBox');

	shouldIhighlightRowName = 1;
	shouldIhideRowName = 0;
	x.style.backgroundColor = 'rgba(255, 231, 0, 0.45)';
	hideAllCheckedTimeLines.style.backgroundColor = '';
};

function HideCheckedTimelines(x) {
	uncheckAllBoxes('.timeLinesLINameCheckBox');

	shouldIhighlightRowName = 0;
	shouldIhideRowName = 1;
	x.style.backgroundColor = 'rgba(255, 231, 0, 0.45)';
	hightlightTimelines.style.backgroundColor = '';
};

function timeLinesMenu() {
	var rowsWithRowName = storyLineTable.querySelectorAll('[rowname]');
	var rowzRowName;

	for (i = 0; i < rowsWithRowName.length; i++) {
		rowzRowName = rowsWithRowName[i].getAttribute('rowname');
		if (rowsNameLLowerCaseArray.indexOf(rowzRowName.toLowerCase()) == -1) {
			rowNamesArray.push(rowzRowName)
		}
		rowsNameLLowerCaseArray.push(rowzRowName.toLowerCase())
	}

	//	console.log(timeLinesMenuList.childElementCount);
	removeAllChildNodesOf(timeLinesMenuList);
	rowNamesArray.forEach(function (RN) {

		/*CREATE LIST ELEMENT**************************/
		var lowerCaseRN = RN.toLowerCase();
		var LI4timeLines = document.createElement('LI');
		LI4timeLines.setAttribute('id', 'timeLines_' + RN);
		//CREATE LABEL ELEMENT
		var timeLinesListName = document.createElement('LABEL');
		timeLinesListName.innerHTML = RN;
		timeLinesListName.setAttribute('for', 'timeLines_chkbox_' + RN);
		//APPEND INPUT (CHECKBOX) ELEMENT TO LIST
		var timeLinesListNameCheckBox = document.createElement('INPUT');
		timeLinesListNameCheckBox.setAttribute('type', 'checkbox');
		timeLinesListNameCheckBox.setAttribute('value', RN);
		timeLinesListNameCheckBox.setAttribute('id', 'timeLines_chkbox_' + RN);
		timeLinesListNameCheckBox.setAttribute('targettimeLine', RN);
		timeLinesListNameCheckBox.classList.add('timeLinesLINameCheckBox');
		/**********************************************/

		/*ADD EVENTLISTNERS TO CHECKBOXES**************/
		timeLinesListNameCheckBox.addEventListener('click', function () {
			var rowName2searchFor = this.getAttribute('targettimeLine');
			var allTargetedTD = storyLineTable.querySelectorAll(`[rowname="` + rowName2searchFor + `"]`);
			if (this.checked == true) {
				allTargetedTD.forEach(function (itm) {
					if (shouldIhighlightRowName == 1) {
						itm.style.backgroundColor = 'rgba(0, 255, 127, 0.5)';
					}
					if (shouldIhideRowName == 1) {
						itm.style.display = 'none';
					}
				})
			} else if (this.checked != true) {
				allTargetedTD.forEach(function (itm) {
					if (shouldIhighlightRowName == 1) {
						itm.style.backgroundColor = '';
						itm.style.border = '';
					}
					if (shouldIhideRowName == 1) {
						itm.style.display = '';
					}
				})
			}
		});

		LI4timeLines.addEventListener('mouseenter', function () {
			var rowName2searchFor = this.id.slice(10);
			console.log(rowName2searchFor);
			var allTargetedTD = storyLineTable.querySelectorAll(`[rowname="` + rowName2searchFor + `"]`);
			allTargetedTD.forEach(function (itm) {
				itm.style.backgroundColor = 'rgba(255, 231, 0, 0.56)';
				itm.style.border = '1px solid rgba(208, 164, 171, 0.48)';
			})
		});
		LI4timeLines.addEventListener('mouseleave', function () {
			var locationCheckBox = this.querySelector('input');
			var rowName2searchFor = this.id.slice(10);
			var allTargetedTD = storyLineTable.querySelectorAll(`[rowname="` + rowName2searchFor + `"]`);
			if (!locationCheckBox.checked) {
				allTargetedTD.forEach(function (itm) {
					itm.style.backgroundColor = '';
					itm.style.border = '';
				})
			} else if (locationCheckBox.checked) {
				allTargetedTD.forEach(function (itm) {
					itm.style.backgroundColor = 'rgba(0, 255, 127, 0.5)';
				})
			}
		});

		/*APPEND LIST**********************************/
		//APPEND LABEL ELEMENT TO LIST
		LI4timeLines.appendChild(timeLinesListName);
		//APPEND INPUT ELEMENT TO LIST
		LI4timeLines.appendChild(timeLinesListNameCheckBox);
		//APPEND LIST ELEMENT TO OL
		timeLinesMenuList.appendChild(LI4timeLines);

		/**********************************************/
	})
}
/******************************************************/
/******************************************************/