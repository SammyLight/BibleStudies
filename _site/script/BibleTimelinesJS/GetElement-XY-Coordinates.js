/*FUNCTION TO GET THE X & Y COORDINATES OF AN ELEMENT*/

/*
var x;
var y;
var trueX;
var trueY;
var trueWidth;
var trueHeight;

//CENTER POINTS
//Left Side
var leftXcenter;
var leftYcenter;

//Right Side
var rightXcenter;
var rightYcenter;

//Top Side
var topXcenter;
var topYcenter;

//Bottom Side
var bottomXcenter;
var bottomYcenter;
*/

function getCoordinates(element) {

	var rect = element.getBoundingClientRect();
	var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	
	var trueX;
	var trueY;
	var trueWidth;
	var trueHeight;

	//THESE COORDINATES DO NOT INCLUDE THE BORDERS
	var y = rect.top + scrollTop;
	var x = rect.left + scrollLeft;
//	var y = rect.y;
//	var x = rect.x;

	var width = element.clientWidth;
	var height = element.clientHeight;


	//THE BORDER WIDTHS FOR THE TOP, RIGHT, BOTTOM AND LEFT SIDES

	var style = getComputedStyle(element);

	var borderTopWidth = parseInt(style.borderTopWidth) || 0;
	var borderLeftWidth = parseInt(style.borderLeftWidth) || 0;
	var borderBottomWidth = parseInt(style.borderBottomWidth) || 0;
	var borderRightWidth = parseInt(style.borderRightWidth) || 0;

	return {
		//THESE COORDINATES INCLUDE THE BORDERS

		trueWidth: width + borderLeftWidth + borderRightWidth,
		trueHeight: height + borderTopWidth + borderBottomWidth,

		trueX: x - borderLeftWidth,
		trueY: y - borderTopWidth,

		//CENTER, NORTH, SOUTH, EAST and WEST POINTS
		//Left Side
		leftCenterX: x,
		leftCenterY: y + ((height + borderTopWidth + borderBottomWidth) / 2),
		leftNorthX: x,
		leftNorthY: y,
		leftSouthX: x,
		leftSouthY: y + (height + borderTopWidth + borderBottomWidth),

		//Right Side
		rightCenterX: x + width + borderRightWidth + borderLeftWidth,
		rightCenterY: y + ((height + borderTopWidth + borderBottomWidth) / 2),
		rightNorthX: x + width + borderRightWidth + borderLeftWidth,
		rightNorthY: y,
		rightSouthX: x + width + borderRightWidth + borderLeftWidth,
		rightSouthY: y + (height + borderTopWidth + borderBottomWidth),

		//Top Side
		topCenterX: x + (width / 2),
		topCenterY: y,
		topWestX: x,
		topWestY: y,
		topEastX: x,
		topEastY: y + (height + borderTopWidth + borderBottomWidth),

		//Bottom Side
		bottomCenterX: x + (width / 2),
		bottomCenterY: y + height + borderBottomWidth + borderTopWidth,
		bottomWestX: x + width + borderRightWidth + borderLeftWidth,
		bottomWestY: y,
		bottomEastX: x + width + borderRightWidth + borderLeftWidth,
		bottomEastY: y + (height + borderTopWidth + borderBottomWidth),
	}

}

/*
// example use
var div = document.querySelectorAll('div')[0];
var divCoordinates = getCoordinates(div);
console.log(divCoordinates.bottomXcenter, divCoordinates.bottomYcenter);
*/