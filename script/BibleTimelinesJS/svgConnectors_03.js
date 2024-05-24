//SVG PATH
function nodesconnector3(pathXYcord, divClassforColor) {

	var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	document.getElementById("svg").append(path1);

	//	path1.setAttributeNS(null, pathXYcord);
	path1.setAttributeNS(null, "d", pathXYcord);
	//		path1.setAttributeNS(null, "stroke", "black");
	path1.setAttributeNS(null, "stroke-width", 19);
//		path1.setAttributeNS(null, "stroke-dasharray", 5);
	//	path1.setAttributeNS(null, "stroke-dashoffset", 1);
	path1.setAttributeNS(null, "opacity", 0.75);
	path1.setAttributeNS(null, "fill", "none");
	path1.classList.add("svg-connectors3");
	path1.classList.add(divClassforColor);
}

function drawConnector3(X, Y, divClassforColor) {
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

//The following generates the special lines
function generateCustomSVGConnectorsType3() {
	//before redrawing svg-connectors, the old ones have to be removed or else there will be duplicates. So
	//Check if there are svg-connectors. If there are, remove them
	if (document.querySelector('.svg-connectors3')) {
		var allLeaderLines = document.querySelectorAll('.svg-connectors3');
		// Remove all existing lines.
		for (k = 0; k < allLeaderLines.length; k++) {
			allLeaderLines[k].remove();
		}
	}

	//Get all divs that are to have special connections
	//These have the connectTo attribute in common
	var allDivsWithConnectToAttr = document.querySelectorAll('[connectTo]');
	for (cTo = 0; cTo < allDivsWithConnectToAttr.length; cTo++) {
		var originatingDiv = allDivsWithConnectToAttr[cTo];
		var node1 = originatingDiv;
		var node2;

		var originatingDivzParent = originatingDiv.parentNode;
		var clickedDivOptClass = originatingDiv.getAttribute('divclassname');
		var divzConnectToValue = originatingDiv.getAttribute('connectTo');
		var divzConnectToArray = divzConnectToValue.split(', ');

		//GENERATE CONNECTION
		var succeedingCellIndex = originatingDivzParent.cellIndex + 1;
		for (k = 0; k < divzConnectToArray.length; k++) {
			//index to count forward To
			//we are looking for the closest succeeding connectTo class clickedCell + 1
			var connect2ThisClass = divzConnectToArray[k];
			//GET NUMBER OF COLUMNS IN TABLE
			var maxNumOfColumns;
			for(i=1; i < Infinity; i++){
				if (storyLineTable.querySelector('.col-' + i)){
					maxNumOfColumns = i;
				}else{
					break;
				}
			}
			////////////////////////////////
			for (i = succeedingCellIndex + 1; i < (maxNumOfColumns+1); i++) {
				// sc -> succeedingCell
				var scI = i;
				var scColX = 'col-' + scI;
				//all the cells in the defined col-X column
				var allscColX = storyLineTable.querySelectorAll('.' + scColX);
				
				for (j = 0; j < allscColX.length; j++) {
					//when you find a cell with the divClass,
					if (allscColX[j].querySelector('.opt_' + connect2ThisClass)) {
						//connect it and break the loop
						if (allscColX[j].style.display != 'none') {
							node2 = allscColX[j].querySelector('.opt_' + connect2ThisClass);
						}
						//however, don't connect it if its parent cell is hidden or
						//the div to connect from is hidden (there is not need to add this extra condition because the connector carries the same class as the div is connected from so when that class is hidden, it will be hidden along with it)
						
						if ((allscColX[j].style.display != 'none') && (node1.style.display != 'none') && (node1.parentElement.style.display != 'none') && (node1.parentElement.parentElement.style.display != 'none') && (node2.style.display != 'none') && (node2.parentElement.style.display != 'none') && (node2.parentElement.parentElement.style.display != 'none')) {
							//actual connect function
							drawConnector3(node1, node2, clickedDivOptClass);
						}

						node2 = null;
						//						j = allscColX.length;
						i = maxNumOfColumns;
						break;
					}
					//after finding the first connectable element of current connectTo class, 
					//break the loop and search for the next connectTo class to connect with
//					if ((i == maxNumOfColumns) && (j == allscColX.length - 1) && (node2 == null)) {
//						customAlert('This ACTOR does not exist AFTER this point to connect to.');
//						divClass2ConnectTo.value = '';
//					}
				}
				//reset node2
				node2 = null;
			}
		}


		divDeleteButton.style.backgroundColor = '';
		connectToButton.style.backgroundColor = '';
		clearTimeout(deletButtonColorTimeOut);

		//	deselectEmptyCell();
		//		buildLegendTable();
		//		connectAllDraggableDivsWithSVGLines();
	}
}