// "use strict";
// Script for the Toggling between Questions and Question count
var head = document.head || document.getElementsByTagName('head')[0];
var body = document.body;
var questions = document.querySelector('.QandA-Board>OL').children;
var resultSection = document.getElementById('quizResult-section');
var qandAsection = document.getElementById('QandA-section');
var CorrectedAnswersSection = document.getElementById('CorrectedAnswers-section');

function greyOutON(x) {
    x.style.color = 'grey';
    x.style.pointerEvents = 'none';
}
function greyOutOFF(x) {
    x.style.color = '';
    x.style.pointerEvents = '';
}
var nextquestionbutton = document.getElementById('nextquestionbutton');
greyOutON(nextquestionbutton);
nextquestionbutton.addEventListener('click', confirm);
var prevquestionbutton = document.getElementById('prevquestionbutton');
greyOutON(prevquestionbutton);
var questionhint = document.getElementById('questionhint');
greyOutON(questionhint);
var questionsIndex = document.getElementById('questionsIndex');
var performance = document.getElementById('performance');
var scoreCorrect = document.getElementById('scoreCorrect');
var scoreMissed = document.getElementById('scoreMissed');
var totalQuestions = questions.length;
var currentQuestionIndex;
var currentQuestion;
var nextQuestion;
var questionCount;
var previousQuestion = questions[0]; //the first question is the initial previousQuestion
var optChildSpan;
var questionsArray = [];
var passFailSequenceArray = [];
var passedQuestionsArray = [];
var failedQuestionsArray = [];
var previousClickedULArray = [];
var clickedOptionsArray = [];
var confirmButtonHasBeenClicked;
var notLastQuestion = 1;
var rightBorder = '7px solid white';
var wrongAnswerBackground = 'red';
var rightAnswerBackground = 'green';
var optSelectedBackground = 'orange';
var modal = document.getElementById('completeQuiz');
var slideIndex = 1;
function plusDivs(n) {
    showNextOrPrevQuestion(slideIndex += n);
    clickSound.play();
}
function goToPreviousQuestion() {
    if (currentQuestionIndex != 1) {
        confirmButton.innerText = 'Next';
        greyOutOFF(nextquestionbutton);
    }
    plusDivs(-1);
}
for (i = 0; i < questions.length; i++) {
    if (i > 0) {
        questions[i].style.display = "none";
    } //Previous Viewed Question
    questions[i].setAttribute('question', i + 1);
    var chances;
    // Check if the first structure exists
    var liStrongElements = questions[i].querySelectorAll('LI > STRONG').length;
    if (liStrongElements > 0) {
        chances = liStrongElements;
    } else {
        // If the first structure doesn't exist, use the second structure
        chances = questions[i].querySelectorAll('LI > SPAN > STRONG').length;
    }
    questions[i].querySelectorAll('UL')[0].setAttribute('availablechances', chances); //Create availableChances atribute to count number of answers to a question. These will be the number of clicks possible
    questions[i].querySelectorAll('UL')[0].setAttribute('maxchances', chances); //Create availableChances atribute to count number of answers to a question. These will be the number of clicks possible

    // var allOptionsUnderQuestion = document.querySelectorAll('.QandA-Board>OL>LI>UL>LI');
    // allOptionsUnderQuestion.forEach(element => {
    //     // Check if the element already has the 'option' class
    //     if (!element.classList.contains('option')) {
    //         element.classList.add('option');
    //         var optionsNode = element.firstChild;
    //         if (optionsNode) {
    //             let contentToAdd;
    //             if (optionsNode.nodeType === 1) { // Node.ELEMENT_NODE
    //                 // Clone the HTML element and append it to createSpan
    //                 contentToAdd = optionsNode.cloneNode(true);
    //                 optionsNode.remove();
    //             } else if (optionsNode.nodeType === 3) { // Node.TEXT_NODE
    //                 const textContent = optionsNode.textContent; 
    //                 optionsNode.remove();
    //                 // Create a new text node with the content
    //                 contentToAdd = document.createTextNode(textContent);
    //             }
    //             const createSpan = document.createElement('span');
    //             createSpan.classList.add('insertedSpan');
    //             createSpan.appendChild(contentToAdd);
    //             element.appendChild(createSpan);
    //         }
    //     }
    // });
    var allOptionsUnderQuestion = document.querySelectorAll('.QandA-Board>OL>LI>UL>LI');
    allOptionsUnderQuestion.forEach(element => {
        // Check if the element already has the 'option' class
        if (!element.classList.contains('option')) {
            element.classList.add('option');
            // Create a new span element
            const createSpan = document.createElement('span');
            createSpan.classList.add('insertedSpan');
            // Move all children of the LI element to the new span
            while (element.firstChild) {
                createSpan.appendChild(element.firstChild);
            }
            // Append the new span element to the LI element
            element.appendChild(createSpan);
        }
    });
    
    var parentElementLI = questions[i];
    var parentElementLINowDiv = parentElementLI.firstChild;
    var parentElmTextNode = parentElementLINowDiv.textContent.replace(/(\((.*)\)[\s\n\r]*)/,'<p>$2</p>');
    parentElementLINowDiv.remove();
    var createDiv = document.createElement("div");
    var createDivInner = document.createElement("div");
    createDivInner.innerHTML = parentElmTextNode;
    if(pIn_createDiv = createDivInner.querySelector('p')){
    parentElementLI.prepend(pIn_createDiv)}
    createDiv.classList.add('insertedDiv');
    createDivInner.classList.add('insertedDivInner');
    createDiv.prepend(createDivInner)
    parentElementLI.prepend(createDiv)

    questions[i].querySelector('UL').addEventListener('click', isClickedLiAnAnswer);
    questionsArray.push(questions[i]);
}
showNextOrPrevQuestion(slideIndex);
var opacityBG = document.getElementById('opacityBG');
 var parentElementOL = document.querySelector('#subCat');
