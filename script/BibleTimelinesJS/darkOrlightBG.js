//from --https://codepen.io/andreaswik/pen/YjJqpK
function lightOrDark(color) {
	var r, g, b, hsp;
	
	// Check the format of the color, HEX or RGB?
	if (color.match(/^rgb/)) {

		// If HEX --> store the red, green, blue values in separate variables
		color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

		r = color[1];
		g = color[2];
		b = color[3];
	} else {

		// If RGB --> Convert it to HEX: http://gist.github.com/983661
		color = +("0x" + color.slice(1).replace(
			color.length < 5 && /./g, '$&$&'
		));

		r = color >> 16;
		g = color >> 8 & 255;
		b = color & 255;
	}

	// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
	hsp = Math.sqrt(
		0.299 * (r * r) +
		0.587 * (g * g) +
		0.114 * (b * b)
	);

	// Using the HSP value, determine whether the color is light or dark
	if (hsp > 127.5) {
		return 'light';
	} else {
		return 'dark';
	}
}

function darkOrLightBG(x) {
	var element, bgColor, brightness;

	element = x;

	// Get the element's background color
	bgColor = window.getComputedStyle(element, null).getPropertyValue('background-color');

	// Call lightOrDark function to get the brightness (light or dark)
	brightness = lightOrDark(bgColor);

	// If the background color is dark, add the light-text class to it
	if (brightness == 'dark') {
		if(element.classList.contains('dark-text')){
			element.classList.remove('dark-text')
		}
		element.classList.add('light-text');
	} else {
		if(element.classList.contains('light-text')){
			element.classList.remove('light-text')
		}
		element.classList.add('dark-text');
	}
}