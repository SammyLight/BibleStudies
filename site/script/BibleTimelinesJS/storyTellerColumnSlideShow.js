/*THIS SCRIPT SHOWS THE EVENTS OF THE TABLE ONE AFTER ANOTHER AS SOME SORT OF SLIDE SHOW*/

function closeSlideShow() {
	if (showSlideShowArranger.checked == true) {
		showSlideShowArranger.checked = false;
		slideShowListMaster.style.display = 'none';
	} else if (showSlideShowArranger.checked == false) {
		showSlideShowArranger.checked = true;
		slideShowListMaster.style.display = '';
	}
}

var timeMenuLIs = timeMenuListDiv.getElementsByTagName('li');
var timeMenuLIInputs;
var timeMenuLILabels;

function buildTimeMenuSelectors() {
	timeMenuLIInputs = timeMenuListDiv.querySelectorAll('li > input');
	timeMenuLILabels = timeMenuListDiv.querySelectorAll('li > label');
	
	slideShowListContainer.innerHTML = '';
	var numberOfEvents = timeMenuLIs.length;

	var timeMenuOL = timeMenuListDiv.querySelectorAll('ol');
	for (i = 0; i < timeMenuOL.length; i++) {
		slideShowListContainer.appendChild(timeMenuOL[i].cloneNode(true));
	}
	var newLIs = slideShowListContainer.querySelectorAll('li');
	for (i = 0; i < newLIs.length; i++) {
		var timeMenuSelect = document.createElement('SELECT');

		for (j = 0; j < (timeMenuLIs.length + 1); j++) {
			var timeMenuSelectOption = document.createElement('OPTION');
			var k = j;
			if (j == 0) {
				k = '-'
			};
			timeMenuSelectOption.value = j;
			timeMenuSelectOption.innerHTML = k;
			timeMenuSelect.appendChild(timeMenuSelectOption);
		}

		newLIs[i].removeChild(newLIs[i].querySelector('input'));
		newLIs[i].appendChild(timeMenuSelect);
	}

}

buildTimeMenuSelectors();

function columnSlideMenu() {}

var slideMenuArray = [];
var slideMenuArraySource = slideShowListContainer.getElementsByTagName('select');

function slideMenuArrayGenerator() {
	slideMenuArray = [];
	for (i = 0; i < slideMenuArraySource.length; i++) {
		var indexOfSelected = slideMenuArraySource[i].selectedIndex;
		if (indexOfSelected != 0) {
			if (slideMenuArray.indexOf(indexOfSelected) == -1) {
				slideMenuArray.push(indexOfSelected);
			}
		}
	}
	slideMenuArray.sort((a, b) => a - b); //SORT THE ARRAY IN ASCENDING ORDER
}

var currentSlideMenuArrayIndex = 0;
var clickedIndex = 0;

function nextEventShow() {

	if (currentSlideMenuArrayIndex == 0) {
		slideMenuArrayGenerator();
	}

	if (slideMenuArray != []) {
		for (v = 0; v < slideMenuArraySource.length; v++) {
			if (slideMenuArraySource[v].selectedIndex == slideMenuArray[currentSlideMenuArrayIndex]) {
				timeMenuLIInputs[v].parentElement.querySelector('label').click();
			}
		}
		if (currentSlideMenuArrayIndex != slideMenuArray.length) {
			currentSlideMenuArrayIndex = currentSlideMenuArrayIndex + 1;
		} else {
			currentSlideMenuArrayIndex = 0;
		}
	}
}

function resetEventShow() {
	currentSlideMenuArrayIndex = 0;
	uncheckAllBoxes('.timeLINameCheckBox');
}

function prevEventShow() {
	if (currentSlideMenuArrayIndex > 0) {
		currentSlideMenuArrayIndex = currentSlideMenuArrayIndex - 1;
	}
	if (currentSlideMenuArrayIndex == 0) {
		currentSlideMenuArrayIndex = slideMenuArray.length;
		slideMenuArrayGenerator();
	}
	if (currentSlideMenuArrayIndex < 0) {
		currentSlideMenuArrayIndex = currentSlideMenuArrayIndex - 1;
	}
	for (v = 0; v < slideMenuArraySource.length; v++) {
		if (slideMenuArraySource[v].selectedIndex == slideMenuArray[currentSlideMenuArrayIndex]) {
			timeMenuLIInputs[v].parentElement.querySelector('label').click();
		}
	}
}

document.onkeydown = checkKey;

function checkKey(e) {

	e = e || window.event;

	if (e.keyCode == '38') {
		// up arrow
	} else if (e.keyCode == '40') {
		// down arrow
	} else if ((e.keyCode == '37') && (document.querySelector('#nextEventUseKeyboard').checked == true)) {
		prevEventShow();
		// left arrow
	} else if ((e.keyCode == '39') && (document.querySelector('#nextEventUseKeyboard').checked == true)) {
		nextEventShow();
		// right arrow
	}
}