// FOR MORE THAN ONE OL ON A PAGE
var all_OL_List;
var mLclass = document.querySelector('.meganestedlist');
//Check if there is any list with 'meganestedlist' 
if (mLclass) {
    all_OL_List = document.querySelectorAll('.meganestedlist')
    console.log(all_OL_List);
} else {
    all_OL_List = document.querySelectorAll('*:not(li):not(ol):not(ul)>ol');
}
console.log(all_OL_List);

//HIDE ALL_CHILDREN_OL
all_OL_List.forEach(OL_List => {
    var all_Children_OL = OL_List.querySelectorAll('ol');
    all_Children_OL.forEach(eachOL => {
        eachOL.style.display = 'none';
    });

    //TOGGLE CHILD_OL OF CLICKED LI
    OL_List.addEventListener('click', function (e) {
        var clickedLI;
        if (e.target.nodeName == 'LI') {
            var clickedLI = e.target;
        } else {
            var testElm = e.target;
            while (testElm.nodeName != 'LI') {
                if (testElm.parentElement.nodeName == 'LI') {
                    eParent = testElm.parentElement;
                    clickedLI = eParent;
                }
                testElm = clickedLI;
            }
        }
        var currentList = clickedLI;
        if (child_OL = currentList.querySelector('ol')) {
            cOL = child_OL;
            if (cOL.style.display == 'none') {
                cOL.style.display = '';
                // currentList.style.color = 'blue';
                currentList.getElementsByTagName('span')[0].innerHTML = closeTriangle;
                // cOL.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
            } else {
                // currentList.style.color = 'red';
                cOL.style.display = 'none'
                currentList.getElementsByTagName('span')[0].innerHTML = openTriangle;
            }
        }
    })

    //DECORATE CLICKABLE LI
    //GET ALL LI THAT HAVE OL/UL
    var closeTriangle = "&#9866;" //Minus sign (⚊)
    var openTriangle = "&#10010;" //Plus sign (✚)
    // var closeTriangle = "&#9650;"//Up triangle (▲)
    // var openTriangle = "&#9660;"//Down triangle (▼)

    all_Children_OL.forEach(child_OL => {
        OL_parentLI = child_OL.parentElement;
        // OL_parentLI.style.color = 'red';
        OL_parentLI.style.cursor = 'pointer';

        var triangleSpan = document.createElement("span");
        triangleSpan.innerHTML = openTriangle;
        OL_parentLI.prepend(triangleSpan);
    });
});