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
var connectOnlyConnect2andConnect4rm = 0;
var customConnectionsOnly = 0;

var TypeOfHtmlHeader = 'H4';
var celldeselect;
var tblReady;
var selectedCell;
var CellzColXClassesArray = [];

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

var connectFromArray = [];
var connectToArray = [];
var expandMinimizeButtons = document.querySelectorAll('.expandMinimizeButton');

var connectAllDraggableDivsWithSVGLines = function () {
	generateCustomSVGConnectorsType1();
	generateCustomSVGConnectorsType2();
	generateCustomSVGConnectorsType3();
	//	buildLegendTable();
}

function toggleAllMasterNavBtnz() {
	expandMinimizeButtons.forEach(function (btn) {
		if (btn.innerHTML != '&#9776;') {
			btn.click()
		};
	})
	connectAllDraggableDivsWithSVGLines();
}

/*HOW TO CONNECT THE DIVS******************************/
/******************************************************/
function howShouldDivsBeConnected(x) {
	var goAhead = 0;
	if (storyLineTable.querySelector('div')) {
		for (i = 0; i < rows.length; i++) {
			if (!rows[i].getAttribute('rowname')) {
				customAlert('ONLY ACTORS IN TIMLINES WITH ROWNAME WILL BE CONNECTED!')
				break;
			}
			goAhead = 1;
		}
	} else {
		customAlert('There are no actors to connect.')
	}

	if (goAhead == 1) {
		if (connectByTimelines.checked == true) {

			if (customConnectionsOnly == 0) {
				customConnectionsOnly = 1;
			} else if (customConnectionsOnly == 1) {
				customConnectionsOnly = 0;
			}
			
			connectOnlyConnect2andConnect4rm = 0;
			connectAccording2RowNames = 0;
			connectByTimelines.checked = false;
			connectAllDraggableDivsWithSVGLines();
			x.style.backgroundColor = '';
			x.title = 'Connect Actors Across TimeLines';
			
		} else if (connectByTimelines.checked == false) {
			
			if (customConnectionsOnly == 0) {
				connectOnlyConnect2andConnect4rm = 0;
				connectAccording2RowNames = 1;
				connectByTimelines.checked = true;
				connectAllDraggableDivsWithSVGLines();
				x.style.backgroundColor = 'pink';
				x.title = "Connect Only Within RowNames"
				
			} else if (customConnectionsOnly == 1) {
				connectOnlyConnect2andConnect4rm = 1;
				connectAccording2RowNames = 0;
				connectByTimelines.checked = true;
				connectAllDraggableDivsWithSVGLines();
				x.style.backgroundColor = 'yellow';
				x.title = "Only Custom Connections"
			}
		}
	}
}
/******************************************************/
/******************************************************/

