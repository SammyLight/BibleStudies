/* Function to add style element */
function addStyle(styles) {

	/* Create style document */
	var css = document.createElement('style');
	css.type = 'text/css';

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
        .divNode {
            position: absolute;
            border: 2.5px solid black;
			border-radius: 10px;
			background-color: beige;
			text-align: center;
            display:table;
            }
		.divNode p:empty{
            background-color:pink;
            //display:none;
            }
        .divNode:empty{
            background-color:pink;
            display:none;
            }
        .textNode {
            overflow: auto;
            display:table-cell;
            vertical-align: middle;
            }`;

/* Function call */
window.onload = function () {
	addStyle(styles)
};


//TURN HTML TABLE INTO ARRAY

var tableArray = [];
var table = document.getElementById("tableFORarray");

//TABLE ROWS
var tableRows = table.rows;

for (rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
	//create empty array corresponding to each table row
	//		tableArray.push([]);

	var rowID = tableRows[rowIndex].id;
	tableArray.push({
		id: rowID,
		row: []
	});
	console.log(tableArray);

	var tr = tableRows[rowIndex];

	//ROW CELLS
	var tds = tr.cells;
	//		console.log(td);

	for (cellIndex = 0; cellIndex < tds.length; cellIndex++) {
		var td = tds[cellIndex];
		var label = td.innerHTML;
		var destination = td.getAttribute("to");;
		console.log(label);
		//		tableArray[rowIndex][cellIndex] = {to: destination, text: label};
		tableArray[rowIndex].row[cellIndex] = {
			to: destination,
			text: label
		};
	}
}

console.table(tableArray);
if (tableArray[0].id == "GOD") {
	console.log(tableArray[0].row[5].text)
};


//FOR LOOP TO GET ALL THE NODES TEXT

	//FOR LOOP TO GET ALL THE NODES TEXT
	/*	for (i = 0; i < tableArray.length; i++) {
			var vertical = tableArray[i].id;
			var vertYmultiplier = i+1;
			console.log("NODES-GROUP:" + vertical + "  MULTIPLIER:"+vertYmultiplier);
			for (j=0; j<tableArray[i].row.length; j++) {
				console.log(tableArray[i].row[j].text)
			}
		}
		*/


	//CREATING THE DIV NODES AND SVG CONNECTING PATHS

	/*CREATING THE DIV NODES AND SVG CONNECTING PATHS*/

	/*DIV NODE FUNCTION*/
	function nodediv(x, y, w, h, ntext) {
		var noded1 = document.createElement('div');
		noded1.setAttribute('class', 'divNode');
		noded1.style.left = x;
		noded1.style.top = y;
		noded1.style.height = h;
		noded1.style.maxHeight = h;
		noded1.style.width = w;

		var nodep = document.createElement('p');
		nodep.setAttribute('class', 'textNode');

		/*This functionis to Truncate the text if it is too long so that it doesn't overflow and change the div height*/
		text_truncate = function (str, length, ending) {
			if (length == null) {
				length = 100;
			}
			if (ending == null) {
				ending = '...';
			}
			if (str.length > length) {
				return str.substring(0, length - ending.length) + ending;
			} else {
				return str;
			}
		}

		var text = document.createTextNode(text_truncate(ntext, 50));
		nodep.appendChild(text);

		noded1.appendChild(nodep);
		document.body.append(noded1);
	}

/*NODES CONNECTORS FUNCTION*/
function nodesconnector(pathXYcord /*node1, node2*/ ) {
	// Create A Path
	//	var pathId = "pathIdD";
	//		var pathXYcord = `A + "," + B + " " + C + "," + D + " "`;
	var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	document.getElementById("svg").appendChild(path1);

	path1.setAttributeNS(null, "d", "M " + pathXYcord);
	path1.setAttributeNS(null, "stroke", "grey");
	path1.setAttributeNS(null, "stroke-width", 10);
	path1.setAttributeNS(null, "opacity", 1);
	path1.setAttributeNS(null, "fill", "none");
}
/*CREATION FUNCTION*/
function diagram() {

	//for size of divnode
	var a = 10,
		b = 0,
		bMargin = 20,
		width = 120,
		height = 80;
	//for horizontal distance between nodes
	var horizontalgap = 200,
		spacinY = bMargin + height,
		spacinX = horizontalgap - width;
	var x1, x2, x3, x4, y1, y2, y3, y4;

	for (i = 0; i < tableArray.length; i++) {

		/*			var vertical = tableArray[i].id;*/
		for (j = 0; j < tableArray[i].row.length; j++) {

			var nodes = tableArray[i].row[j];

			//CREATE DIV NODES -- only shows nodes that have text content
			if (nodes.text) {
				nodediv((a + "px"), (b + bMargin + "px"), (width + "px"), (height + "px"), nodes.text);
			}

			//NODES-CONNECTOR
			if (nodes.to) /*check if node has 'to' key is not null*/ {
				//search all the tablearray for object with 'id' value equal to the 'to' value of the current node
				for (k = 0; k < tableArray.length; k++) {

					/* index variables guides i, j, k, l
					i = index of originNode's row in the tableArray
					k = index of endNode's row in the tableArray
					j = index of originNode in its row or horitonzal group
					l = index of endNode in its row or horizontal group
					
					[pathXYcord] format = `x1 + "," + y1 + " " + x2 + "," + y2 + " "`
					*/

					//draw connectors based on relative position of nodes
					//1. originNode and endNode are in the same row (the originNode will always be before the endNode)
					//if it is in the same row, find node that has text that has index GREATER than (and not equal to) the originNode, i.e., start checking from the next index.
					if ((tableArray[k].id == nodes.to) && (tableArray[k].id == tableArray[i].id)) {
						for (m = (j + 1); m < tableArray[k].row.length; m++) {
							if (tableArray[k].row[m].text) {
								x1 = a + width + 2.5;
								y1 = (b + bMargin) + (height / 2);
								x2 = a + ((m - j) * horizontalgap);
								y2 = y1;
								pathXYcord = x1 + "," + y1 + " " + x2 + "," + y2 + " ";
								nodesconnector(pathXYcord);

								break;
							}
						}
					} else if ((tableArray[k].id == nodes.to) && (tableArray[k].id != tableArray[i].id)) {
						//find node that has text that has index equal to or greater than the originNode
						for (l = j; l < tableArray[k].row.length; l++) {
							if ((tableArray[k].row[l].text) && (i != k)) {
								var endnode = tableArray[k].row[l];

								var endnodeVertYspacing = (k + 1) * 100;
								var endnode_b = endnodeVertYspacing - height;

								//originNode and endNode are on different rows
								//2a. originNode and endNode are in the same column && originNode is below endNode in the same column
								if (j == l && i > k) {
									x1 = a + (width / 2) + 2.5;
									y1 = (b + bMargin);
									x2 = x1;
									y2 = (k * (height + bMargin)) + (height + bMargin + 2.5);
									//										y2 = ((k+1) * height) + 10 + 2.5;
									pathXYcord = x1 + "," + y1 + " " + x2 + "," + y2 + " ";
									nodesconnector(pathXYcord);

									break;
								}
								//2b. originNode and endNode are in the same column && originNode is above endNode in the same column
								else if (j == l && i < k) {
									x1 = a + (width / 2) + 2.5;
									y1 = (b + bMargin) + height + 2.5;
									x2 = x1;
									y2 = (k * spacinY) + bMargin;
									pathXYcord = x1 + "," + y1 + " " + x2 + "," + y2 + " ";
									nodesconnector(pathXYcord);

									break;
								}
								//3a. originNode and endNode are in different rows and columns && originNode row is below endNode row
								else if (j != l && i > k) {
									x1 = a + width + 2.5;
									y1 = (b + bMargin) + (height / 2);

									x2 = x1 + (spacinX / 2);
									y2 = y1;

									x3 = x2;
									y3 = (k * (height + bMargin)) + ((height / 2) + bMargin);
									//										y3 = (((k+1) * (height + 10 + 2.5))/2);

									x4 = a + ((l - j) * horizontalgap);
									y4 = y3;
									pathXYcord = x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4 + " ";
									nodesconnector(pathXYcord);

									break;
								}
								//3b. originNode and endNode are in different rows and columns && originNode row is above endNode row
								else if (j != l && i < k) {
									x1 = a + width + 2.5;
									y1 = (b + bMargin) + (height / 2);

									x2 = x1 + (spacinX / 2);
									y2 = y1;

									x3 = x2;
									y3 = (k * (height + bMargin)) + ((height / 2) + bMargin);
									//										y3 = (((k+1) * (height + 10 + 2.5))/2);

									x4 = a + ((l - j) * horizontalgap);
									y4 = y3;
									pathXYcord = x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4 + " ";
									nodesconnector(pathXYcord);

									break;
								}

								break;
							}
							//								break;
						}
						break;
					}
				}
			}
			//				}
			a = a + horizontalgap;
			//			console.log(tableArray[i].row[j].text)
		}

		var vertYspacing = (i + 1) * spacinY;
		b = vertYspacing, a = 10;
		console.log(b);

	}

}

diagram();