//YOU MUST HAVE AN SVG ELEMENT IN THE HTML BODY TO WHICH THE SVG PATHS WILL BE APPENDED.

//Below is the Code for the SVG Marker which is what produces the arrowHead
//This has to be reference in the styleSheet
if (!document.querySelector('#arrowHead')) {
	var svgMarkerColor; //This is set in the nodesConnector function
	//Marker Path
	var svgMarkerPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	svgMarkerPath.setAttributeNS(null, "d", 'M0,0 V3 L3,1.5 Z');
	svgMarkerPath.setAttributeNS(null, "fill", 'black');
	//Marker
	var svgMarker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
	svgMarker.id = 'arrowHead';
	svgMarker.setAttributeNS(null, "orient", 'auto');
	svgMarker.setAttributeNS(null, "markerWidth", '4');
	svgMarker.setAttributeNS(null, "markerHeight", '4');
	svgMarker.setAttributeNS(null, "refX", '0.1');
	svgMarker.setAttributeNS(null, "refY", '1.5');
	//Defs
	var svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
	//appending defs to the mainSVG
	var mainSVG = document.getElementById('svg');
	svgMarker.appendChild(svgMarkerPath);
	svgDefs.appendChild(svgMarker);
	mainSVG.appendChild(svgDefs);
}
//The below is the expected result
/*
<svg id="svg" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<marker id='arrowHead' orient='auto' markerWidth='2' markerHeight='4' 
				refX='0.1' refY='2'>
			<path d='M0,0 V3 L3,1.5 Z' fill='black' />
		</marker>
	</defs>
</svg>*/

//SVG PATH
function nodesconnector(pathXYcord, svgClass, svgColor, connectedTo, connect4rom, useArrow) {
	pathIDgenerator();
	var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	document.getElementById("svg").appendChild(path1);

	path1.id = pathIDgenerator();
	path1.setAttributeNS(null, "d", pathXYcord);
	if (svgColor == null) {
		svgColor = 'black'
	}
	svgMarkerColor = svgColor; //This is for the marker (see above), i.e., the arrow head
	path1.setAttributeNS(null, "stroke", svgColor);
	path1.setAttributeNS(null, "stroke-width", 4);
	// path1.setAttributeNS(null, "marker-end", url(#head));
	path1.setAttributeNS(null, "opacity", 0.8);
	path1.setAttributeNS(null, "fill", "none");
	path1.classList.add("svg-connectors")
	if (svgClass != null) {
		if (Array.isArray(svgClass)) {
			for (I = 0; I < svgClass.length; I++) {
				path1.classList.add(svgClass[I]);
			}
		} else if (typeof svgClass === 'string') {
			path1.classList.add(svgClass)
		}
	}
	path1.setAttributeNS(null, 'connectedto', connectedTo);
	path1.setAttributeNS(null, 'connectedfrom', connect4rom);

	//PATH ID GENERATOR
	function pathIDgenerator() {
		var pathId;
		pathId = connect4rom.replace('node', 'n') + connectedTo.replace('node', 'n');
		return pathId;
	}
}

