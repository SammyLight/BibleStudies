////////////////////////////////////////////////////////////////
//HELPER FUNCTIONS//////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/*FUNCTION TO REMOVE ALL CHILDREN OF PARENT*/
function removeAllChildNodesOf(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

/*FUNCTION TO GET COL-X CLASS OF SELECTED CELL (this will be used to get corresponding time sections)*/
//element.getSingleClassWithPrefix(prefix);
//element.getArrayOfClassesWithPrefix(prefix);
function getClassesWithPrefix(node, prefix) {
	var col_xClass;
	var nodeClassList = node.classList;
	var prefixLength = prefix.length;
	for (i = 0; i < nodeClassList.length; i++) {
		if (nodeClassList[i].slice(0, prefixLength) == prefix) {
			col_xClass = nodeClassList[i];
		}
	}
}

//FUNCTION TO GET MISSING NUMBERS WITHIN A RANGE
function getMissingNumber(arrayOrStringOfNumbers) {
	var arr = [];
	if (Array.isArray(arrayOrStringOfNumbers)) {
		arr = arrayOrStringOfNumbers;
	} else {
		arr = str.split(/\s/);
	}
	var missingNum = [];
	for (var i = /*Math.min(...arr)*/ 1; i < Math.max(...arr); i++) {
		if (arr.indexOf(i) === -1) {
			missingNum.push(i);
		}
	}
	return missingNum;
}
//use as
//getMissingNumber(arrayOrStringOfNumbers);

///////////////////////////////////////////////
/*Add Indicator for Cell That Has Details*/
function addIndicatorShowingThatCellHasDetail (currentCell){
	var divIndicatingCellHasDetail = currentCell.querySelector('.localShowDetailButton');
	if (divIndicatingCellHasDetail) {
		divIndicatingCellHasDetail.remove();
	}
	var dtlCount = currentCell.getAttribute('detailIndex');
	var localShowDetailButton = document.createElement('BUTTON');
	localShowDetailButton.innerHTML = "+";
	localShowDetailButton.classList.add('localShowDetailButton');
	localShowDetailButton.id = 'locDtlShowBtn_' + dtlCount;
	localShowDetailButton.setAttribute('detailIndex', dtlCount);
	localShowDetailButton.setAttribute('title', "Show notes and details of selected events");
	localShowDetailButton.setAttribute('onclick', "toggleDetailsSection()");
	//use css to add content of button
	currentCell.prepend(localShowDetailButton);
}

/*Remove Indicator for Cell That Has Details*/
function removeIndicatorShowingThatCellHasDetail (currentCell){
		var localShowDetailButton = currentCell.querySelector('.localShowDetailButton');
		localShowDetailButton.remove();
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var detailsSummary = document.getElementById('detailsSummary');
var previouslyClickedCell;
var detailsSection = document.getElementById('detailsSection');
var detailsCount;
var detailsCountArray = [];
var initialDetailsOnload = detailsSection.querySelectorAll(`div[detailIndex]`);
////////////////////////////////////////////
//FOR CLEANING UP THE DETAILINDEX...////////
////////////////////////////////////////////
for (i = 0; i < initialDetailsOnload.length; i++) {
	if (initialDetailsOnload[i].textContent == '') {
		initialDetailsOnload[i].remove();
	}
}

var tdDetailIndex = storyLineTable.querySelectorAll(`td[detailIndex]`);
var buildDetailsIndexArray = 0;

for (i = 0; i < tdDetailIndex.length; i++) {
	var zyx = tdDetailIndex[i].getAttribute('detailIndex');
	////////////////////////////////////////////////////
	//If it has no corresponding detail/note,///////////
	//then remove its detailIndex attribute/////////////
	//This detail index will not be added to the array//
	////////////////////////////////////////////////////
	if (!detailsSection.querySelector(`div[detailIndex="` + zyx + `"]`)) {
		tdDetailIndex[i].removeAttribute('detailIndex');
		//remove localShowDetailButton in table cell
		removeIndicatorShowingThatCellHasDetail (tdDetailIndex[i]);
	}
	//////////////////////////////////////////////////////
	//If, however, it has a corresponding detail/note,////
	//Then add its detail index to the detailsCountArray//
	//////////////////////////////////////////////////////
	//BUILD DETAILSCOUNT ARRAY//
	////////////////////////////
	else {
		detailsCountArray.push(Number(tdDetailIndex[i].getAttribute('detailIndex')));
		detailsCountArray.sort();
	}
}
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//ADD DETAIL KEY ON SELECTION OF ANY CELL
function addDetailKeys() {

	var previouslyShownDetail;
	var prevDetailIndex;

	if (document.querySelector('.showDetail')) {
		previouslyShownDetail = document.querySelector('.showDetail'); //don't make it a live nodelist
		prevDetailIndex = Number(previouslyShownDetail.getAttribute('detailIndex'));
		previouslyClickedCell = document.querySelector(`td[detailIndex="` + prevDetailIndex + `"]`);
	}

	var detailsActors = document.getElementById('detailsActors');
	var detailsRegions = document.getElementById('detailsRegions');
	//var cellParentName = storyLineTable.rows[clickedRow].parentNode.nodeName;
	var divsInCellLength = selectedCell.querySelectorAll('div[divclassname]').length;
	var cellH4;
	if (selectedCell.querySelector('h4')) {
		cellH4 = selectedCell.querySelector('h4').textContent
	}

	////////////////////////////////////////////////////////////////
	//IF SELCETED CELL HAS CONTENT E.G., DIV, HEADING, LOCATION...//
	//if selected cell has label divs or it has a heading, i.e., it cannot be empty
	////////////////////////////////////////////////////////////////
	if ((selectedCell.querySelector('div[divclassname]')) || ((selectedCell.querySelector('h4')) && (selectedCell.querySelector('h4').textContent != ''))) {

		/////////////////////////////////////////////////
		///*TO GET ACTORS/CHARACTERS IN SELECTED CELL*///
		/////////////////////////////////////////////////
		var actorsInSelectedCell = selectedCell.querySelectorAll('div[divclassname]');

		//remove <li>s in detailsActors <ul> to populate it with new names
		removeAllChildNodesOf(detailsActors);

		if (actorsInSelectedCell.length != 0) {
			for (i = 0; i < actorsInSelectedCell.length; i++) {
				var actorClassName = actorsInSelectedCell[i].getAttribute('divclassname');
				var actorPresentAlias;
				var cellDetail_LI = document.createElement('LI');
				cellDetail_LI.innerHTML = actorClassName;
				detailsActors.appendChild(cellDetail_LI)
			}
		} else {
			var cellDetail_LI = document.createElement('LI');
			cellDetail_LI.innerHTML = `<em>No Actor indicated</em>`;
			detailsActors.appendChild(cellDetail_LI)
		}

		/////////////////////////////////////////////
		//*TO GET LOCATION/REGION OF SELECTED CELL*//
		/////////////////////////////////////////////
		var location = selectedCell.getAttribute('location') || ''; //the selectedCell may or may not have the location attribute
		var spanLocationName;
		if (selectedCell.querySelector('span.locationspan')) {
			spanLocationName = selectedCell.querySelector('span.locationspan').innerHTML;
		}
		var cellLocation_LI = document.createElement('LI');
		cellLocation_LI.innerHTML = spanLocationName;
		removeAllChildNodesOf(detailsRegions);
		//if it has location attribute, then the <li> will be appended 
		if (location != '') {
			detailsRegions.appendChild(cellLocation_LI);
		} else {
			cellLocation_LI.innerHTML = `<em>Location not indicated</em>`;
			detailsRegions.appendChild(cellLocation_LI);
		}


		/////////////////////////////////////////
		//*TO GET TIME PERIOD OF SELECTED CELL*//
		/////////////////////////////////////////
		var detailsTimePeriods = document.getElementById('detailsTimePeriods');

		removeAllChildNodesOf(detailsTimePeriods);
		//first get the col-x class

		/*FUNCTION TO GET COL-X CLASS OF SELECTED CELL*/
		//to be used to get its time from the corresponding col-x class in the thead
		//the thead was used for time periods
		var col_xClass;
		var nodeClassList = selectedCell.classList;
		for (i = 0; i < nodeClassList.length; i++) {
			if (nodeClassList[i].slice(0, 4) == 'col-') {
				col_xClass = nodeClassList[i];
				col_xClass = "." + col_xClass;
			}
		}

		//////////////////////////////////////////////////////
		//GET TIME-SECTION WITH SELECTED-CELLS COL-X//////////
		//get the selected cells time from its corresponding col-x class in the thead
		//////////////////////////////////////////////////////
		var storyLineTableTHead = storyLineTable.querySelector('thead');
		var timeRegion = storyLineTableTHead.querySelectorAll(col_xClass);
		for (i = 0; i < timeRegion.length; i++) {
			if ((timeRegion[i].querySelector(TypeOfHtmlHeader) !== null) && (timeRegion[i].querySelector(TypeOfHtmlHeader).innerHTML !== '')) {
				var timeName = timeRegion[i].querySelector(TypeOfHtmlHeader).innerHTML;
				var cellTime_LI = document.createElement('LI');
				cellTime_LI.innerHTML = timeName;
				detailsTimePeriods.appendChild(cellTime_LI);
			}
		}

		////////////////////////////////////////////
		//FUNCTION TO SHOW DETAIL OF SELECTED CELL//
		////////////////////////////////////////////

		//if selectedCell does not have details

		//////////////////////////////////////////////////////
		//IF THE SELECTED CELL HAS NO DETAIL-INDEX////////////
		//////////////////////////////////////////////////////

		if (selectedCell.getAttribute('detailIndex') == null) {

			/////////////////////////////////////////
			//*HIDE PREVIOUSLY SHOWN DETAIL IF ANY*//
			/////////////////////////////////////////
			if (document.querySelector('.showDetail')) {
				//////////////////////////////////////////////////
				//IF PREVIOUSLY SHOWN DETAIL IS EMPTY, REMOVE IT//
				//////////////////////////////////////////////////
				if (document.querySelector('.showDetail').textContent == '') {

					/*previouslyShownDetail = document.querySelector('.showDetail');
					var prevDetailIndex = Number(previouslyShownDetail.getAttribute('detailIndex'));
					previouslyClickedCell = document.querySelector(`td[detailIndex="` + prevDetailIndex + `"]`);*/
					removeIndicatorShowingThatCellHasDetail (previouslyClickedCell);
					previouslyClickedCell.removeAttribute('detailIndex');

					//to remove formatting from cell whose detail was previoiusly showing
					if (previouslyClickedCell.classList.contains('showingDetail')) {
						previouslyClickedCell.classList.remove('showingDetail');
					}

					previouslyShownDetail.remove(prevDetailIndex);

					//to remove formatting from cell whose detail was previoiusly showing
					//					if(previousDetailedCell.classList.contains('showingDetail')){previouslyClickedCell.classList.remove('showingDetail');}
					//////////////////////////////////////////////
					//REMOVE DETAIL INDEX FROM DETAILCOUNT-ARRAY//
					//////////////////////////////////////////////
					var indexOfDetailCount2remove = detailsCountArray.indexOf(prevDetailIndex);
					detailsCountArray.splice(indexOfDetailCount2remove, 1);

				} else {
					//					previouslyShownDetail = document.querySelector('.showDetail');
					previouslyShownDetail.classList.add('hideDetail');
					previouslyShownDetail.classList.remove('showDetail');
					previouslyShownDetail.contentEditable = 'false';

					//to remove formatting from cell whose detail was previoiusly showing
					if (previouslyClickedCell.classList.contains('showingDetail')) {
						previouslyClickedCell.classList.remove('showingDetail');
					}
				}
			}
			/////////////////////////////////////////////////
			//GET VALUE FOR DETAILSCOUNT/////////////////////
			/////////////////////////////////////////////////
			if (getMissingNumber(detailsCountArray).length != 0) {
				detailsCount = getMissingNumber(detailsCountArray)[0];
				getMissingNumber(detailsCountArray).splice(0, 1);
			} else {
				if (detailsCountArray.length != 0) {
					detailsCount = Math.max(...detailsCountArray) + 1;
				} else {
					detailsCount = 1;
				}
				detailsCountArray.push(detailsCount);
			}
			/////////////////////////////////////////////////
			//CREATE DETAILS & SET DETAILS-INDEX ATTRIBUTE///
			/////////////////////////////////////////////////
			var cellDetail_p = document.createElement('P');
			var cellDetail = document.createElement('DIV');
			cellDetail.classList.add('showDetail');
			cellDetail.id = 'detail_' + detailsCount;
			cellDetail.setAttribute('detailIndex', detailsCount);
			cellDetail.appendChild(cellDetail_p);
			cellDetail.contentEditable = 'true';
			detailsSummary.appendChild(cellDetail);

			//assign the same detail Index to the selected cell to which the detail belongs;
			selectedCell.setAttribute('detailIndex', detailsCount);
			addIndicatorShowingThatCellHasDetail (selectedCell);
			//			previouslyClickedCell = selectedCell;

			selectedCell.classList.add('showingDetail');
		}

		////////////////////////////////////////////////////////
		//ELSE IF THE SELECTED CELL ALREADY HAS A DETAIL-INDEX//
		////////////////////////////////////////////////////////
		else if (selectedCell.getAttribute('detailIndex') != null) {

			x = selectedCell.getAttribute('detailIndex');
			var detailToShow = detailsSection.querySelector(`div[detailIndex="` + x + `"]`); //find the corresponding detail/note (it will carry the same detailIndex attribute value)
			var previousDetailedCell = storyLineTable.querySelector(`td[detailIndex="` + x + `"]`);

			///////////////////////////////////////////////
			//find previously selected detail and hide it//
			///////////////////////////////////////////////

			///////////////////////////////////////////////////////////////
			//IN CASE THERE IS NO DETAIL WITH DETAIL OF CLASS SHOWDETAIL,//
			//BUT CLICKED CELL HAS A CORRESPONDING DETAILS THAT HAS////////
			//HIDEDETAIL CLASS ASSIGNED TO IT//////////////////////////////
			///////////////////////////////////////////////////////////////
			if ((previouslyShownDetail == null) && (detailToShow) && (detailToShow.classList.contains('hideDetail'))) {
				detailToShow.classList.remove('hideDetail');
				detailToShow.classList.add('showDetail');
			}
			if ((previouslyShownDetail) && (previouslyShownDetail.getAttribute('detailIndex') != x)) {

				previouslyShownDetail.contentEditable = 'false';
				///////////////////////////////////////////////////
				//REMOVE PREVIOUSLY SHOWN DETAIL IF IT IS EMPTY////
				//AND ITS CORRESPONDING ATTRIBUTE FROM THE RESPECTIVE<TD>
				///////////////////////////////////////////////////
				if (previouslyShownDetail.textContent == '') {
					var prevDetailIndex = Number(previouslyShownDetail.getAttribute('detailIndex'));
					previouslyClickedCell = document.querySelector(`td[detailIndex="` + prevDetailIndex + `"]`);
					removeIndicatorShowingThatCellHasDetail (previouslyClickedCell);
					previouslyClickedCell.removeAttribute('detailIndex');
					previouslyShownDetail.remove();
					///////////////////////////
					//Remove index from array//
					///////////////////////////
					var indexOfDetailCount2remove = detailsCountArray.indexOf(prevDetailIndex);
					detailsCountArray.splice(indexOfDetailCount2remove, 1);
				}
				previouslyShownDetail.classList.add('hideDetail');
				previouslyShownDetail.classList.remove('showDetail');

				detailToShow = detailsSection.querySelector(`div[detailIndex="` + x + `"]`); //find the corresponding detail/note (it will carry the same detailIndex attribute value)
				detailToShow.classList.remove('hideDetail');
				detailToShow.classList.add('showDetail');

				//to remove formatting from cell whose detail was previoiusly showing
				if (previouslyClickedCell.classList.contains('showingDetail')) {
					previouslyClickedCell.classList.remove('showingDetail');
				}

				//add formatting to selected cell to indicate its detail is the one currently showing
				selectedCell.classList.add('showingDetail');
			}
		}
	} else if (previouslyShownDetail) {
		previouslyShownDetail.contentEditable = 'false';
	}
}

///////////////////////////////////////////
//MAKE DETAILS TEXT-EDITOR BUTTONS VISIBLE/
///////////////////////////////////////////
editMode.style.display = 'none'; //to hide 'Show HTML'
function detailsEditButtons() {
	var toolBar1_Buttons = document.querySelectorAll('#wysiwygEditor > div > *');

	if (document.querySelector('.showDetail')) {
		if (toolBar1_Buttons[0].style.display == 'none') {
			//			function showWYSIWYGbtns() {
			//				wysiwygEditor_Buttons[i - 1].style.display = ''
			//			}
			toolBar1_Buttons.forEach(function (btn) {
				btn.style.display = 'none';
			})
			wysiwygEditor.style.display = "";
			for (let i = 1; i <= toolBar1_Buttons.length; i++) {
				setTimeout(() => [toolBar1_Buttons[i - 1].style.display = ''], 5 * i);
			}
			editMode.style.display = ''; //to show 'Show HTML'
		} else {
			for (let i = 1; i <= toolBar1_Buttons.length; i++) {
				setTimeout(() => [toolBar1_Buttons[i - 1].style.display = 'none'], 5 * i);
			}
			editMode.style.display = 'none'; //to hide 'Show HTML'
		}
	} else {
		customAlert('There is no EVENT to make notes for!')
	}
	//////////////////////////////////////////
	//////////////////////////////////////////
}

function makeCurrentDetailEditable() {
	if (document.querySelector('.showDetail')) {
		document.querySelector('.showDetail').contentEditable = 'true';
	} else {
		customAlert('There is No Note To Edit.')
	}
}

function toglesummary() {
	if (detailsKeyFacts.style.display == 'none') {
		detailsKeyFacts.style.display = '';
	} else {
		detailsKeyFacts.style.display = 'none';
	}
}

///////////////////////////////////////////
//TOGGLE DETIALS SECTION///////////////////
///////////////////////////////////////////
var toggleDetailsCheckbox = document.getElementById('detailsRadio');

function toggleDetailsSection() {

	if (toggleDetailsCheckbox.checked == true) {
		toggleDetailsCheckbox.checked = false;
	} else {
		toggleDetailsCheckbox.checked = true;
	}

	if (toggleDetailsCheckbox.checked == true) {
		detailsSection.style.display = '';
	} else {
		detailsSection.style.display = 'none';
	}
}

//var detailsCount = 0;

//////////////////////////////
//FOR ADD/EDIT DETAIL BUTTON//
//////////////////////////////
//to make details editable
function addDetail() {

	if ((selectedCell) && (selectedCell.innerHTML)) {

		if ((selectedCell.querySelectorAll('div[divclassname]').length != 0) || (selectedCell.querySelector('h4').textContent != '')) {

			/*FUNCTION TO CREATE DETAIlS*/
			if (selectedCell.getAttribute('detailIndex') == null) {

				var detailsSummary = document.getElementById('detailsSummary');

				var cellDetail_p = document.createElement('P');
				//				cellDetail_p.innerHTML = 'Insert details for selected cell here';

				var cellDetail = document.createElement('DIV');
				cellDetail.classList.add('showDetail');
				cellDetail.id = 'detail_' + detailsCount;
				cellDetail.setAttribute('detailIndex', detailsCount);
				cellDetail.appendChild(cellDetail_p);
				cellDetail.contentEditable = 'true';
				detailsSummary.appendChild(cellDetail);
				``
				//assign the same detail Index to the selected cell to which the detail belongs;
				selectedCell.setAttribute('detailIndex', detailsCount);
				addIndicatorShowingThatCellHasDetail (selectedCell);

			} else if (selectedCell.getAttribute('detailIndex') != null) {
				var x = selectedCell.getAttribute('detailIndex');

				var detailToShow = detailsSection.querySelector(`div[detailIndex="` + x + `"]`);
				detailToShow.classList.remove('hideDetail');
				detailToShow.classList.add('showDetail');
				detailToShow.contentEditable = 'true';
			}

		} else {
			alert('Selected Cell has no actor')
		}
	} else {
		customAlert('Please, select a cell to add or view its details.')
	}
}


///////////////////////////////////////////////
//Create localShowDetailButton in table cell///
///////////////////////////////////////////////
var cellWithDetailIndex = storyLineTable.querySelectorAll("td[detailindex]");

for (i = 0; i < cellWithDetailIndex.length; i++) {
	addIndicatorShowingThatCellHasDetail (cellWithDetailIndex[i]);
}
///////////////////////////////////////////////
///////////////////////////////////////////////
