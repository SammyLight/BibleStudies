var youMayDropIt;

var currentDraggedItem = null;


function dragDiv2TD() {
	/*FOR DIVS TO BE DRAGGED********************************/
	var div_items = document.querySelectorAll('.draggableDiv');
	var tdDragEnd = document.querySelectorAll('#storyLineTable td');
	var isDivAClone;


	function dStart(e) {
		connectAllDraggableDivsWithSVGLines();
		if (e.ctrlKey) {
			currentDraggedItem = this.cloneNode(true);
			currentDraggedItem.classList.remove('dragEventListnerAdded');
			isDivAClone = 1;
//			console.log(isDivAClone)
		} else {
			currentDraggedItem = this;
			currentDraggedItem.classList.add('dragEventListnerAdded');
			isDivAClone = 0;
//			console.log(isDivAClone);
		}
		youMayDropIt = 1;
		setTimeout(function () {
			//					currentDraggedItem.style.display = 'none';
		}, 0)
	}

	function dEnd() {
		connectAllDraggableDivsWithSVGLines();
		currentDraggedItem.style.display = '';
		setTimeout(function () {
			currentDraggedItem = null;
		}, 20);
		
		//TO UPDATE THE OPTCOUNTERS OF THE DIV NAME AND DIV CLASS OPTIONS AND ARRAYS
		if (isDivAClone == 1) {
			dragDiv2TD();
			//GET NAME (INNER HTML) OF CLONED DIV
			var divName = currentDraggedItem.innerHTML;


			//find the option that has this name as its text and increase its optCounter value
			var divNameOptions = divNameOptionsDropdown.getElementsByTagName('option');

			for (k = 0; k < divNameOptions.length; k++) {
				if (divNameOptions[k].text == divName) {
					var optCounterValue = Number(divNameOptions[k].getAttribute('optCounter'));
					divNameOptions[k].setAttribute('optCounter', ++optCounterValue);

					//INCREASE OPTIONS COUNT OF CLASS TO WHICH THE DRAGGED/CLONED DIV BELONGS
					var optionsClassNameOfDivToBeDeleted = divNameOptions[k].getAttribute('optClassName');

					//find the class in the classOptionsDropdown and increase its optCounter value
					var divClassOptions = divClassOptionsDropdown.getElementsByTagName('option');

					for (l = 0; l < divClassOptions.length; l++) {
						if (divClassOptions[l].text == optionsClassNameOfDivToBeDeleted) {
							var optCounterValue = Number(divClassOptions[l].getAttribute('optCounter'))
							divClassOptions[l].setAttribute('optCounter', ++optCounterValue);
						}
					}
					break;
				}
			}
		}

	}

	//FOR THE DRAGGD DIV
	for (let i = 0; i < div_items.length; i++) {
		if (!div_items[i].classList.contains('dragEventListnerAdded')) {
			div_items[i].addEventListener('dragstart', dStart);
			div_items[i].addEventListener('dragend', dEnd)
		}
		div_items[i].classList.add('dragEventListnerAdded');
	}

	/*FOR THE DESTINATION <TD>s, I.E, WHERE THE DIVS WILL BE DRAGGED TO*********************************************/

	for (let j = 0; j < tdDragEnd.length; j++) {
		//if(it has [dragover, dragenter, dragleave & drop] eventlisteners){don't add any of these event listeners}
		if (!tdDragEnd[j].classList.contains('dragOverELAdded')) {
			tdDragEnd[j].addEventListener('dragover', function (e) {
				if (youMayDropIt) {
					e.preventDefault();
					if (e.ctrlKey) {
						e.dataTransfer.dropEffect = "copy";
					}
				};
			});

			tdDragEnd[j].addEventListener('dragenter', function (e) {
				if (youMayDropIt) {
					e.preventDefault();
					this.style.backgroundColor = 'rgb(211, 211, 211)';
				};
			});

			tdDragEnd[j].addEventListener('dragleave', function (e) {
				if (youMayDropIt) {
					e.preventDefault();
					this.style.backgroundColor = '';
				};
			});

			tdDragEnd[j].addEventListener('drop', function (e) {

				this.style.backgroundColor = '';
				if (currentDraggedItem) {
					this.append(currentDraggedItem);
				}

				youMayDropIt = null;

			});

		}

		tdDragEnd[j].classList.add('dragOverELAdded');

	}
	divListeners();
	buildLegendTable();
}