if (parentElementOL.children.length == 0) {
    parentElementOL.remove();
    opacityBG.classList.add('opacityBGTwo');
}   
var showNewCat;       
function showNewCatFunc() {
    var parentElementOL = document.querySelector('#subCat');
    var showNewCat = currentQuestion.querySelector('p');
    // console.log(showNewCat);
    if (showNewCat) {
        showNewCat.classList.add("showNewCatCSS");
        let clone = showNewCat.cloneNode(true);
        parentElementOL.innerHTML="";
        parentElementOL.prepend(clone);
        // var getAllPtag = parentElementOL.querySelectorAll("P");
        // for (let i = 1; i < getAllPtag.length; i++) {
        //     let onlyOnePtag = getAllPtag[i];
        //     onlyOnePtag.remove();
        // }
        // alert('does exist!');
    }
}
function showNextOrPrevQuestion(n) {
    if ((n > totalQuestions) || (n < 1)) {
        slideIndex = 1;
    }
    if (n == totalQuestions) {
        notLastQuestion = 0;
    }
    previousQuestion.style.display = "none"; //Previous Question
    currentQuestion = questions[slideIndex - 1];
    if (slideIndex < totalQuestions) {
        nextQuestion = questions[slideIndex];
    }
    currentQuestion.style.display = ""; //Current Question
    if (previousQuestion = currentQuestion) {
        questionIndex(); 
    } 
    if ((emph = currentQuestion.querySelector('em')) && (emph.parentElement == currentQuestion)) {
        greyOutOFF(questionhint);
        questionhint.style.display = "grid";
    } else {
        greyOutON(questionhint);
        questionhint.style.display = "none";
    }
    if ((emph = currentQuestion.querySelector('p')) && (emph.parentElement == currentQuestion)) {
        showNewCatFunc();
    } 
    // else {
    //     noPtagSshowNewCatFunc();
    //     // currentQuestion.previousElementSibling
    //     // console.log(currentQuestion.previousElementSibling);
    // }
    if (n == 2) {
        greyOutOFF(prevquestionbutton);
    } else if (n == 1) {
        greyOutON(prevquestionbutton);
        if ((emph = currentQuestion.querySelector('em')) && (emph.parentElement == currentQuestion)) {
            greyOutOFF(questionhint);
        } else {
            greyOutON(questionhint);
        }
    }
}
function questionIndex() {
    questionCount = document.getElementById("questioncount");
    currentQuestionIndex = slideIndex;
    questionText = "Question "
    questionCount.innerHTML = questionText + currentQuestionIndex + "/" + totalQuestions;
}

