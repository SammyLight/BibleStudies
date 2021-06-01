/*
http://www.javascriptkit.com/javatutors/touchevents2.shtml

We stipulate that a right swipe has occurred when the user has moved his finger across the touch surface a minimum of 150px horizontally in 200 ms or less from left to right. Furthermore, there should be no more than 100px traveled vertically, to avoid "false positives" whereby the user swipes diagonally across, which we don't want to qualify as a swipe right.
*/

function swipedetect(el, callback) {

	var touchsurface = el,
		swipedir,
		startX,
		startY,
		distX,
		distY,
		threshold = 50, //required min distance traveled to be considered swipe
		restraint = 50, // maximum distance allowed at the same time in perpendicular direction
		allowedTime = 500, // maximum time allowed to travel that distance
		elapsedTime,
		startTime,
		handleswipe = callback || function (swipedir) {}

	touchsurface.addEventListener('touchstart', function (e) {
		var touchobj = e.changedTouches[0]
		swipedir = 'none'
		dist = 0
		startX = touchobj.pageX
		startY = touchobj.pageY
		startTime = new Date().getTime() // record time when finger first makes contact with surface
		e.preventDefault()
	}, false)

	touchsurface.addEventListener('touchmove', function (e) {
		e.preventDefault() // prevent scrolling when inside DIV
	}, false)

	touchsurface.addEventListener('touchend', function (e) {
		var touchobj = e.changedTouches[0]
		distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
		distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
		elapsedTime = new Date().getTime() - startTime // get time elapsed
		if (elapsedTime <= allowedTime) { // first condition for awipe met
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
				swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
			} else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
				swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
			}
		}
		handleswipe(swipedir)
		e.preventDefault()
	}, false)
}

//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
    swipedir contains either "none", "left", "right", "up", or "down"
    if (swipedir =='left')
        alert('You just swiped left!')
})
*/
