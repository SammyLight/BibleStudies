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
function getElementOffset(el) {
  let topZ = 0;
  let leftZ = 0;
  let element = el;

  // Loop through the DOM tree
  // and add it's parent's offset to get page offset
  do {
    topZ += element.offsetTop || 0;
    leftZ += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    topZ,
    leftZ,
  };
}

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

		//Left, midpoint and right points along the TOP, CENTER and BOTTOM horizontal lines
		//Top Side
		topLeftX: x,
		topLeftY: y,
		topMidpointX: x + (width / 2),
		topMidpointY: y,
		topRightX: x,
		topRightY: y + (height + borderTopWidth + borderBottomWidth),
		
		//Center
		centerLeftX: x,
		centerLeftY: y + ((height + borderTopWidth + borderBottomWidth) / 2),
		centerRightX: x + width + borderRightWidth + borderLeftWidth,
		centerRightY: y + ((height + borderTopWidth + borderBottomWidth) / 2),
		centerMidpointX: x + (width / 2),
		centerMidpointY: y + ((height + borderTopWidth + borderBottomWidth) / 2),
		
		//Bottom Side
		bottomLeftX: x + width + borderRightWidth + borderLeftWidth,
		bottomLeftY: y,
		bottomMidpointX: x + (width / 2),
		bottomMidpointY: y + height + borderBottomWidth + borderTopWidth,
		bottomRightX: x + width + borderRightWidth + borderLeftWidth,
		bottomRightY: y + (height + borderTopWidth + borderBottomWidth),
	}

}

/*
// example use
var div = document.querySelectorAll('div')[0];
var divCoordinates = getCoordinates(div);
console.log(divCoordinates.bottomXcenter, divCoordinates.bottomYcenter);
*/