function isClickedElmOrParentAnOptionLI(c) {
    var cp = c.parentElement;
    var cli = null;
    if ((c.tagName == 'LI') && (c.classList.contains('option'))) {
        cli = c;
        return c;
    } else {
        while (cli == null) {
            if ((cp.tagName == 'LI') && (cp.classList.contains('option'))) {
                cli = cp;
                return cp
            }
            cp = cp.parentElement;
        }
    }
}

//SCRIPT FOR THE QUESTION OPTIONS
function confirm() {
    var currentQuestionsOptions = currentQuestion.querySelector('UL');
    if (confirmButton.innerText == 'Next') {
        if (notLastQuestion == 1) {
            if (!nextQuestion.querySelector('UL').getAttribute('confirmed')) {
                confirmButton.innerText = 'Confirm';
                greyOutON(nextquestionbutton);
            }
            // show the "Quiz Result" li/button after the last Question has been answered;
            if (currentQuestionIndex == totalQuestions) {
                document.getElementById("quizResult").innerHTML = "Quiz Result";
                confirmButton.style.pointerEvents = 'none';
            }
            plusDivs(1);
        } else {
            qandAsection.style.display = "grid";
            resultSection.style.display = "grid";
            resultSound.play();
            if (quizBgSound.play()){
                quizBgSound.pause();
            }
            var passedQuestionsArrayLength = passedQuestionsArray.length;
            var failedQuestionsArrayLength = failedQuestionsArray.length;
            scoreCorrect.innerText = passedQuestionsArrayLength + '/' + questionsArray.length;
            scoreMissed.innerText = failedQuestionsArrayLength + '/' + questionsArray.length;
            // questionsIndex
            for (k = 0; k < passFailSequenceArray.length; k++) {
                var pf = passFailSequenceArray[k];
                var indexSpan = document.createElement('SPAN');
                //set the color of the span element to indicate the failed or passed
                if (pf == 'fail') {
                    indexSpan.style.color = 'darkred';
                } else if (pf == 'pass') {
                    indexSpan.style.color = rightAnswerBackground;                    
                }
                //append the span element to the questionIndex
                if (k < passFailSequenceArray.length - 1) {
                    indexSpan.innerText = k + 1 + ' ';
                    questionsIndex.append(indexSpan);
                } else if (k == passFailSequenceArray.length - 1) {
                    indexSpan.innerText = k + 1;
                    questionsIndex.append(indexSpan);
                }
            }
            failedPercentage();
        }
    }
    document.getElementById('resultImgContainer');
    document.getElementById('quizCmlpt');
    document.getElementById('redoBtn');
    document.getElementById('reviewBtn');
    document.getElementById('newBtn');
    document.getElementById('poorPerPopup');
    document.getElementById('openResultBtn');
    var perfectImg = document.createElement('IMG');
    perfectImg.src = '../images/Trophy7.svg';
    perfectImg.alt = 'Trophy';
    var excellentImg = document.createElement('IMG');
    excellentImg.src = '../images/Trophy10.svg';
    excellentImg.alt = 'Trophy';
    var veryGoodImg = document.createElement('IMG');
    veryGoodImg.src = '../images/Trophy8Silver.svg';
    veryGoodImg.alt = 'Trophy';
    var goodImg = document.createElement('IMG');
    goodImg.src = '../images/Trophy11.svg';
    goodImg.alt = 'Trophy';
    var poorImg = document.createElement('IMG');
    poorImg.src = '../images/sadEmoji.svg';
    poorImg.alt = 'Trophy';
    var poorScore = document.createElement('H5');
    poorScore.innerHTML = "But unfortunately there's no trophy for you, you really need to do better next time.";

    function failedPercentage(failedQuestionsArrayLength, totalQuestions) {
        return (100 * failedQuestionsArrayLength) / totalQuestions;
    }
    function animationCssAndJsFunc() {
        // CREATE ANIMATION CSS
        var animationCssFile = document.createElement('link');
        animationCssFile.id = 'animationCssFile'
        animationCssFile.type = 'text/css';
        animationCssFile.href = '../style/bibleQuizAnimation.css';
        animationCssFile.rel = 'stylesheet';
        head.appendChild(animationCssFile);

        // CREATE ANIMATION JS
        var animationJsFile = document.createElement('script');
        animationJsFile.id = 'animationJsFile'
        animationJsFile.type = 'text/javascript';
        animationJsFile.src = '../script/victorScripts/QandAscriptsAnimation.js';
        body.appendChild(animationJsFile);
    }
    if (failedPercentage(failedQuestionsArrayLength, totalQuestions) == 0) {
        performance.innerHTML = 'Perfect Score';
        animationCssAndJsFunc();
        resultImgContainer.append(perfectImg);
        clapSound.play();
    } else if (failedPercentage(failedQuestionsArrayLength, totalQuestions) <= 20) {
        performance.innerHTML = 'Excellent Score';
        animationCssAndJsFunc();
        resultImgContainer.append(excellentImg);
        clapSound.play();
    } else if (failedPercentage(failedQuestionsArrayLength, totalQuestions) <= 40) {
        performance.innerHTML = 'Very Good Score';
        animationCssAndJsFunc();
        resultImgContainer.append(veryGoodImg);
        clapSound.play();
    } else if (failedPercentage(failedQuestionsArrayLength, totalQuestions) <= 60) {
        performance.innerHTML = 'Good Score';
        resultImgContainer.append(goodImg);
        clapSound.play();
     } else if (failedPercentage(failedQuestionsArrayLength, totalQuestions) <= 80) {
         performance.innerHTML = 'Poor Score';
         poorPerPopup.style.display = 'grid';
         openResultBtn.addEventListener('click', closePopup);
         function closePopup() {
             if (poorPerPopup.style.display == 'grid') {
                 poorPerPopup.style.display = 'none'
             }
         }
         resultImgContainer.append(poorScore);
         resultImgContainer.insertBefore(poorImg, poorScore);
        } else if (failedPercentage(failedQuestionsArrayLength, totalQuestions) <= 99.9 || failedPercentage(failedQuestionsArrayLength, totalQuestions) == 100) {
            performance.innerHTML = 'Very Poor Score';
            poorPerPopup.style.display = 'grid';
            openResultBtn.addEventListener('click', closePopup);
            function closePopup() {
                if (poorPerPopup.style.display == 'grid') {
                    poorPerPopup.style.display = 'none'
                }
            }
            resultImgContainer.append(poorScore);
            resultImgContainer.insertBefore(poorImg, poorScore);
        }
    
    // color selected options which are wrong wrongAnswerBackground
    if (!currentQuestionsOptions.getAttribute('confirmed')) {
        confirmButton.innerText = 'Next';
        greyOutOFF(nextquestionbutton);
        currentQuestion.querySelectorAll('.option').forEach(opt => {
            if (opt.style.background == optSelectedBackground) {
                optChildSpan = opt.querySelector('span.insertedSpan');
                optChildSpan.style.background = wrongAnswerBackground;
                optChildSpan.style.borderRight = rightBorder; //this indicates the option selected
                optChildSpan.style.color = 'white';
            }
            if ((opt.querySelector('UL')) && (!opt.querySelector('.explainButton')) && (opt.style.background == optSelectedBackground)) {
                explainButtonCreate(opt).addEventListener('click', showExplanation);
            }
        });
        // indicate correct options with 'lightGreen' color
        currentQuestion.querySelectorAll('STRONG').forEach(element => {
            var rightAnswer = isClickedElmOrParentAnOptionLI(element);
            optChildSpan = rightAnswer.querySelector('span.insertedSpan');
            optChildSpan.style.background = rightAnswerBackground;
            optChildSpan.style.color = 'white';
                if ((rightAnswer.querySelector('UL')) && (!rightAnswer.querySelector('.explainButton'))) {
                    explainButtonCreate(rightAnswer).addEventListener('click', showExplanation);
                }            
        });
        currentQuestionsOptions.setAttribute('confirmed', 'yes');
        if (!previousClickedULArray.includes(currentQuestionsOptions)) {
            previousClickedULArray.push(currentQuestionsOptions)
        }
        //To set whether a question was missed or not
        var continueChecking = 1;
        var rOw = null;
        if (currentQuestion.getAttribute('rightorwrong') == null) {
            var currentOptions = currentQuestion.querySelectorAll('.option');
            for (i = 0; i < currentOptions.length; i++) {
                var opt = currentOptions[i];
                optChildSpan = opt.querySelector('span.insertedSpan');
                // Check if any wrong option was selected or if the/any right option was not selected
                if (continueChecking) {
                    //check if any wrong option has been selected
                    if ((opt.querySelector('strong') == null) && (optChildSpan.style.borderRight == rightBorder)) {
                        currentQuestion.setAttribute('rightorwrong', 0);
                        failedQuestionsArray.push(currentQuestion);
                        passFailSequenceArray.push('fail');
                        rOw = 0;
                        continueChecking = 0; //stop checking if any wrong option has been selected
                        playWrongAnswerSound();
                    } else if (opt.querySelector('strong')) { // check if the or any (in case they are more than one) right option was not selected
                        if (optChildSpan.style.borderRight != rightBorder) {
                            currentQuestion.setAttribute('rightorwrong', 0);
                            failedQuestionsArray.push(currentQuestion);
                            passFailSequenceArray.push('fail');
                            rOw = 0;
                            continueChecking = 0; //stop checking if any wrong option has been selected
                            playWrongAnswerSound();
                        } else if (optChildSpan.style.borderRight == rightBorder) {
                            currentQuestion.setAttribute('rightorwrong', 1);
                            rOw = 1;
                            rightAnswerIcon();
                            //This doesn't stop the loop in case there is another correct option which was not selected
                        }
                    }
                }
                if ((i == currentOptions.length - 1) && (rOw == 1)) {
                    passedQuestionsArray.push(currentQuestion);
                    passFailSequenceArray.push('pass');
                    playRightAnswerSound();
                }
                if ((optChildSpan.style.background == rightAnswerBackground) && (optChildSpan.style.borderRight == rightBorder)) {
                    rightAnswerIcon();
                }
                if (optChildSpan.style.background == wrongAnswerBackground) {
                    wrongAnswerIcon();
                }
            }
        }
    }
    //RIGHT ANSWER ICON
    function rightAnswerIcon() {
        var img = new Image(23, 23);
        img.classList.add('imgSizeRight');
        img.src = "../images/correct-gif2.gif";
        if (!optChildSpan.querySelector('.imgSizeRight')) {
            optChildSpan.prepend(img);            
        }
    }
    //WRONG ANSWER ICON
    function wrongAnswerIcon() {
        var img = new Image(33, 33);
        img.classList.add('imgSizeWrong');
        img.src = "../images/wrong-gif6.gif";
        if (!optChildSpan.querySelector('.imgSizeWrong')) {
            optChildSpan.prepend(img);            
        }
    }
}
var actualClickedOption;
function isClickedLiAnAnswer(event) {
    var liClicked = event.target;
    //Check if UL has been clicked before or not, if not, add it to the clicked ULs so that it cannot be clicked again
    if ((!questionsArray.includes(liClicked.parentElement)) && (!currentQuestion.querySelector('UL').getAttribute('confirmed'))) { //Ensure it is not the question UL itself that is being clicked
        actualClickedOption = isClickedElmOrParentAnOptionLI(liClicked);
        var chancesLeft = actualClickedOption.parentElement.getAttribute('availablechances');
        var maxchances = actualClickedOption.parentElement.getAttribute('maxchances');
        var rightAnswer = null;
        var actualClickedOptionSpan;
        if ((chancesLeft > 0) && (actualClickedOption.style.background != optSelectedBackground)) { //it hasn't been clicked
            actualClickedOptionSpan = actualClickedOption.querySelector('span.insertedSpan');
            actualClickedOptionSpan.style.background = optSelectedBackground;
            actualClickedOption.style.background = optSelectedBackground;
            confirmButton.style.background = '#fb6340';
            confirmButton.style.border = '#fb6340';
            actualClickedOption.parentElement.setAttribute('availablechances', chancesLeft - 1);

            if (!previousClickedULArray.includes(this)) {
                previousClickedULArray.push(this);
                if (previousClickedULArray.length == questionsArray.length) {
                    // show the "Quiz Result" li/button after the last Question has been answered;
                    // quizResult = document.getElementById("quizResult").innerHTML = "Quiz Result";
                    // quizResult.style.display = "block";

                }
            }

        } else if ((chancesLeft < maxchances) && (actualClickedOption.style.background == optSelectedBackground)) { //it has been clicked
            actualClickedOptionSpan = actualClickedOption.querySelector('span.insertedSpan');
            actualClickedOptionSpan.style.background = '';
            actualClickedOption.style.background = '';
            chancesLeft = Number(chancesLeft) + 1
            actualClickedOption.parentElement.setAttribute('availablechances', chancesLeft);
            if (chancesLeft == maxchances) {
                if (previousClickedULArray.includes(this)) {
                    previousClickedULArray.splice(previousClickedULArray.indexOf(this), 2);
                }
            }
        }
    }
    clickSound.play();
}
//TO SHOW QUESTION HINT
var showHint;
var closeHint = document.createElement("SPAN");
closeHint.classList.add('closeHint');
closeHint.addEventListener('click', closeHintFunc);