//CUSTOM ALERT
function customAlert(x) {
	customAlertBack.style.display = 'flex';
	customAlertContent.innerHTML = '<h2>' + x + '</h2>';

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
	//	var locationsLabels = locationsMenuList.querySelectorAll('label');
	/*	if (locationsLabels) {
			for (i = 0; i = locationsLabels.length; i++) {
				var location = locationsLabels[i].getAttribute('for');
				if (locationsArray.indexOf(location) == -1) {
					locationsArray.push(location);
					locationsMenuGenerate(location);
				};
			}
		}*/
	var cell = storyLineTable.querySelectorAll('td:not(:empty)');

	for (z = 0; z < cell.length; z++) {
		if (cell[z].querySelector('.locationspan')) {
			var locationSpanElm = cell[z].querySelector('.locationspan');
			var x = locationSpanElm.innerHTML;
			//		var formerAssignedLocation = cell.getAttribute('location');
			var location = x.toLowerCase();

			if (locationsArray.indexOf(location) == -1) {
				locationsArray.push(location);
				locationsMenuGenerate(x);
				var locationNameOption = document.createElement('OPTION');
				locationNameOption.text = x;
				locationNameOption.id = 'locopt_' + location;
				locationOptionsDropdown.append(locationNameOption);
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

	var divNameOptions = divNameOptionsDropdown.getElementsByTagName('option');

	for (i = 0; i < nameLabelDiv.length; i++) {

		var divzClass = nameLabelDiv[i].getAttribute('divclassname');
		var divzName = nameLabelDiv[i].innerHTML;

		//ARRAYS FOR DIV'S & THEIR CLASSES
		if (divClassArray.indexOf(divzClass) == -1) {
			divClassArray.push(divzClass);
			buildActorsMenu(divzClass);
			divopt_ClassArray.push('opt_' + divzClass);

			divNameAttributeArray.push(divzClass);
			var dNmoption = document.createElement('OPTION');
			dNmoption.text = divzClass;
			dNmoption.setAttribute('optCounter', 1);
			dNmoption.setAttribute('optClassName', divzClass);
			var dNmClone = dNmoption.cloneNode(true);
			var dNmClone2 = dNmoption.cloneNode(true);
			divClassOptionsDropdown.append(dNmoption);
			divClass2ConnectFromOptions.append(dNmClone);
			divClass2ConnectToOptions.append(dNmClone2);
		}
		if (divNameArray.indexOf(divzName) == -1) {
			divNameArray.push(divzName);
			var dNmoption = document.createElement('OPTION');
			dNmoption.text = divzName;
			dNmoption.setAttribute('optCounter', 1);
			dNmoption.setAttribute('optClassName', divzName);
			divNameOptionsDropdown.append(dNmoption);
			for (j = 0; j < divNameOptions.length; j++) {
				if (divNameOptions[j].text == divzName) {
					var optCounterValue = Number(divNameOptions[j].getAttribute('optCounter'));
					divNameOptions[j].setAttribute('optCounter', ++optCounterValue);
					break;
				}
			}
		}
	}
	btn_buildLegendTable();
	connectAllDraggableDivsWithSVGLines();
}
/****************************************************/
/****************************************************/
function storyTableTitle() {
	var title = document.getElementsByTagName('title')[0];
	if (title) {
		storyLineTableTitleHeader.innerHTML = title.innerHTML;
	}
}
/******************************************************/
/******************************************************/
//var scaleSize = 1;
//ZOOM STORYLINE TABLE WITH SCOLL-WHEEL
//divTableContainer.addEventListener('mousewheel', function (e) {
//	masterTable.style.transform = "origin(left,top)";
//	if (e.wheelDelta < 0) {
//		if (scaleSize != 1) {
//			scaleSize = scaleSize - 0.1;
//		}
//		masterTable.style.transform = "scale(" + scaleSize + ")";
//		connectAllDraggableDivsWithSVGLines;
//	} else if (e.wheelDelta > 0) {
//		scaleSize = scaleSize + 0.1;
//		masterTable.style.transform = "scale(" + scaleSize + ")";
//		connectAllDraggableDivsWithSVGLines;
//	}
//})


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

	//HIDE THE EDITOR, DETAILS, SLIDESHO WINDOWS
	setTimeout(() => slideShowListMaster.style.display = 'none', 200);
	setTimeout(() => detailsSection.style.display = 'none', 300);
	setTimeout(() => alternateStoryLineEditorButtons.style.display = 'none', 400);

	//GET THE TITLE OF THE TABLE
	storyTableTitle();

	//MINIMIZE THE CONTROL MENU ITEMS
	setTimeout(() => toggleAllMasterNavBtnz(), 100);

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
	generateActorsNodesArrayOnLoad();

	/*
		//FUNCTION FOR REMOVING ALL INLINE STYLES --darkreader....
		var storyLineTableCONTENT = storyLineTable.innerHTML;
		storyLineTableCONTENT.toString();
		storyLineTableCONTENT = storyLineTableCONTENT.replace(/ style=("|\')(.*?)("|\')/g, '');
		storyLineTable.innerHTML = storyLineTableCONTENT;
	*/
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
	if ((celldeselect) && (celldeselect.querySelector(TypeOfHtmlHeader))) {
		var h2r = celldeselect.querySelector(TypeOfHtmlHeader);
		emptyCellDeselect(h2r);
	}
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

			//GENERATE ARRAY OF COL-X CLASSES
			CellzColXClassesArray = [];
			var cellsClassList = this.classList;
			var prefix = 'col-';
			var prefixLength = prefix.length;

			for (j = 0; j < cellsClassList.length; j++) {

				//GET THE COL-X CLASSES ONE AFTER ANOTHER BELONGING TO THE TARGETED TD
				if (cellsClassList[j].slice(0, prefixLength) == prefix) {
					CellzColXClassesArray.push(cellsClassList[j]);
				}
			}
		}
		//		if (cells[i].innerHTML) {
		cells[i].onmouseover = function () {
			var cellsClassList = this.classList;
			var prefix = 'col-';
			var prefixLength = prefix.length;

			for (k = 0; k < cellsClassList.length; k++) {

				//GET THE COL-X CLASSES ONE AFTER ANOTHER BELONGING TO THE TARGETED TD
				if (cellsClassList[k].slice(0, prefixLength) == prefix) {
					var col_xClass = cellsClassList[k];

					//GET COLLECTION OF TDs BELONGING TO THIS COL-X CLASS
					var tdsOfCheckedClass = storyLineTable.querySelectorAll('.' + col_xClass);

					//GO THROUGH EACH CELL BELONGING TO THIS CLASS
					for (l = 0; l < tdsOfCheckedClass.length; l++) {
						var TD = tdsOfCheckedClass[l];
						if (!TD.classList.contains('selected')) {
							if (TD.innerHTML) {
								TD.style.backgroundColor = 'rgba(255, 231, 0, 0.6)';
							}
							if (!TD.innerHTML) {
								TD.style.backgroundColor = 'rgba(255, 231, 0, 0.2)';
							}
							if (this.innerHTML) {
								this.style.backgroundColor = 'rgba(255, 165, 0, 0.75)';
							}
						}
					}
				}
			}
		}
		//		}
		cells[i].onmouseout = function () {
			var cellsClassList = this.classList;
			var prefix = 'col-';
			var prefixLength = prefix.length;

			for (k = 0; k < cellsClassList.length; k++) {

				//GET THE COL-X CLASSES ONE AFTER ANOTHER BELONGING TO THE TARGETED TD
				if (cellsClassList[k].slice(0, prefixLength) == prefix) {
					var col_xClass = cellsClassList[k];

					//GET COLLECTION OF TDs BELONGING TO THIS COL-X CLASS
					var tdsOfCheckedClass = storyLineTable.querySelectorAll('.' + col_xClass);

					//GO THROUGH EACH CELL BELONGING TO THIS CLASS
					for (l = 0; l < tdsOfCheckedClass.length; l++) {
						var TD = tdsOfCheckedClass[l];
						if (!TD.classList.contains('selected')) {
							TD.style.backgroundColor = '';
						}
					}
				}
			}
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

					//clear the input boxes of the custom connection section
					divClass2ConnectTo.value = '';
					divToDisConnectFrom.value = '';
				}

				clickedDIV = this;
				initialColor = this.style.backgroundColor;
				this.style.backgroundColor = "lightgrey";

				//DELETE BUTTON
				initialdeleteDivBtnColor = divDeleteButton.style.backgroundColor;
				divDeleteButton.style.backgroundColor = 'pink';
				//CONNECTTO BUTTON
				connectFromButton.style.backgroundColor = 'pink';


				//RESET THE COLOR OF THE MODIFIED BUTTONS
				clickedDIVColorTimeOut = setTimeout(() => [clickedDIV.style.backgroundColor = initialColor], 5000);
				deletButtonColorTimeOut = setTimeout(() => [divDeleteButton.style.backgroundColor = ''], 5000);
				connectToButtonColorTimeOut = setTimeout(() => [connectFromButton.style.backgroundColor = ''], 5000);

				//clear connectFromArray so that it doesnt have values from old clicked div

				connectFromArray = [];
				generateDisconnectFromDropdown();

				connectToArray = [];
				generateDisconnectToDropdown();

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
	connectAllDraggableDivsWithSVGLines();
}

//DECREASE CELL COLSPAN
function decreaseCellColspan() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td')[clickedCell];
	var currentColspan = cell.getAttribute('colspan');
	currentColspan = (currentColspan - 1) || 1;
	currentColspan = cell.setAttribute('colspan', currentColspan);

	analyzeTable();
	connectAllDraggableDivsWithSVGLines();
}

