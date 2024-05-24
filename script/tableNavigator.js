//Instead of showing a whole table, this table displays only
//1. the header of the table (first row),
//2. the first column and
//3. one other column and one other row at a time
//4. the column and row shown depend on the arrow or swiping of the table.


var comparisonTables = (document.querySelectorAll('.comparisonTable') || (document.querySelectorAll('table')));

var xxxx;

function moveInTable(direction) {
	xxxx = direction;
}

comparisonTables.forEach(function (table2Compare) {

	//for navigation by arrow buttons
	document.addEventListener('click', function (){
	if (xxxx == 'right') {
		moveRight();
	}
	if (xxxx == 'left') {
		moveLeft();
	}
	if (xxxx == 'down') {
		moveDown();
	}
	if (xxxx == 'up') {
		moveUp();
	}
});
	//for navigation by arrow keys on keyboard
	document.addEventListener('keydown', getKeyAndMove);

	function getKeyAndMove(e) {
		var key_code = e.which || e.keyCode;
		switch (key_code) {
			case e.shiftKey && 37: //left arrow key
				moveLeft();
				break;
			case e.shiftKey && 38: //Up arrow key
				moveUp();
				break;
			case e.shiftKey && 39: //right arrow key
				moveRight();
				break;
			case e.shiftKey && 40: //down arrow key
				moveDown();
				break;
		}
	}

	//for navigation by swiping
	swipedetect(table2Compare, function (swipedir) {
		//    swipedir contains either "none", "left", "right", "up", or "down"
		if (swipedir == 'right') {
			moveLeft();
		}
		if (swipedir == 'left') {
			moveRight();
		}
		if (swipedir == 'down') {
			moveUp();
		}
		if (swipedir == 'up') {
			moveDown();
		}
	})

	//GENERATE COL-X CLASSES
	generateColumnClasses(table2Compare);

	/*Left to Right*/

	//show first column
	var col2Show = table2Compare.querySelectorAll('.col-1');
	for (i = 0; i < col2Show.length; i++) {
		col2Show[i].classList.add('showCell')
	}
	var col2Show = table2Compare.querySelectorAll('.col-2');
	for (i = 0; i < col2Show.length; i++) {
		col2Show[i].classList.add('showCell')
	}

	var cln = 2;
	var CLN;

	function moveLeft() {
		CLN = parseInt(cln) - 1;
		//if the preceding column exists
		if (cln != 2) {
			//hide present column
			var col2Hide = table2Compare.querySelectorAll('.col-' + cln);
			for (i = 0; i < col2Hide.length; i++) {
				col2Hide[i].classList.remove('showCell')
			}

			//show next column
			cln = CLN;
			var col2Show = table2Compare.querySelectorAll('.col-' + cln);
			for (i = 0; i < col2Show.length; i++) {
				col2Show[i].classList.add('showCell')
			}
		}
	}

	function moveRight() {
		CLN = parseInt(cln) + 1;
		//if the next column exists
		if (table2Compare.querySelector('.col-' + CLN)) {
			//hide present column
			var col2Hide = table2Compare.querySelectorAll('.col-' + cln);
			for (i = 0; i < col2Hide.length; i++) {
				col2Hide[i].classList.remove('showCell')
			}

			//show next column
			cln = CLN;
			var col2Show = table2Compare.querySelectorAll('.col-' + cln);
			for (i = 0; i < col2Show.length; i++) {
				col2Show[i].classList.add('showCell')
			}
		}
	}

	/****Up & Down****/

	//show first & second rows
	var row2Show = table2Compare.rows;
	row2Show[0].classList.add('showRow');
	row2Show[1].classList.add('showRow');

	var rln = 1;
	var RLN;

	function moveUp() {
		RLN = parseInt(rln) - 1;
		//if the preceding row exists
		if (rln != 1) {
			//hide present row
			row2Show[rln].classList.remove('showRow');

			//show next row
			rln = RLN;
			row2Show[rln].classList.add('showRow');
		}
	}

	function moveDown() {
		RLN = parseInt(rln) + 1;
		//if the preceding row exists
		if (row2Show[RLN]) {
			//hide present row
			row2Show[rln].classList.remove('showRow');

			//show next row
			rln = RLN;
			row2Show[rln].classList.add('showRow');
		}
	}

})



/*INSERT STYLE TAG FOR CHANGING TABLE*/
function addStyle(styles) {

	/* Create style document */
	var css = document.createElement('style');
	css.type = 'text/css';
	css.id = "mq768";

	if (css.styleSheet) {
		css.styleSheet.cssText = styles;
	} else {
		css.appendChild(document.createTextNode(styles));
	}

	/* Append style to the tag name */
	document.getElementsByTagName("head")[0].appendChild(css);
}

/* Set the style */
var styles = `
        /*@media (max-width: 768px) {*/

			table.comparisonTable td {
				height: 50%;
			}

			table.comparisonTable td:first-child,
			table.comparisonTable th:first-child {
				width: 1px;
			}

			table.comparisonTable td:not(.showCell),
            table.comparisonTable th:not(.showCell) {
				display: none;
			}

			table.comparisonTable tr:not(.showRow) {
				display: none;
			}
			
			#compTableBtn {
				display: none;
			}
		/*}*/`;

var stylesOnBtn = `
        /*@media (max-width: 768px) {*/

			table.comparisonTable td:first-child,
			table.comparisonTable th:first-child {
				width: 1px;
			}
			table.comparisonTable td:not(.showCell),
            table.comparisonTable th:not(.showCell) {
				display: none;
			}

			table.comparisonTable tr:not(.showRow) {
				display: none;
			}
		/*}*/`;

/* Function call */
//Change table style on button press
//mq768 i.e., (mediaQuery = "768px")
function addStyleOnBtn() {
	if (document.getElementById('mq768')) {
		mq768.remove()
	} else {
		addStyle(stylesOnBtn)
	}
}

//Change table style depending on whether the media query matches 768px or not
function tableShowLess(x) {
	if (x.matches) { // If media query matches
		if (document.getElementById('mq768')) {
			mq768.remove()
		};
		addStyle(styles)
	} else {
		if (document.getElementById('mq768')) {
			mq768.remove()
		}
	}
}

var x = window.matchMedia("(max-width: 768px)")
tableShowLess(x) // Call listener function at run time
x.addListener(tableShowLess) // Attach listener function on state changes