// CREATE SVG CONNECTOR PATHS
var lengthB4curve = 50;
function drawConnector(A, B, svgClass, svgColor, connectedTo, connect4rom, useArrow) {
	var posnA;
	var posnB;
	var AxCenter = A.offsetLeft + A.offsetWidth / 2;
	var BxCenter = B.offsetLeft + B.offsetWidth / 2;
	var AyCenter = A.offsetTop + A.offsetHeight / 2;
	var ByCenter = B.offsetTop + B.offsetHeight / 2;
	var XdivY = (BxCenter - AxCenter) / (AyCenter - ByCenter);
	if (XdivY < 0) {
		XdivY = XdivY * -1
	}
	var YdivX = (AyCenter - ByCenter) / (BxCenter - AxCenter);
	if (YdivX < 0) {
		YdivX = YdivX * -1
	}
	//from A-RIGHT to B-LEFT

	//Origin is LEFT of destination
	if (AxCenter < BxCenter) {
		//left-right
		posnA = {
			x: A.offsetLeft + A.offsetWidth,
			y: A.offsetTop + A.offsetHeight / 2
		};
		//top-bottom
		// posnA = {
		// 	x: A.offsetLeft + A.offsetWidth / 2,
		// 	y: A.offsetTop + A.offsetHeight 
		// };

		if (AyCenter < ByCenter) {
			//1.5 >> 4.30
			if ((YdivX) < 1) {
				if (useArrow == null) {
					posnB = {
						x: B.offsetLeft - 10,
						y: B.offsetTop + B.offsetHeight / 2
					}
				} else if (useArrow == 1) {
					posnB = {
						x: B.offsetLeft - 10,
						y: B.offsetTop + B.offsetHeight / 2
					}
				}
				if(Math.abs(posnB.x - posnA.x) > 75){
					lengthB4curve = 75
				} else{lengthB4curve = Math.abs(posnB.x - posnA.x)/1.5}
				
				nodesconnector(("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x + lengthB4curve) + "," + (posnA.y) + " " + (posnB.x - lengthB4curve) + "," + (posnB.y) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
			}
			//4.30 >> 6
			else {
				posnA = {
					x: A.offsetLeft + A.offsetWidth / 2,
					y: A.offsetTop + A.offsetHeight
				};
				if (useArrow == null) {
					posnB = {
						x: B.offsetLeft + B.offsetWidth / 2,
						y: B.offsetTop - 10
					}
				} else if (useArrow == 1) {
					posnB = {
						x: B.offsetLeft + B.offsetWidth / 2,
						y: B.offsetTop - 10
					}
				}
				if(Math.abs(posnB.y - posnA.y) > 75){
					lengthB4curve = 75
				} else{lengthB4curve = Math.abs(posnB.y - posnA.y)/1.5}
				nodesconnector(("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x) + "," + (posnA.y + lengthB4curve) + " " + (posnB.x) + "," + (posnB.y - lengthB4curve) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
			}
		} else {
			// console.log("A under B")
			//12 >> 1.30
			if ((XdivY) < 1) {
				posnA = {
					x: A.offsetLeft + A.offsetWidth / 2,
					y: A.offsetTop
				};
				if (useArrow == null) {
					posnB = {
						x: B.offsetLeft + B.offsetWidth / 2,
						y: (B.offsetTop + B.offsetHeight) + 10
					}
				} else if (useArrow == 1) {
					posnB = {
						x: B.offsetLeft + B.offsetWidth / 2,
						y: (B.offsetTop + B.offsetHeight) + 10
					}
				}
				if(Math.abs(posnB.y - posnA.y) > 75){
					lengthB4curve = 75
				} else{lengthB4curve = Math.abs(posnB.y - posnA.y)/1.5}
				nodesconnector(("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x) + "," + (posnA.y - lengthB4curve) + " " + (posnB.x) + "," + (posnB.y + lengthB4curve) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
			}
			//1.30 >> 3
			else {
				if (useArrow == null) {
					posnB = {
						x: B.offsetLeft - 10,
						y: B.offsetTop + B.offsetHeight / 2
					}
				} else if (useArrow == 1) {
					posnB = {
						x: B.offsetLeft - 10,
						y: B.offsetTop + B.offsetHeight / 2
					}
				}
				if(Math.abs(posnB.x - posnA.x) > 75){
					lengthB4curve = 75
				} else{lengthB4curve = Math.abs(posnB.x - posnA.x)/1.5}
				nodesconnector(("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x + lengthB4curve) + "," + (posnA.y) + " " + (posnB.x - lengthB4curve) + "," + (posnB.y) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
			}
		}
	}
	//from A-LEFT to B-RIGHT
	else {
		posnA = {
			x: A.offsetLeft,
			y: A.offsetTop + A.offsetHeight / 2
		};

		if (AyCenter < ByCenter) {
			//7.30 >> 9
			if ((YdivX) < 1) {
				if (useArrow == null) {
					posnB = {
						x: B.offsetLeft + 10 + B.offsetWidth,
						y: B.offsetTop + B.offsetHeight / 2
					}
				} else if (useArrow == 1) {
					posnB = {
						x: B.offsetLeft + 10 + B.offsetWidth,
						y: B.offsetTop + B.offsetHeight / 2
					}
				}
				if(Math.abs(posnB.x - posnA.x) > 75){
					lengthB4curve = 75
				} else{lengthB4curve = Math.abs(posnB.x - posnA.x)/1.5}
				nodesconnector(("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x - lengthB4curve) + "," + (posnA.y) + " " + (posnB.x + lengthB4curve) + "," + (posnB.y) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
			}
			//6 >> 7.30
			else {
				posnA = {
					x: A.offsetLeft + A.offsetWidth / 2,
					y: A.offsetTop + A.offsetHeight
				};
				if (useArrow == null) {
					posnB = {
						x: B.offsetLeft + B.offsetWidth / 2,
						y: B.offsetTop - 10
					}
				} else if (useArrow == 1) {
					posnB = {
						x: B.offsetLeft + B.offsetWidth / 2,
						y: B.offsetTop - 10
					}
				}
				if(Math.abs(posnB.y - posnA.y) > 75){
					lengthB4curve = 75
				} else{lengthB4curve = Math.abs(posnB.y - posnA.y)/1.5}
				nodesconnector(("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x) + "," + (posnA.y + lengthB4curve) + " " + (posnB.x) + "," + (posnB.y - lengthB4curve) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
			}
		} else {
			//10.30 >> 12
			if ((XdivY) < 1) {
				posnA = {
					x: A.offsetLeft + A.offsetWidth / 2,
					y: A.offsetTop
				};
				if (useArrow == null) {
					posnB = {
						x: B.offsetLeft + B.offsetWidth / 2,
						y: (B.offsetTop + B.offsetHeight) + 10
					}
				} else if (useArrow == 1) {
					posnB = {
						x: B.offsetLeft + B.offsetWidth / 2,
						y: (B.offsetTop + B.offsetHeight) + 10
					}
				}
				if(Math.abs(posnB.y - posnA.y) > 75){
					lengthB4curve = 75
				} else{lengthB4curve = Math.abs(posnB.y - posnA.y)/1.5}
				nodesconnector(("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x) + "," + (posnA.y - lengthB4curve) + " " + (posnB.x) + "," + (posnB.y + lengthB4curve) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
			}
			//9 >> 10.30
			else {
				if (useArrow == null) {
					posnB = {
						x: B.offsetLeft + 10 + B.offsetWidth,
						y: B.offsetTop + B.offsetHeight / 2
					}
				} else if (useArrow == 1) {
					posnB = {
						x: B.offsetLeft + 10 + B.offsetWidth,
						y: B.offsetTop + B.offsetHeight / 2
					}
				}
				if(Math.abs(posnB.x - posnA.x) > 75){
					lengthB4curve = 75
				} else{lengthB4curve = Math.abs(posnB.x - posnA.x)/1.5}
				nodesconnector(("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x - lengthB4curve) + "," + (posnA.y) + " " + (posnB.x + lengthB4curve) + "," + (posnB.y) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
			}
		}

	}
}