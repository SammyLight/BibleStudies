//YOU MUST HAVE AN SVG ELEMENT IN THE HTML BODY TO WHICH THE SVG PATHS WILL BE APPENDED.

//Below is the Code for the SVG Marker which is what produces the arrowHead
//This has to be referenced in the styleSheet
if(!document.querySelector('#arrowHead')){
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
	function pathIDgenerator(){
		var pathId;
		pathId = connect4rom.replace('node', 'n') + connectedTo.replace('node', 'n');
		return pathId;
	}	
}

// CREATE SVG CONNECTOR PATHS
function drawConnector(A, B, svgClass, svgColor, connectedTo, connect4rom, useArrow) {
	var posnA;
	var posnB;
	//from A-RIGHT to B-LEFT
	if(A.offsetLeft < B.offsetLeft){
		posnA = {
		x: A.offsetLeft + A.offsetWidth,
		y: A.offsetTop + A.offsetHeight / 2
		};
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
		nodesconnector(("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x + 75) + "," + (posnA.y) + " " + (posnB.x - 75) + "," + (posnB.y) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
	}
	//from A-LEFT to B-RIGHT
	else {
		posnA = {
		x: A.offsetLeft,
		y: A.offsetTop + A.offsetHeight / 2
		};
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
		nodesconnector(("M" + (posnA.x) + "," + (posnA.y) + " " + "C" + (posnA.x - 75) + "," + (posnA.y) + " " + (posnB.x + 75) + "," + (posnB.y) + " " + (posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
	}
}

// function updatePathCoordinates(path2update){
// 	path2update.setAttributeNS(null, "d", pathXYcord);
// }

	// drawConnector(startElement, endElement);

	// get Center of svg Path
	// var bbox = p.getBBox(); var x = Math.floor(bbox.x + bbox.width/2.0); var y = Math.floor(bbox.y + bbox.height/2.0);