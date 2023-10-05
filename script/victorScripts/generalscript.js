var leftBorderForArticleTitle = document.createElement('div');
leftBorderForArticleTitle.classList.add('leftBorderForArticleTitle');
document.querySelector('article>main>header').prepend(leftBorderForArticleTitle);

const myTime = setTimeout(expandANDdate, 1900);
function expandANDdate() {
    document.getElementById('archive-date').classList.add('slideInFromTop');
    document.getElementById('expandANDdate').classList.add('slideInFromBottom');
    const myHeaderH1 = document.querySelector('article>main>header')
    myHeaderH1.classList.add('slideInFromLeft');
}

const myTimeinForArticle = setTimeout(myArticle, 1500);
function myArticle() {
    // const myArticleTagNames = document.querySelectorAll('main > *:not(header)')
    // const myArticleTagNames = document.querySelectorAll('h1.H0, h2.H1, h3.H2, h4.H3, h5.H4, h6.H5, .h0 > *');
    const myArticleTagNames = document.querySelectorAll('main>h1,main>h2,main>h3,main>h4,main>h5,main>h6');
    const myArticleTagNamesArray = [...myArticleTagNames];
    myArticleTagNamesArray.forEach(element => {
        element.classList.add('easeIn');
    });
}
// const myTimeinForArticle2 = setTimeout(myArticle2, 1500);
// function myArticle2() {
//     const myArticleTagNames = document.querySelectorAll('main>h1 > *');
//     const myArticleTagNamesArray = [...myArticleTagNames];
//     myArticleTagNamesArray.forEach(element => {
//         element.classList.add('easeInn');
//   });
// }