function showHintFunc() {
   showHint = currentQuestion.querySelector("EM");
    showHint.classList.toggle("showHintCSS");
    showHintSound.play();
    showHint.prepend(closeHint);
}
//TO HIDE QUESTION HINT
function closeHintFunc() {
    if (showHint.classList.contains("showHintCSS")) {
        showHint.classList.remove("showHintCSS")
    }
    clickSound.play(); 
    closeHintSound.play();
}
//CLICK ANYWHERE TO CLOSE HINT
document.addEventListener('mouseup', function(e) {
    var container = showHint;
    if (!container.contains(e.target)) {
        if (container.classList.contains("showHintCSS")) {
            container.classList.remove("showHintCSS")
            clickSound.play();
            closeHintSound.play();
        }
    }
});
var settingsContent;
var settingsReviewContent;
var rulesContent;
var closeSettings = document.createElement("SPAN");
closeSettings.classList.add('closeSettings');
closeSettings.addEventListener('click', closeSettingsFunc);
var closeSettingsReview = document.createElement("SPAN");
closeSettingsReview.classList.add('closeSettings');
closeSettingsReview.addEventListener('click', closeSettingsReviewFunc);
var closeRules = document.createElement("SPAN");
closeRules.classList.add('closeSettings');
closeRules.addEventListener('click', closeRulesFunc);

