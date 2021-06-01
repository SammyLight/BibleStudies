//SVG PATH
function nodesconnector(pathXYcord, divClassLineConnects) {

	var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	document.getElementById("svg").appendChild(path1);

	//	path1.setAttributeNS(null, pathXYcord);
	path1.setAttributeNS(null, "d", pathXYcord);
	//	path1.setAttributeNS(null, "stroke", "pink");
	path1.setAttributeNS(null, "stroke-width", 19);
	path1.setAttributeNS(null, "opacity", 0.75);
	path1.setAttributeNS(null, "fill", "none");
	path1.classList.add("svg-connectors");
	path1.classList.add(divClassLineConnects);
}

// CREATE SVG CONNECTOR PATHS
//var startElement = document.querySelector("#a");
//var endElement = document.querySelector("#b");
// var connector = document.querySelector("#connector");

//SVG PATH
function drawConnector(X, Y, divClassforColor) {

	var svgMasterTop = svgMaster.getBoundingClientRect().top;
	var svgMasterLeft = svgMaster.getBoundingClientRect().left;
	var pageScrollX = documentHTML.scrollLeft;
	var pageScrollY = documentHTML.scrollTop;

	var A = getCoordinates(X);
	var B = getCoordinates(Y);
	var posnA = {
		x: A.rightCenterX - svgMasterLeft - pageScrollX,
		y: A.rightCenterY - svgMasterTop - pageScrollY
	};
	var posnB = {
		x: B.leftCenterX - svgMasterLeft - pageScrollX,
		y: B.leftCenterY - svgMasterTop - pageScrollY
	};
	
	var distanceBtwPoints = Math.abs(posnB.x - posnA.x);
	var lengthB4Curve;
	if(distanceBtwPoints < 100 ){
	   lengthB4Curve = distanceBtwPoints;
	   }
	else{
		lengthB4Curve = 100;
	}
	
	var dStr =
		"M" +
		(posnA.x) + "," + (posnA.y) + " " +
		"C" +
		(posnA.x + lengthB4Curve) + "," + (posnA.y) + " " +
		(posnB.x - lengthB4Curve) + "," + (posnB.y) + " " +
		(posnB.x) + "," + (posnB.y);
	//	connector.setAttribute("d", dStr);
	nodesconnector(("M" +
		(posnA.x) + "," + (posnA.y) + " " +
		"C" +
		(posnA.x + lengthB4Curve) + "," + (posnA.y) + " " +
		(posnB.x - lengthB4Curve) + "," + (posnB.y) + " " +
		(posnB.x) + "," + (posnB.y)), 'opt_' + divClassforColor);
}