// var myArticlePreEl = document.querySelectorAll('main > *:not(header):not(.H0):not(.H1):not(.H2):not(.H3):not(.H4):not(.H5), main > *:not(header) > *, main > *:not(header) > * > *, main > *:not(header) > * > * > *, main > *:not(header) > * > * > * > *, main > *:not(header) > * > * > * > * > *');
// var myArticlePreEl = document.querySelectorAll('main > *:not(header):not(.H0):not(.H1):not(.H2):not(.H3):not(.H4):not(.H5), main > *:not(header) > *, main > *:not(header) > * > *, main > *:not(header) > * > * > *, main > *:not(header) > * > * > * > *, main > *:not(header) > * > * > * > * > *');
// var myArticlePreEl = document.querySelectorAll('main > *:not(header):not(main>h1):not(main>h2):not(main>h3):not(main>h4):not(main>h5):not(main>h6):not(.H0):not(.H1):not(.H2):not(.H3):not(.H4):not(.H5), main > *:not(header) > *:not(.H0) > *, main > *:not(header) > *:not(.H0) > * > *, main > *:not(header) > *:not(.H0) > * > * > *, main > *:not(header) > *:not(.H0) > * > * > * > *, main > *:not(header) > *:not(.H0) > * > * > * > * > *');
// const myArticlePreEl = document.querySelectorAll('main > *:not(header):not(main>h1):not(main>h2):not(main>h3):not(main>h4):not(main>h5):not(main>h6), main > *:not(header) > *:not(main>h1) > *, main > *:not(header) > *:not(main>h1) > * > *, main > *:not(header) > *:not(main>h1) > * > * > *, main > *:not(header) > *:not(main>h1) > * > * > * > *, main > *:not(header) > *:not(main>h1) > * > * > * > * > *');
const myArticlePreEl = document.querySelectorAll('main > *:not(header):not(main>h1):not(main>h2):not(main>h3):not(main>h4):not(main>h5):not(main>h6), main > *:not(header) > *:not(.H0) > *, main > *:not(header) > *:not(.H0) > * > *, main > *:not(header) > *:not(.H0) > * > * > *, main > *:not(header) > *:not(.H0) > * > * > * > *, main > *:not(header) > *:not(.H0) > * > * > * > * > *');
const myArticlePreElArray = [...myArticlePreEl];
myArticlePreElArray.forEach(element => {
    element.classList.add('visibility');
});
const myTimeinForArticleText = setTimeout(myArticleText, 1800);
function myArticleText() {
    // const myArticlePreEl = document.querySelectorAll('main > *:not(header):not(main>h1):not(main>h2):not(main>h3):not(main>h4):not(main>h5):not(main>h6), main > *:not(header) > *, main > *:not(header) > * > *, main > *:not(header) > * > * > *, main > *:not(header) > * > * > * > *, main > *:not(header) > * > * > * > * > *');
    // const myArticlePreEl = document.querySelectorAll('main > *:not(header):not(.H0):not(.H1):not(.H2):not(.H3):not(.H4):not(.H5), main > *:not(header) > *, main > *:not(header) > * > *, main > *:not(header) > * > * > *, main > *:not(header) > * > * > * > *, main > *:not(header) > * > * > * > * > *');
    // const myArticlePreEl = document.querySelectorAll('main > *:not(header):not(.H0):not(.H1):not(.H2):not(.H3):not(.H4):not(.H5), main > *:not(header) > *:not(.H0) > *:not(.H1) > *:not(.H2) > *:not(.H3) > *:not(.H4) > *:not(.H5) > *, main > *:not(header) > *:not(.H0) > *:not(.H1) > *:not(.H2) > *:not(.H3) > *:not(.H4) > *:not(.H5) > * > *, main > *:not(header) > *:not(.H0) > *:not(.H1) > *:not(.H2) > *:not(.H3) > *:not(.H4) > *:not(.H5) > * > * > *, main > *:not(header) > *:not(.H0) > *:not(.H1) > *:not(.H2) > *:not(.H3) > *:not(.H4) > *:not(.H5) > * > * > * > *, main > *:not(header) > *:not(.H0) > *:not(.H1) > *:not(.H2) > *:not(.H3) > *:not(.H4) > *:not(.H5) > * > * > * > * > *');
    // const myArticlePreEl = document.querySelectorAll('main > *:not(header):not(main>h1):not(main>h2):not(main>h3):not(main>h4):not(main>h5):not(main>h6), main > *:not(header) > *:not(main>h1) > *, main > *:not(header) > *:not(main>h1) > * > *, main > *:not(header) > *:not(main>h1) > * > * > *, main > *:not(header) > *:not(main>h1) > * > * > * > *, main > *:not(header) > *:not(main>h1) > * > * > * > * > *');
    const myArticlePreEl = document.querySelectorAll('main > *:not(header):not(main>h1):not(main>h2):not(main>h3):not(main>h4):not(main>h5):not(main>h6), main > *:not(header) > *:not(.H0) > *, main > *:not(header) > *:not(.H0) > * > *, main > *:not(header) > *:not(.H0) > * > * > *, main > *:not(header) > *:not(.H0) > * > * > * > *, main > *:not(header) > *:not(.H0) > * > * > * > * > *');
    const myArticlePreElArray = [...myArticlePreEl];
    myArticlePreElArray.forEach(element => {
        if (element.classList.contains('visibility')) {
            element.classList.remove('visibility');
            element.classList.add('easeInTwo');
        }
        // if (element.style.visibility = "hidden") {
        //     element.style.visibility = "visible";
        // }
    });
}

// const myArticleLink = document.querySelectorAll('h1>a,h2>a');
// // myArticleLink.classList.add('visibility');
// const myArticleLinksArray = [...myArticleLink];
// myArticleLinksArray.forEach(element => {
//     // element.classList.add('visibility');
//     element.style.visibility = 'none';
// });
// const myTimeinForArticleLinks = setTimeout(myArticleLinks, 2000);
// function myArticleLinks() {
//     const myArticleLink = document.querySelectorAll('h1>a,h2>a');
//     const myArticleLinksArray = [...myArticleLink];
//     console.log(myArticleLinksArray);
//     myArticleLinksArray.forEach(element => {
//         if (element.classList.contains('visibility')) {
//             element.classList.remove('visibility');
//             element.classList.add('easeIn');
//         }
//     });
// }