//TO SHOW SETTINGS AND RULES
function showSettings() {
    settingsContent = document.getElementById("settingsContent");
    settingsContent.classList.toggle("show");
    showHintSound.play();
    settingsContent.prepend(closeSettings);
}
function showSettingsReview() {
    settingsReviewContent = document.getElementById("settingsReviewContent");
    settingsReviewContent.classList.toggle("show");
    showHintSound.play();
    settingsReviewContent.prepend(closeSettingsReview);
}
function showRules() {
    rulesContent = document.getElementById("rulesContent");
    rulesContent.classList.toggle("show");
    showHintSound.play();
    rulesContent.prepend(closeRules);
}
//TO HIDE SETTINGS AND RULES
function closeSettingsFunc() {
    if (settingsContent.classList.contains("show")) {
        settingsContent.classList.remove("show");
    }
    clickSound.play(); 
    closeHintSound.play();
}
function closeSettingsReviewFunc() {
    if (settingsReviewContent.classList.contains("show")) {
        settingsReviewContent.classList.remove("show");
    }
    clickSound.play(); 
    closeHintSound.play();
}
function closeRulesFunc() {
    if (rulesContent.classList.contains("show")) {
        rulesContent.classList.remove("show");
    }
    clickSound.play(); 
    closeHintSound.play();
}
//CLICK ANYWHERE TO CLOSE SETTINGS
document.addEventListener('mouseup', function(e) {
    var settingsContentContainer = document.getElementById("settingsContent");
        if (!settingsContentContainer.contains(e.target)) {
            if (settingsContentContainer.classList.contains("show")) {
                settingsContentContainer.classList.remove("show");
                clickSound.play();
                closeHintSound.play();
            }
        }
});
document.addEventListener('mouseup', function(e) {
    var settingsReviewContentContainer = document.getElementById("settingsReviewContent");
        if (!settingsReviewContentContainer.contains(e.target)) {
            if (settingsReviewContentContainer.classList.contains("show")) {
                settingsReviewContentContainer.classList.remove("show");
                clickSound.play();
                closeHintSound.play();
            }
        }
});
//TO SHOW EXPLANATION
function showExplanation() {
    const explainUl = this.parentNode.parentNode.querySelector('UL');
    explainUl.classList.toggle("show");
    explainUl.classList.add("explainUl");
    this.parentNode.parentNode.classList.toggle("removeMaxHeight");
    if (explainUl.classList.contains("show")) {
        this.parentNode.appendChild(explainUl);
    }
}
//TO CREATE AN EXPLANATION BUTTON
function explainButtonCreate(opt) {
    var explainButton = document.createElement("BUTTON");
    explainButton.classList.add('explainButton');
    explainButton.innerText = 'Explanation';
    // 'answer' represents clicked correct answer
    const answerSpan = opt.querySelector('span.insertedSpan');
    answerSpan.append(explainButton);
    // opt.append(explainButton);
    return explainButton;
}
function explainButtonCreate(answer) {
    var explainButton = document.createElement("BUTTON");
    explainButton.classList.add('explainButton');
    explainButton.innerText = 'Explanation';
    // 'answer' represents clicked correct answer
    const answerSpan = answer.querySelector('span.insertedSpan');
    answerSpan.append(explainButton);
    // answer.append(explainButton);
    return explainButton;
}
function showAllQuestionsWithAnswers() {
    var questionUL = document.querySelector('.QandA-Board>OL');
    var displayAllQuestions = questionUL.cloneNode(true);
    // var details = document.createElement('details');
    // var questionLI = document.querySelector('.QandA-Board>OL>LI');
    // details.append(questionLI);
    // var questionDIV = document.querySelector('.QandA-Board>OL>LI>DIV');
    // questionDIV.classList.add('collapsible');
    // questionDIV.nextElementSibling.classList.add('content');
    var liFirstLevel = displayAllQuestions.querySelectorAll('LI:not(.option):not(.option li)');

    displayAllQuestions.querySelectorAll('.explainButton').forEach(elm =>{elm.remove()})

    liFirstLevel.forEach(element => {
        element.style.display = ''; //removes display none from all LI (both parents and descendant LIs)
        // if ((!element.parentElement.classList.contains('option'))&&(element.querySelector('em'))) {
        if ((emph = element.querySelector('em'))&&(emph.parentElement.querySelector('.option'))) {
            element.querySelector('em').style.display = 'none';
        }
    });
    var optClone = displayAllQuestions.querySelectorAll('.option');
    for (k = 0; k < optClone.length; k++) {
        var optSpanClone = optClone[k].querySelector('span.insertedSpan');
        var optImgClone = optSpanClone.querySelectorAll('img');
        var optExplainClone = optClone[k].querySelector('ul');
        // Iterate through each img element and remove it
        optImgClone.forEach(function(img) {
            img.remove();
        });
        optClone[k].style.border = 'none';
        optSpanClone.style.border = 'none';
        optSpanClone.style.removeProperty('color');
        if ((optSpanClone.style.background != rightAnswerBackground)) { //find all wrong options to display none them (correct options have green background)
            optSpanClone.parentElement.style.display = 'none'; //display none all options LIs that are wrong options (their backgroundColor != rightAnswerBackground) 
        }
        optClone[k].style.background = ''//remove all backgroundcolors
        optSpanClone.style.background = ''//remove all backgroundcolors
        optSpanClone.classList.remove('insertedSpan'); 
        if (optExplainClone) {
            optSpanClone.appendChild(optExplainClone);
        }
    }
    // document.getElementsByClassName('corAnswers-Board').append(details);
    liFirstLevel.forEach(element => {
        element.style.backgroundColor = '';
        var removeinsertedDivClass = element.querySelector('.insertedDiv');
        removeinsertedDivClass.classList.remove('insertedDiv'); 
        var removeinsertedDivInnerClass = element.querySelector('.insertedDivInner');
        removeinsertedDivInnerClass.classList.remove('insertedDivInner');
        var details = document.createElement('details');
        var questionOL = element.parentElement;
        questionOL.append(details);
        details.append(element);
        var summary = document.createElement('summary');
        summary.append(removeinsertedDivClass);
        details.prepend(summary);
        var questionDIV = document.querySelector('.QandA-Board>OL>LI>DIV');
        questionDIV.classList.add('collapsible');
        questionDIV.nextElementSibling.classList.add('content');
        // removeinsertedDivClass.classList.add('collapsible');
        // removeinsertedDivClass.nextElementSibling.classList.add('content');
    });
    qandAsection.style.display = 'none';
    resultSection.style.display = 'none';
    document.getElementsByClassName('corAnswers-Board')[0].append(displayAllQuestions);
    CorrectedAnswersSection.style.display = 'grid';
    resultSound.play();
}
//SOUND
var wrongAnswerSound = new Audio("../audio/wrongAnswerSound2.mp3");
var rightAnswerSound = new Audio("../audio/rightAnswerSound2.mp3");
var showHintSound = new Audio("../audio/showHintSound3.wav");
var closeHintSound = new Audio("../audio/closeHintSound.wav");
var clickSound = new Audio("../audio/clickSound.mp3");
var clapSound = new Audio("../audio/clapSound.wav");
clapSound.volume = 0.2;
var buttons = document.querySelectorAll("BUTTON");
var links = document.querySelectorAll("A");