//DELETE CELL
function deleteCell() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td');
	cell[clickedCell].style.display = 'none';

	analyzeTable();
	connectAllDraggableDivsWithSVGLines();
}

//HIDE CELL
function hideCell() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td');
	cell[clickedCell].style.visibility = 'hidden';

	analyzeTable();
	connectAllDraggableDivsWithSVGLines();
}

//DESTROY CELL (I.E. REMOVE FROM DOM)
function destroyCell() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td');
	cell[clickedCell].remove();

	analyzeTable();
	connectAllDraggableDivsWithSVGLines();
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
var makeCellsSelectable4MergeSplit = 0;


function selectCells(dbtn) {

	if (selectCellsToMerge == 1) {

		dbtn.style.background = active;
		makeCellsSelectable4MergeSplit = 1;
		selectCellsToMerge = 0
		cellSelectBtn = dbtn;
		shouldContentsBeMerged = 1;

		var cells = storyLineTable.querySelectorAll('td');

		for (i = 0; i < cells.length; i++) {
			cells[i].onclick = function () {

				if ((!this.classList.contains('selected')) && ((dbtn.style.background == active) || (makeCellsSelectable4MergeSplit == 1)) && (this.rowSpan == 1)) {
					
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
		makeCellsSelectable4MergeSplit = 0;
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
		if (clonedRowTds[i].hasAttribute('detailindex')) {
			clonedRowTds[i].removeAttribute('detailindex');
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
		if (clonedRowTds[i].hasAttribute('detailindex')) {
			clonedRowTds[i].removeAttribute('detailindex');
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

function modifyColumn(what2do) {
	var row = storyLineTable.querySelectorAll('tr');

	/***********************************************************/

	//find true index of clicked cell
	var trueIndexUpper = -1;
	for (i = 0; i < (clickedCell + 1); i++) {
		var cellsUp2clickedCell = row[clickedRow].cells[i];
		trueIndexUpper = trueIndexUpper + row[clickedRow].cells[i].colSpan; //all colspans minus 1 will give the trueindexUpper
	}

	//for when clickedCell has colSpan > 1
	var colSpanOfClickedCell = row[clickedRow].cells[clickedCell].colSpan;
	var trueIndexLower;
	if (colSpanOfClickedCell > 1) {
		trueIndexLower = trueIndexUpper - colSpanOfClickedCell + 1;
	}
	var colClass2query = 'col-' + (trueIndexUpper + 1);
	var lessThanColClass2query = 'col-' + (trueIndexUpper);
	var greaterThanColClass2query = 'col-' + (trueIndexUpper + 2);

	var colClass2query_lower = 'col-' + (trueIndexLower + 1);
	var lessThanColClass2query_lower = 'col-' + (trueIndexLower);
	var greaterThanColClass2query_lower = 'col-' + (trueIndexLower + 2);
	//in each row, add cell before cell with the class of colClass2query

	/***********************************************************/

	if (what2do == 'createColumnBefore') {
		if (colSpanOfClickedCell == 1) {
			for (j = 0; j < row.length; j++) {
				beforeCell = row[j].querySelector('.' + colClass2query).cellIndex; //getting index of cell with class of colClass2query. this is for insertion before
				afterCell = beforeCell + 1;
				if (row[j].querySelector('.' + colClass2query).classList.contains(lessThanColClass2query)) {
					//				row[j].cells[beforeCell].colSpan = row[j].cells[beforeCell].colSpan + 1;
					//this doesn't really change the colspan value because of the function related to the 'originalcolspan' attribute
					var newCellzColSpan = row[j].cells[beforeCell].colSpan + 1;
					row[j].cells[beforeCell].setAttribute('originalcolspan', newCellzColSpan);
				} else {
					row[j].insertCell( /*newIcell || */ beforeCell);
				}
			}
		}
		if (colSpanOfClickedCell > 1) {
			for (j = 0; j < row.length; j++) {
				beforeCell = row[j].querySelector('.' + colClass2query_lower).cellIndex; //getting index of cell with class of colClass2query. this is for insertion before
				afterCell = beforeCell + 1;
				if (row[j].querySelector('.' + colClass2query_lower).classList.contains(lessThanColClass2query_lower)) {
					var newCellzColSpan = row[j].cells[beforeCell].colSpan + 1;
					row[j].cells[beforeCell].setAttribute('originalcolspan', newCellzColSpan);
				} else {
					row[j].insertCell( /*newIcell || */ beforeCell);
				}
			}
		}
	}

	if (what2do == 'createColumnAfter') {
		for (j = 0; j < row.length; j++) {
			beforeCell = row[j].querySelector('.' + colClass2query).cellIndex; //getting index of cell with class of colClass2query. this is for insertion before
			afterCell = beforeCell + 1;
			if (row[j].querySelector('.' + colClass2query).classList.contains(greaterThanColClass2query)) {
				var newCellzColSpan = row[j].cells[beforeCell].colSpan + 1;
				row[j].cells[beforeCell].setAttribute('originalcolspan', newCellzColSpan);
			} else {
				row[j].insertCell( /*newIcell || */ afterCell);
			}
		}
	}
	if (what2do == 'destroyColumn') {
		for (j = 0; j < row.length; j++) {
			beforeCell = row[j].querySelector('.' + colClass2query).cellIndex; //getting index of cell with class of colClass2query. this is for insertion before
			afterCell = beforeCell + 1;

			if ((row[j].querySelector('.' + colClass2query).classList.contains(greaterThanColClass2query)) || (row[j].querySelector('.' + colClass2query).classList.contains(lessThanColClass2query))) {
				var newCellzColSpan = row[j].cells[beforeCell].colSpan - 1; //this is neccesary
				row[j].cells[beforeCell].setAttribute('originalcolspan', newCellzColSpan);
			} else {
				row[j].cells[beforeCell].remove();
			}
		}
	}
	/***********************************************************/
	analyzeTable();
	generateColumnClasses();
	connectAllDraggableDivsWithSVGLines();
	dragDiv2TD();
	divListeners();
}

function createColumnBefore() {
	modifyColumn('createColumnBefore');
}

//CREATE COLUMN AFTER CLICKED COLUMN
function createColumnAfter() {
	modifyColumn('createColumnAfter');
}

//DELETE COLUMN
function destroyColumn() {
	modifyColumn('destroyColumn');
}

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


/*
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
*/


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
	connectAllDraggableDivsWithSVGLines();
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
	connectAllDraggableDivsWithSVGLines();
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
	connectAllDraggableDivsWithSVGLines();
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

		//LengendTableRow Class
		newTR.setAttribute('rowname', newTRtxt);
		if (newTRtxt != null) {
			var rownameSpaceArray = newTRtxt.split(' ');
			var rName_modified = '';
			rownameSpaceArray.forEach(function (rn) {
				rName_modified = rName_modified + '_' + rn;
			});
			newTR.classList.add('rowname' + rName_modified);
		}

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
		//FOR THEAD ROWS
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
						newLTrow(tdsHeight, rowName1, TRsection2o);
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
	uncheckOnly('.timeLINameCheckBox');
	dragDiv2TD();
	divListeners();
	if (clickedCell) {
		deselectEmptyCell();
	}
	buildLegendTable();
	resetClasses();
	createTimeMenu("ROW");
	connectAllDraggableDivsWithSVGLines;
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
		var cdd = dClass.slice(0, 1);
		if (isNaN(parseInt(cdd))) {
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
					var dNmClone = divClassOption.cloneNode(true);
					divClassOptionsDropdown.append(divClassOption);
					divClass2ConnectToOptions.append(dNmClone);
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
					//FOR THE DIV2CONNECT TO OPTIONS
					var divClass2ConnectOptions =
						divClass2ConnectToOptions.getElementsByTagName('option');

					for (j = 0; j < divClass2ConnectOptions.length; j++) {
						if (divClass2ConnectOptions[j].text == dClass) {
							var optCounterValue = Number(divClass2ConnectOptions[j].getAttribute('optCounter'))
							divClass2ConnectOptions[j].setAttribute('optCounter', ++optCounterValue);
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
	locationOptionsDropdown.setAttribute('onchange', 'fillLocationInput()');
	divClass2ConnectFromOptions.setAttribute('onchange', 'fillDivClass2ConnectFrom()');
	divToDisConnect4rmOptions.setAttribute('onchange', 'fillDivClassToDisConnectFrom()');
	divClass2ConnectFromOptions.setAttribute('onchange', 'fillDivClass2ConnectTo()');
	divToDisConnect4rmOptions.setAttribute('onchange', 'fillDivClassToDisConnectTo()');
}

function fillDivNameInput() {
	input4divName.value = divNameOptionsDropdown.value;
};

function fillDivClassInput() {
	input4divClass.value = divClassOptionsDropdown.value;
};

function fillLocationInput() {
	locationInput.value = locationOptionsDropdown.value;
};

function fillDivClass2ConnectFrom() {
	divClass2ConnectFrom.value = divClass2ConnectFromOptions.value;
};

function fillDivClassToDisConnectFrom() {
	divToDisConnectFrom.value = divToDisConnect4rmOptions.value;
};

function fillDivClass2ConnectTo() {
	divClass2ConnectTo.value = divClass2ConnectToOptions.value;
};

function fillDivClassToDisConnectTo() {
	divToDisConnectTo.value = divToDisConnect2Options.value;
};
/******************************************************************************************/
/******************************************************************************************/

/******************************************************************************************/
/*MAKE TABLE EDITABLE BUTTON***************************************************************/
/******************************************************************************************/

var masterEditButton = document.getElementById('masterEditButton');

function alternateClose() {
	makeTableEditable();
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

//THIS FUNCTION CHECKS OR UNCHECKS THE LIST CHECKBOXES BASED ON HOW MANY OF THEM ARE CHECKED AT THE TIME IT IS CLICKED
function uncheckAllBoxes(x) {
	var classesToUncheck = document.querySelectorAll(x);
	var shouldIUncheck = 0;

	for (i = 0; i < classesToUncheck.length; i++) {
		var itmCh = classesToUncheck[i];
		if (itmCh.checked) {
			shouldIUncheck = 1;
			break;
		}
	}
	if (shouldIUncheck) {
		classesToUncheck.forEach(function (itm) {
			if (itm.checked) {
				previouslyChecked = null;
				itm.click();
			}
		})
	} else {
		classesToUncheck.forEach(function (itm) {
			if (!itm.checked) {
				itm.click();
			}
		})
	}

}

function uncheckOnly(x) {
	var classesToUncheck = document.querySelectorAll(x);
	classesToUncheck.forEach(function (itm) {
		if (itm.checked) {
			itm.click();
		}
	})
}
/*function uncheckAllBoxes(x) {
	var classesToUncheck = document.querySelectorAll(x);
	classesToUncheck.forEach(function (itm) {
		if (itm.checked) {
			itm.click();
		}
	})
}*/
/******************************************************************************************/
/******************************************************************************************/


/******************************************************************************************/
/*BUILD LABELS/ACTORS MENU*****************************************************************/
/******************************************************************************************/
var previouslyChecked;

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
			
			if (previouslyChecked != null) {
				previouslyChecked.checked = false;
			}
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
				previouslyChecked = this;
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
				previouslyChecked = null;
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
/*BUILD TIME SECTION MENU* ************************************************************************/
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

						/*
						targetedTD.click();
						deselectEmptyCell();
						
						THE CODE BELOW IS SO THE THE DETAIL OF THE SELECTED TD WILL AUTOMATICALLY LOAD IN THE DETAILS SECTION.
						THIS IS HOWEVER PROBLEMATIC AS THE DETAILS INDEX SEEMS TO BE SOMETIMES WORKING WRONGLY.
						ALSO, THIS CAN IDEALLY ONLY SHOW DETAILS FOR THE TIME-ROW TDS
						*/

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
													/*
													//THE FOLLOWING CODE WAS AN ATTEMPT TO KEEP THE SPACING BETWEEN THE DISPLAYED EVENTS. IT HOWEVER REQUIRES MORE WORK AS IT MESSES UP THE AESTETHICS
													if(TD.innerHTML){TD.style.display = 'none';}
													*/
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
						buildLegendTable();
					});
					/*************************************************/
					/*************************************************/

					//APPEND LABEL ELEMENT TO LIST
					elmLI.appendChild(labelListName);
					//APPEND INPUT ELEMENT TO LIST
					elmLI.appendChild(labelListNameCheckBox);

					/***************************************************************************************/
					/*ADD EVENTLISTNER TO INPUT ELEMENT TO HIGHLIGHT RESPECTIVE COL-X COLUMNS***************/
					/***************************************************************************************/
					elmLI.addEventListener('mouseenter', function () {
						var lizInput = this.querySelector('input');
						var targetRowI = lizInput.getAttribute('targetRowIndex');
						var targetCellI = lizInput.getAttribute('targetCellIndex');
						var targetedTD = storyLineTableTHead.rows[targetRowI].cells[targetCellI];

						/*GET COL-X CLASSES AND ACT*********************/
						/***********************************************/
						var targetedTDClassList = targetedTD.classList;
						var cellsClassList = this.classList;
						var prefix = 'col-';
						var prefixLength = prefix.length;

						for (k = 0; k < targetedTDClassList.length; k++) {

							//GET THE COL-X CLASSES ONE AFTER ANOTHER BELONGING TO THE TARGETED TD
							if (targetedTDClassList[k].slice(0, prefixLength) == prefix) {
								var col_xClass = targetedTDClassList[k];

								//GET COLLECTION OF TDs BELONGING TO THIS COL-X CLASS
								var tdsOfCheckedClass = storyLineTable.querySelectorAll('.' + col_xClass);

								//GO THROUGH EACH CELL BELONGING TO THIS CLASS
								for (l = 0; l < tdsOfCheckedClass.length; l++) {
									var TD = tdsOfCheckedClass[l];
									if (TD.innerHTML) {
										TD.style.backgroundColor = 'rgba(255, 231, 0, 0.73)';
									}
									if (!TD.innerHTML) {
										TD.style.backgroundColor = 'rgba(255, 231, 0, 0.24)';
									}
								}
							}
						}
					})

					elmLI.addEventListener('mouseout', function () {
						var lizInput = this.querySelector('input');
						var targetRowI = lizInput.getAttribute('targetRowIndex');
						var targetCellI = lizInput.getAttribute('targetCellIndex');
						var targetedTD = storyLineTableTHead.rows[targetRowI].cells[targetCellI];

						/*GET COL-X CLASSES AND ACT*********************/
						/***********************************************/
						var targetedTDClassList = targetedTD.classList;
						var cellsClassList = this.classList;
						var prefix = 'col-';
						var prefixLength = prefix.length;

						for (k = 0; k < targetedTDClassList.length; k++) {

							//GET THE COL-X CLASSES ONE AFTER ANOTHER BELONGING TO THE TARGETED TD
							if (targetedTDClassList[k].slice(0, prefixLength) == prefix) {
								var col_xClass = targetedTDClassList[k];

								//GET COLLECTION OF TDs BELONGING TO THIS COL-X CLASS
								var tdsOfCheckedClass = storyLineTable.querySelectorAll('.' + col_xClass);

								//GO THROUGH EACH CELL BELONGING TO THIS CLASS
								for (l = 0; l < tdsOfCheckedClass.length; l++) {
									var TD = tdsOfCheckedClass[l];
									TD.style.backgroundColor = '';
								}
							}
						}
					})
					/*************************************************/
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
			var indexOfLocation2Remove = locationsArray.indexOf(formerAssignedLocation.toLowerCase());
			locationsArray.splice(indexOfLocation2Remove, 1);
			document.getElementById('location_' + formerAssignedLocation.toLowerCase()).remove();
			document.getElementById('locopt_' + formerAssignedLocation.toLowerCase()).remove();
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
	connectAllDraggableDivsWithSVGLines();
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
}

function HideCheckedTimelines(x) {
	uncheckAllBoxes('.timeLinesLINameCheckBox');

	shouldIhighlightRowName = 0;
	shouldIhideRowName = 1;
	x.style.backgroundColor = 'rgba(255, 231, 0, 0.45)';
	hightlightTimelines.style.backgroundColor = '';
}

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
			var legendTableRowClass = legendTable.querySelector(`[rowname="` + rowName2searchFor + `"]`).classList[0];
			var legendTableRow = legendTable.getElementsByClassName(legendTableRowClass)[0];
			var legendTableRowsToggleStyle = document.getElementById('legendTableRowsToggleStyle')
			if (this.checked == true) {
				allTargetedTD.forEach(function (itm) {
					if (shouldIhighlightRowName == 1) {
						itm.style.backgroundColor = 'rgba(0, 255, 127, 0.5)';
					}
					if (shouldIhideRowName == 1) {
						itm.style.display = 'none';
						//to HIDE corresponding lengendTableRow (setting style.display = 'none' will not work because of the table will be rebuilt)
						//add the following to the styleSheet
						legendTableRowsToggleStyle.append(`.` + legendTableRowClass + `{ display: none;}`)
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
						//to SHOW corresponding lengendTableRow
						var ltrtsArray = legendTableRowsToggleStyle.innerHTML.split(`.` + legendTableRowClass + `{ display: none;}`);
						legendTableRowsToggleStyle.innerHTML = '';
						ltrtsArray.forEach(function (ltr) {
							var formerInner = legendTableRowsToggleStyle.innerHTML;
							legendTableRowsToggleStyle.innerHTML = formerInner + ltr;
						})
						ltrtsArray = [];
					}
				})
			}
			setTimeout(connectAllDraggableDivsWithSVGLines, 5);
			//			buildLegendTable();
		});

		LI4timeLines.addEventListener('mouseenter', function () {

			var rowName2searchFor = this.id.slice(10);
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

/*WEBSITE NAVIGATION***********************************/
/******************************************************/
function showHideSiteNav(x) {
	if (x.style.display == 'none') {
		x.style.display = '';
	} else {
		x.style.display = 'none';
	}
}

function navMenu() {

	window.scrollTo(0, 0);

	var webSiteNavLinks = websiteNav.querySelectorAll('*:not(a)');

	for (let i = 1; i <= webSiteNavLinks.length; i++) {
		setTimeout(() => showHideSiteNav(webSiteNavLinks[i - 1]), 5 * i)
	}

	connectAllDraggableDivsWithSVGLines;
}
/******************************************************/
/******************************************************/



/****************************************************************/
/*2ND TYPE SVG CONNECTOR -- CONNECTFROM*/
/****************************************************************/

function connectFrom() {

	//The following just builds the connectFrom attribute of the clicked div
	if (clickedDIV) {
		var selectedClass2Connect4rm = divClass2ConnectFrom.value;
		if (clickedDIV.getAttribute('connectFrom')) {
			if (connectFromArray.indexOf(selectedClass2Connect4rm) == -1) {
				var formerConnectFrom = clickedDIV.getAttribute('connectFrom');
				var newConnectFrom = formerConnectFrom + ", " + selectedClass2Connect4rm;
				clickedDIV.setAttribute('connectFrom', newConnectFrom)
			}
		} else {
			if (selectedClass2Connect4rm != '') {
				clickedDIV.setAttribute('connectFrom', selectedClass2Connect4rm)
			}
		}
		//generate the options to disconnect from
		generateDisconnectFromDropdown();
	}

	//The following generates the special lines
	generateCustomSVGConnectorsType2();
}
var divToDisConnect4rmOptions = document.getElementById('divToDisConnect4rmOptions');

function generateDisconnectFromDropdown() {
	//Clear the divToDisConnect4rmOptions select menu
	divToDisConnect4rmOptions.innerHTML = '';

	if (clickedDIV.getAttribute('connectFrom')) {
		//get the connectFrom attribute value which is a string
		var connectFromString = clickedDIV.getAttribute('connectFrom');
		//convert it into an array to be converted into individual options to be appended to the divToDisConnect4rmOptions select menu
		connectFromArray = connectFromString.split(', ');

		//Clear the divToDisConnect4rmOptions select menu
		if (divToDisConnect4rmOptions.innerHTML) {
			divToDisConnect4rmOptions.innerHTML = '';
		}

		//loop through the generated array and append options
		for (i = 0; i < connectFromArray.length; i++) {
			var disConnectFromOption = document.createElement('OPTION');
			disConnectFromOption.text = connectFromArray[i];
			divToDisConnect4rmOptions.append(disConnectFromOption);
		}
	}
}

function disConnectFrom() {
	if (clickedDIV) {
		var node2 = clickedDIV;
		var node1;

		var selectedClass2DisConnect4rm = divToDisConnectFrom.value;

		if (clickedDIV.getAttribute('connectFrom')) {
			if (connectFromArray.indexOf(selectedClass2DisConnect4rm) != -1) {
				//remove the class from the connectFromArray
				var i2remove = connectFromArray.indexOf(selectedClass2DisConnect4rm);
				connectFromArray.splice(i2remove, 1);
				//convert the array to a string to replace the former value of the the connectFrom attribute of the selected div
				var newConnectFrom = connectFromArray.join(", ");
				clickedDIV.setAttribute('connectFrom', newConnectFrom)
			}
			if (clickedDIV.getAttribute('connectFrom') == '') {
				clickedDIV.removeAttribute('connectFrom');
			}
		} else {
			customAlert("NOTHING TO DISCONNECT FROM");
		}
		//clear the input
		divToDisConnectFrom.value = '';
		//re-generate the options to disctonnect from
		generateDisconnectFromDropdown();

		//The following generates the special lines
		generateCustomSVGConnectorsType2();
	}
}
/****************************************************************/
/****************************************************************/

/****************************************************************/
/*3RD TYPE SVG CONNECTOR */
/****************************************************************/

function connectTo() {

	//The following just builds the connectFrom attribute of the clicked div
	if (clickedDIV) {
		var selectedClass2Connect2 = divClass2ConnectTo.value;
		if (clickedDIV.getAttribute('connectTo')) {
			if (connectToArray.indexOf(selectedClass2Connect2) == -1) {
				var formerConnectTo = clickedDIV.getAttribute('connectTo');
				var newConnectTo = formerConnectTo + ", " + selectedClass2Connect2;
				clickedDIV.setAttribute('connectTo', newConnectTo)
			}
		} else {
			if (selectedClass2Connect2 != '') {
				clickedDIV.setAttribute('connectTo', selectedClass2Connect2)
			}
		}
		//generate the options to disconnect from
		generateDisconnectToDropdown();
	}

	//The following generates the special lines
	generateCustomSVGConnectorsType3();
}
var divToDisConnect2Options = document.getElementById('divToDisConnect2Options');

function generateDisconnectToDropdown() {
	//Clear the divToDisConnect2Options select menu
	divToDisConnect2Options.innerHTML = '';

	if (clickedDIV.getAttribute('connectTo')) {
		//get the connectTo attribute value which is a string
		var connectToString = clickedDIV.getAttribute('connectTo');
		//convert it into an array to be converted into individual options to be appended to the divToDisConnect2Options select menu
		connectToArray = connectToString.split(', ');

		//Clear the divToDisConnect4rmOptions select menu
		if (divToDisConnect2Options.innerHTML) {
			divToDisConnect2Options.innerHTML = '';
		}

		//loop through the generated array and append options
		for (i = 0; i < connectToArray.length; i++) {
			var disConnectToOption = document.createElement('OPTION');
			disConnectToOption.text = connectToArray[i];
			divToDisConnect2Options.append(disConnectToOption);
		}
	}
}

function disConnectTo() {
	if (clickedDIV) {
		var node2 = clickedDIV;
		var node1;

		var selectedClass2DisConnect2 = divToDisConnectTo.value;

		if (clickedDIV.getAttribute('connectTo')) {
			if (connectToArray.indexOf(selectedClass2DisConnect2) != -1) {
				//remove the class from the connectFromArray
				var i2remove = connectToArray.indexOf(selectedClass2DisConnect2);
				connectToArray.splice(i2remove, 1);
				//convert the array to a string to replace the former value of the the connectFrom attribute of the selected div
				var newConnectTo = connectToArray.join(", ");
				clickedDIV.setAttribute('connectTo', newConnectTo)
			}
			if (clickedDIV.getAttribute('connectTo') == '') {
				clickedDIV.removeAttribute('connectTo');
			}
		} else {
			customAlert("NOTHING TO DISCONNECT TO");
		}
		//clear the input
		divToDisConnectTo.value = '';
		//re-generate the options to disctonnect To
		generateDisconnectToDropdown();

		//The following generates the special lines
		generateCustomSVGConnectorsType3();
	}
}
/****************************************************************/
/****************************************************************/
