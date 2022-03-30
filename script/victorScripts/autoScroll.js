let scrollerID;
let paused = true;
let speed = 10; // 1 - Fast | 2 - Medium | 3 - Slow
let interval = speed * 5;

function startScroll(){
    let id = setInterval(function() {
        window.scrollBy(0, 2);
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // Reached end of page
            stopScroll();
        }
    }, interval);
    return id;
}

function stopScroll() {
    clearInterval(scrollerID);
}

document.body.addEventListener('keypress', function (event)
{
    if (event.which == 13 || event.keyCode == 13) {
        // It's the 'Enter' key
        if(paused == true) {
            scrollerID = startScroll();
            paused = false;
        }
        else {
            stopScroll();
            paused = true;
        }
    }
}, true);