//RIGHT ANSWER SOUND
function playRightAnswerSound() {
    rightAnswerSound.play();
}
//WRONG ANSWER SOUND
function playWrongAnswerSound() {
    wrongAnswerSound.play();
}
//SHOW HINT SOUND
function playShowHintSound() {
    showHintSound.play();
}
//CLOSE HINT SOUND
function playCloseHintSound() {
    closeHintSound.play();
}
//BUTTONS CLICK SOUND
buttons.forEach(button => {
  button.addEventListener("click", () => {
    clickSound.play();
  });
});
function buttonsClickSound() {
    clickSound.play();
}
//LINKS CLICK SOUND
links.forEach(a => {
    a.addEventListener("click", () => {
        clickSound.play();
    });
  });

const buttonPause = document.querySelector("#pauseButton");
const buttonPlay = document.querySelector("#playButton");
const buttonPauseFromResult = document.querySelector("#pauseButtonFromResult");
const buttonPlayFromResult = document.querySelector("#playButtonFromResult");
const icon = document.querySelector("#pauseAndPlayButton > i");
const audioElement = document.querySelector("audio");
const quizBgSound = document.getElementById("quizBgSound");
const letsStart = document.getElementById("letsStart");
// const resultSound = document.getElementById("resultSound");
const resultSound = new Audio("../audio/categorySound.mp3");
resultSound.volume = 0.2;
resultSound.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