//drawConnector(startElement, endElement);
//use the divClassAttributeArray to link all divs of the same className
var generateCustomSVGConnectorsType1 = function () {
	//before redrawing svg-connectors, the old ones have to be removed or else there will be duplicates. So
	//Check if there are svg-connectors. If there are, remove them
	if (document.querySelector('.svg-connectors')) {
		var allLeaderLines = document.querySelectorAll('.svg-connectors');
		// Remove all existing lines.
		for (k = 0; k < allLeaderLines.length; k++) {
			allLeaderLines[k].remove();
		}
	}
	
	if(connectOnlyConnect2andConnect4rm == 0){
		
	var startElement, endElement;
	/*THIS SEARCHES FOR ALL MEMBERS OF A divClassName ATTRIBUTE IN EACH COL-CLASS COULUMN*/
	if (storyLineTable.querySelector('div[divclassname]')) {
		/*****************************************************************************************/
		/*****************************************************************************************/
		/*****************************************************************************************/
		var arrayOfAllColx = [];
		var rowNameDivzPerColXArray = [];
		var allRows = storyLineTable.rows;

		//get the higest col-x of ROW
		//(this is to know how many columns/cells it would be without colspan)
		var maxColX;
		var highestCol;
		for (b = 0; b < allRows.length; b++) {
			var rOCRNlength = allRows.length;
			var realNumOfCol = 0;
			var cellzColSpan = 0;
			var cellsOfRow = allRows[b].cells;
			for (c = 0; c < cellsOfRow.length; c++) {
				cellzColSpan = cellzColSpan + cellsOfRow[c].colSpan;
				realNumOfCol = cellzColSpan;
			}
			if (highestCol == undefined) {
				highestCol = 0
			}
			if (realNumOfCol > highestCol) {
				highestCol = realNumOfCol;
				maxColX = 'col-' + highestCol;
			}
		}
		//build array of divs in each col-x of rowName
		//i am going for an array in an array
		var arrayOfDivzInRowColX = [];
		////////////////////////////////////////////////////////////
		//THIS IS GOING TO PROCESS ONE ROWNAME AT A TIME
		////////////////////////////////////////////////////////////
		//all the col-x in rowName
		//b = 1, i.e., to make it start from the second column
		for (b = 0; b < highestCol; b++) {

			var X = b + 1;
			//var colxOfCurrentRow = storyLineTable.querySelectorAll('.col-' + X);
			//all the divs in col-1, all the divs in col-2, all the divs in col-3, all the divs in...

			var divzInRowColX = storyLineTable.querySelectorAll('.col-' + X + ' [divclassname]');

			if (divzInRowColX != []) {
				for (c = 0; c < divzInRowColX.length; c++) {
					var endDiv = divzInRowColX[c];
					var divzClassName = endDiv.getAttribute('divclassname');
					var endDivParent = endDiv.parentElement;
					var endDivParentRow = endDivParent.parentElement;
					var endDivRowName = endDivParentRow.getAttribute('rowname');
					////////////////////////////////////////////
					//get Array of endDivParents ColX classes///
					////////////////////////////////////////////
					//GENERATE ARRAY OF COL-X CLASSES
					var prefix = 'col-';
					var prefixLength = prefix.length;

					var endDivParentColXArray = [];
					var endDivParentClassList = endDivParent.classList;

					for (j = 0; j < endDivParentClassList.length; j++) {

						//GET THE COL-X CLASSES ONE AFTER ANOTHER BELONGING TO THE TARGETED TD
						if (endDivParentClassList[j].slice(0, prefixLength) == prefix) {
							endDivParentColXArray.push(endDivParentClassList[j]);
						}
					}
					var endPArray = endDivParentColXArray;
					var goAhead = 1;
					////////////////////////////////////////////////////
					//count the col-x's backwards to get the start div//
					////////////////////////////////////////////////////
					for (d = X - 1; d > 0; d--) {

						//find div with the same divclassname attribute as in the preceeding col-x
						var div2connect4rm;
						div2connect4rm = storyLineTable.querySelector(`.col-` + d + ` [divclassname="` + divzClassName + `"]`);
						if (connectAccording2RowNames == 1) {
							div2connect4rm = storyLineTable.querySelector(`[rowname="` + endDivRowName + `"] .col-` + d + ` [divclassname="` + divzClassName + `"]`)
						}
						var startDiv = div2connect4rm;
						if (startDiv != null) {
							var startDivParent = startDiv.parentElement;
							var startDivParentRow = startDivParent.parentElement;
							var startDivRowName = startDivParentRow.getAttribute('rowname');
							//////////////////////////////////////////////
							//get Array of startDivParents ColX classes///
							//////////////////////////////////////////////
							var startDivParentColXArray = [];
							var startDivParentClassList = startDivParent.classList;

							for (j = 0; j < startDivParentClassList.length; j++) {

								//GET THE COL-X CLASSES ONE AFTER ANOTHER BELONGING TO THE TARGETED TD
								if (startDivParentClassList[j].slice(0, prefixLength) == prefix) {
									startDivParentColXArray.push(startDivParentClassList[j]);
								}
							}

							var startPArray = startDivParentColXArray;
							/////////////////////////////////////////////////////
							//compare the two col-x arrays///////////////////////
							//this is to prevent divs in the same cell that//////
							//has a colspan > 1 from connecting with each other//
							/////////////////////////////////////////////////////
							for (j = 0; j < startPArray.length; j++) {
								if (endPArray.indexOf(startPArray[j]) != -1) {
									startDiv == null;
									goAhead = 0;
									break;
								}
							}
							/////////////////////////////////////////////////////
							/////////////////////////////////////////////////////

							if (connectAccording2RowNames == 0) {
								if ((goAhead) && (startDiv != null) && (startDivParent != endDivParent) && (startDivParent.style.display != 'none') && (endDivParent.style.display != 'none') && (startDivParentRow.style.display != 'none') && (endDivParentRow.style.display != 'none')) {

									//////////////////////////////////////////////////////////////////////////////
									//check to be sure that the endDiv is the first div of its class in its column
									//if not, move on to the next div
									//do this only if the connection is accross rowNames
									var endDivBrodasInColx = storyLineTable.querySelector(`.col-` + X + ` [divclassname="` + divzClassName + `"]`);
									if (endDiv != endDivBrodasInColx) {
										break;
									}
									//////////////////////////////////////////////////////////////////////////////

									drawConnector(startDiv, endDiv, divzClassName);
									startDiv = null;
									break;
								}
							} else if (connectAccording2RowNames == 1) {
								if ((goAhead) && (startDiv != null) && (startDivRowName == endDivRowName) && (startDivParent.style.display != 'none') && (endDivParent.style.display != 'none') && (startDivParentRow.style.display != 'none') && (endDivParentRow.style.display != 'none') && (startDivParent != endDivParent)) {

									//////////////////////////////////////////////////////////////////////////////
									//check to be sure that the endDiv is the first div of its class in its column
									//////////////////////////////////////////////////////////////////////////////
									//if not, move on to the next div
									//do this only if the connection is accross rowNames
									//////////////////////////////////////////////////////////////////////////////
									//if you remove this function, multiple 'endDiv's will connect to the first
									//preceding 'startDiv'
									//////////////////////////////////////////////////////////////////////////////
									var endDivBrodasInColx = storyLineTable.querySelector( `[rowname="` + startDivRowName + `"] .col-` + X + ` [divclassname="` + divzClassName + `"]`);
									if (endDiv != endDivBrodasInColx) {
										break;
									}
									//////////////////////////////////////////////////////////////////////////////

									drawConnector(startDiv, endDiv, divzClassName);
									endDiv = null;
									startDiv = null;
									break;
								}
							}
						}
					}
				}
			}
		}
	}
}}

//REDRAW THE LINES EVERYTIME THE WINDOW IS RESIZED
//window.addEventListener("resize", connectAllDraggableDivsWithSVGLines);
//window.addEventListener("wheel", connectAllDraggableDivsWithSVGLines);
//window.addEventListener("resize", drawConnector(startElement, endElement))
