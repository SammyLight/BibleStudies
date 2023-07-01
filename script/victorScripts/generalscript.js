const myTime = setTimeout(expandANDdate, 2000);
function expandANDdate() {
    document.getElementById('archive-date').classList.add('slideInFromTop');
    document.getElementById('expandANDdate').classList.add('slideInFromBottom');
    const myHeaderH1 = document.querySelector('article>main>header')
    myHeaderH1.classList.add('slideInFromLeft');
}

const myTimeinForArticle = setTimeout(myArticle, 2500);
function myArticle() {
    const myArticleTagNames = document.querySelectorAll('main > *:not(header)')
    const myArticleTagNamesArray = [...myArticleTagNames];
    myArticleTagNamesArray.forEach(element => {
        element.classList.add('slideInFromRight');
      });
}

var leftBorderForArticleTitle = document.createElement('div');
leftBorderForArticleTitle.classList.add('leftBorderForArticleTitle');
document.querySelector('article>main>header').prepend(leftBorderForArticleTitle);