buttonPause.addEventListener('click', bgSoundPauseButton);
buttonPlay.addEventListener('click', bgSoundPlayButton);
buttonPauseFromResult.addEventListener('click', bgSoundPauseButtonFromResult);
buttonPlayFromResult.addEventListener('click', bgSoundPlayButtonFromResult);

window.addEventListener("DOMContentLoaded", () => {
    quizBgSound.volume = 0.2;
    quizBgSound.play();
    letsStart.volume = 0.1;
    letsStart.play();
});
function bgSoundPauseButton() {
    if (quizBgSound.play()){
        quizBgSound.pause();
        buttonPause.style.opacity = '0.3';
        buttonPlay.style.opacity = '1';
    } 
}
function bgSoundPlayButton() {
    if (quizBgSound.paused){
        quizBgSound.play();
        if (buttonPlay.style.opacity == '1') {
            buttonPlay.style.opacity = '0.3';
        }
        if (buttonPause.style.opacity == '0.3') {
            buttonPause.style.opacity = '1'
        }
    }
}
function bgSoundPauseButtonFromResult() {
    if (resultSound.play()){
        resultSound.pause();
        buttonPauseFromResult.style.opacity = '0.3';
        buttonPlayFromResult.style.opacity = '1';
    } 
}
function bgSoundPlayButtonFromResult() {
    if (resultSound.paused){
        resultSound.play();
        if (buttonPlayFromResult.style.opacity == '1') {
            buttonPlayFromResult.style.opacity = '0.3';
        }
        if (buttonPauseFromResult.style.opacity == '0.3') {
            buttonPauseFromResult.style.opacity = '1'
        }
    }
}