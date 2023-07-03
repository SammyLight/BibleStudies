var leftBorderForArticleTitle = document.createElement('div');
leftBorderForArticleTitle.classList.add('leftBorderForArticleTitle');
document.querySelector('article>main>header').prepend(leftBorderForArticleTitle);

const myTime = setTimeout(expandANDdate, 2000);
function expandANDdate() {
    document.getElementById('archive-date').classList.add('slideInFromTop');
    document.getElementById('expandANDdate').classList.add('slideInFromBottom');
    const myHeaderH1 = document.querySelector('article>main>header')
    myHeaderH1.classList.add('slideInFromLeft');
}

const myTimeinForArticle = setTimeout(myArticle, 2500);
function myArticle() {
    // const myArticleTagNames = document.querySelectorAll('main > *:not(header)')
    const myArticleTagNames = document.querySelectorAll('h1.H0, h2.H1, h3.H2, h4.H3, h5.H4, h6.H5');
    const myArticleTagNamesArray = [...myArticleTagNames];
    myArticleTagNamesArray.forEach(element => {
        element.classList.add('easeIn');
    });
}

var myArticlePreEl = document.querySelectorAll('main > *:not(header):not(.H0):not(.H1):not(.H2):not(.H3):not(.H4):not(.H5)');
const myArticlePreElArray = [...myArticlePreEl];
myArticlePreElArray.forEach(element => {
    element.classList.add('visibility');
});
const myTimeinForArticleText = setTimeout(myArticleText, 2000);
function myArticleText() {
    var myArticlePreEl = document.querySelectorAll('main > *:not(header):not(.H0):not(.H1):not(.H2):not(.H3):not(.H4):not(.H5)');
    const myArticlePreElArray = [...myArticlePreEl];
    myArticlePreElArray.forEach(element => {
        if (element.classList.contains('visibility')) {
            element.classList.remove('visibility');
            element.classList.add('easeIn');
        }
        // if (element.style.visibility = "hidden") {
        //     element.style.visibility = "visible";
        // }
    });
}



