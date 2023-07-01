const myTime = setTimeout(expandANDdate, 2000);
function expandANDdate() {
    document.getElementById('expandANDdate').classList.add('slideInFromTop');
    const myHeaderH1 = document.querySelector('article>header')
    myHeaderH1.classList.add('slideInFromLeft');
}

const myTimeinForArticle = setTimeout(myArticle, 2500);
function myArticle() {
    const myArticleTagNames = document.querySelectorAll('article > *:not(header)')
    const myArticleTagNamesArray = [...myArticleTagNames];
    myArticleTagNamesArray.forEach(element => {
        element.classList.add('slideInFromRight');
      });
}
