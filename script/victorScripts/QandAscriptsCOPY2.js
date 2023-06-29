// "use strict";
// Script for the Toggling between Questions and Question count

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
var questionsArray = [];
var passFailSequenceArray = [];
var passedQuestionsArray = [];
var failedQuestionsArray = [];
var previousClickedULArray = [];
var clickedOptionsArray = [];
var confirmButtonHasBeenClicked;
var notLastQuestion = 1;
var rightBorder = '3px solid brown';
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
    questions[i].setAttribute('qid', i + 1);
    var chances = questions[i].querySelectorAll('LI > STRONG').length;
    questions[i].querySelectorAll('UL')[0].setAttribute('availablechances', chances); //Create availableChances atribute to count number of answers to a question. These will be the number of clicks possible
    questions[i].querySelectorAll('UL')[0].setAttribute('maxchances', chances); //Create availableChances atribute to count number of answers to a question. These will be the number of clicks possible
    
    var parentElementLI = questions[i];
    var parentElementLINowDiv = parentElementLI.firstChild;
    var parentElmTextNode = parentElementLINowDiv.textContent.replace(/(\((.*)\)[\s\n\r]*)/,'<p>$2</p>');
    parentElementLINowDiv.remove();
    var createDIV = document.createElement("div");
    createDIV.innerHTML = parentElmTextNode;
    if(pIn_createDIV = createDIV.querySelector('p')){
    parentElementLI.prepend(pIn_createDIV)}
    createDIV.classList.add('insertedDIV');
    parentElementLI.prepend(createDIV)

    var allOptionsUnderQuestion = document.querySelectorAll('.QandA-Board>OL>LI>UL>LI');
    allOptionsUnderQuestion.forEach(element => {
        element.classList.add('option');
    });
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
// function noPtagSshowNewCatFunc() {
//     var parentElementOL = document.querySelector('.showNewCatCSS');
//     console.log(parentElementOL);
//     var parentElementLI = currentQuestion;
//     var showNewCatPrevious = currentQuestion.previousElementSibling.querySelector('p');
//     console.log(showNewCatPrevious);
//     var showNewCat = currentQuestion.querySelector('p');
//     if (!showNewCat) {
//         let clone = showNewCatPrevious.cloneNode(true);
//         parentElementLI.prepend(clone);
//         showNewCatPrevious.remove();
//         // alert('does not exist!');
//     }
// }
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
                    indexSpan.style.color = 'green';                    
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
    var poorScore = document.createElement('H3');
    poorScore.innerHTML = 'No trophy for you, you really need to do better.';
    function failedPercentage(failedQuestionsArrayLength, totalQuestions) {
        return (100 * failedQuestionsArrayLength) / totalQuestions;
    }
    if (failedPercentage(failedQuestionsArrayLength, totalQuestions) == 0) {
        performance.innerHTML = 'Perfect Score';
        // resultImgContainer.insertBefore(perfectImg, quizCmlpt);
        resultImgContainer.append(perfectImg);
        clapSound.play();
    } else if (failedPercentage(failedQuestionsArrayLength, totalQuestions) <= 20) {
        performance.innerHTML = 'Excellent Score';
        // resultImgContainer.insertBefore(excellentImg, quizCmlpt);
        resultImgContainer.append(excellentImg);
        clapSound.play();
    } else if (failedPercentage(failedQuestionsArrayLength, totalQuestions) <= 40) {
        performance.innerHTML = 'Very Good Score';
        // resultImgContainer.insertBefore(veryGoodImg, quizCmlpt);
        resultImgContainer.append(veryGoodImg);
        clapSound.play();
    } else if (failedPercentage(failedQuestionsArrayLength, totalQuestions) <= 60) {
        performance.innerHTML = 'Good Score';
        // resultImgContainer.insertBefore(goodImg, quizCmlpt);
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
        //  resultImgContainer.insertBefore(poorScore, quizCmlpt);
         resultImgContainer.append(poorScore);
        //  reviewBtn.innerHTML = 'Review Quiz >';
        //  reviewBtn.removeAttribute('onclick');
        //  newBtn.innerHTML = 'New Quiz >';
        //  reviewBtn.addEventListener('click', alertFunc);
        //  newBtn.addEventListener('click', alertFunc);
        //  function alertFunc() {
        //      poorPerPopup.style.display = 'block';
        //      playWrongAnswerSound(); 
        //      // alert('Your score is not good, please Redo Quiz.');
        //     }
        } else if (failedPercentage(failedQuestionsArrayLength, totalQuestions) <= 99.9 || failedPercentage(failedQuestionsArrayLength, totalQuestions) == 100) {
            performance.innerHTML = 'Very Poor Score';
            poorPerPopup.style.display = 'grid';
            openResultBtn.addEventListener('click', closePopup);
            function closePopup() {
                if (poorPerPopup.style.display == 'grid') {
                    poorPerPopup.style.display = 'none'
                }
            }
            // resultImgContainer.insertBefore(poorScore, quizCmlpt);
            resultImgContainer.append(poorScore);
            // reviewBtn.innerHTML = 'Review Quiz >';
            // reviewBtn.removeAttribute('onclick');
            // newBtn.innerHTML = 'New Quiz >';
            // reviewBtn.addEventListener('click', alertFunc);
            // newBtn.addEventListener('click', alertFunc);
            // function alertFunc() {
                // poorPerPopup.style.display = 'block';
                // playWrongAnswerSound();
                // // style.opacity = '0.6';
                // // alert('Your score is not good, please Redo Quiz.');
                // }
    }
    
    // color selected options which are wrong 'pink'
    if (!currentQuestionsOptions.getAttribute('confirmed')) {
        confirmButton.innerText = 'Next';
        greyOutOFF(nextquestionbutton);
        currentQuestion.querySelectorAll('.option').forEach(opt => {
            if (opt.style.backgroundColor == 'orange') {
                opt.style.backgroundColor = 'pink';
                opt.style.borderRight = rightBorder; //this indicates the option selected
                if ((opt.querySelector('UL')) && (!opt.querySelector('.explainButton'))) {
                    explainButtonCreate(opt).addEventListener('click', showExplanation);
                }
            }
        });
        // indicate correct options with 'lightGreen' color
        currentQuestion.querySelectorAll('STRONG').forEach(element => {
            var rightAnswer = isClickedElmOrParentAnOptionLI(element);
            if (rightAnswer.style.borderRight == rightBorder) {
                rightAnswer.style.backgroundColor = 'green';
                rightAnswer.style.color = 'white';
            }
                if ((rightAnswer.querySelector('UL')) && (!rightAnswer.querySelector('.explainButton'))) {
                    explainButtonCreate(rightAnswer).addEventListener('click', showExplanation);
                }            
        });
    
        currentQuestionsOptions.setAttribute('confirmed', 'yes');
        if (!previousClickedULArray.includes(currentQuestionsOptions)) {
            previousClickedULArray.push(currentQuestionsOptions)
        }

        //To set whether a question was missed or not
        var contnueChecking = 1;
        var rOw = null;
        if (currentQuestion.getAttribute('rightorwrong') == null) {
            var currentOptions = currentQuestion.querySelectorAll('.option');
            for (i = 0; i < currentOptions.length; i++) {
                var opt = currentOptions[i];
                // Check if any wrong option was selected or if the/any right option was not selected
                if (contnueChecking) {
                    //check if any wrong option has been selected
                    if ((opt.querySelector('strong') == null) && (opt.style.borderRight == rightBorder)) {
                        currentQuestion.setAttribute('rightorwrong', 0);
                        failedQuestionsArray.push(currentQuestion);
                        passFailSequenceArray.push('fail');
                        rOw = 0;
                        contnueChecking = 0; //stop checking if any wrong option has been selected
                        playWrongAnswerSound();
                    } else if (opt.querySelector('strong')) { // check if the or any (in case they are more than one) right option was not selected
                        if (opt.style.borderRight != rightBorder) {
                            currentQuestion.setAttribute('rightorwrong', 0);
                            failedQuestionsArray.push(currentQuestion);
                            passFailSequenceArray.push('fail');
                            rOw = 0;
                            contnueChecking = 0; //stop checking if any wrong option has been selected
                            playWrongAnswerSound();
                        } else if (opt.style.borderRight == rightBorder) {
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
                if ((opt.style.backgroundColor == 'green') && (opt.style.borderRight == rightBorder)) {
                    rightAnswerIcon();
                }
                if (opt.style.backgroundColor == 'pink') {
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
        opt.prepend(img);
    }
    //WRONG ANSWER ICON
    function wrongAnswerIcon() {
        var img = new Image(33, 33);
        img.classList.add('imgSizeWrong');
        img.src = "../images/wrong-gif3.gif";
        opt.prepend(img);
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
        if ((chancesLeft > 0) && (actualClickedOption.style.backgroundColor != 'orange')) { //it hasn't been clicked
            actualClickedOption.style.backgroundColor = 'orange';
            confirmButton.style.backgroundColor = '#fb6340';
            confirmButton.style.border = '#fb6340';
            actualClickedOption.parentElement.setAttribute('availablechances', chancesLeft - 1);

            if (!previousClickedULArray.includes(this)) {
                previousClickedULArray.push(this);
                if (previousClickedULArray.length == questionsArray.length) {
                    // show the "Quiz Result" li/button after the last Question has been answered;
                    quizResult = document.getElementById("quizResult").innerHTML = "Quiz Result";
                    // quizResult.style.display = "block";

                }
            }

        } else if ((chancesLeft < maxchances) && (actualClickedOption.style.backgroundColor == 'orange')) { //it has been clicked
            actualClickedOption.style.backgroundColor = '';
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
closeHint.innerText = 'x';
closeHint.addEventListener('click', closeHintFunc);

function showHintFunc() {
   showHint = currentQuestion.querySelector("EM");
    showHint.classList.toggle("showHintCSS");
    showHintSound.play();
    showHint.prepend(closeHint);
}
//TO HIDE QUESTION HINT
function closeHintFunc() {
    if (showHint.className == "showHintCSS") {
        showHint.className = "";
      }
      clickSound.play(); 
      closeHintSound.play();
}
//CLICK ANYWHERE TO CLOSE HINT
document.addEventListener('mouseup', function(e) {
    var container = showHint;
    if (!container.contains(e.target)) {
        if (container.className == "showHintCSS") {
            container.className = "";
            closeHintSound.play();
            clickSound.play();
          }
        }
});
var settingsContent;
var rulesContent;
var closeSettings = document.createElement("SPAN");
closeSettings.classList.add('closeSettings');
closeSettings.innerText = 'x';
closeSettings.addEventListener('click', closeSettingsFunc);
var closeRules = document.createElement("SPAN");
closeRules.classList.add('closeSettings');
closeRules.innerText = 'x';
closeRules.addEventListener('click', closeRulesFunc);

//TO SHOW SETTINGS AND RULES
function showSettings() {
    settingsContent = document.getElementById("settingsContent");
    settingsContent.classList.toggle("show");
    showHintSound.play();
    settingsContent.prepend(closeSettings);
}
function showRules() {
    rulesContent = document.getElementById("rulesContent");
    rulesContent.classList.toggle("show");
    showHintSound.play();
    rulesContent.prepend(closeRules);
}
//TO HIDE SETTINGS AND RULES
function closeSettingsFunc() {
    if (settingsContent.className == "show") {
        settingsContent.className = "";
      }
      clickSound.play(); 
      closeHintSound.play();
}
function closeRulesFunc() {
    if (rulesContent.className == "show") {
        rulesContent.className = "";
      }
      clickSound.play(); 
      closeHintSound.play();
}
//CLICK ANYWHERE TO CLOSE SETTINGS
document.addEventListener('mouseup', function(e) {
    var container = document.getElementById("settingsContent");
    if (!container.contains(e.target)) {
        if (container.className == "show") {
            container.className = "";
            closeHintSound.play();
            clickSound.play();
          }
        }
});
//TO SHOW EXPLANATION
function showExplanation() {
    this.parentNode.querySelector('UL').classList.toggle("show");
    this.parentNode.classList.toggle("removeMaxHeight");
}
//TO CREATE AN EXPLANATION BUTTON
function explainButtonCreate(opt) {
    var explainButton = document.createElement("BUTTON");
    explainButton.classList.add('explainButton');
    explainButton.innerText = 'Explanation';
    // 'answer' represents clicked correct answer
    opt.append(explainButton);
    return explainButton;
}
function explainButtonCreate(answer) {
    var explainButton = document.createElement("BUTTON");
    explainButton.classList.add('explainButton');
    explainButton.innerText = 'Explanation';
    // 'answer' represents clicked correct answer
    answer.append(explainButton);
    return explainButton;
}
function showAllQuestionsWithAnswers() {
    var questionUL = document.querySelector('.QandA-Board>OL')
    var displayAllQuestions = questionUL.cloneNode(true);
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
        optClone[k].style.border = 'none';
        if ((optClone[k].style.backgroundColor != 'green')) { //find all wrong options to display none them (correct options have lightGreen background)
            optClone[k].style.display = 'none'; //display none all options LIs that are wrong options (their backgroundColor != 'lightgreen') 
        }
        optClone[k].style.backgroundColor = ''//remove all backgroundcolors
        // // var parentOfIMG = optClone[k].querySelectorAll('.option');
        // removeIMG = optClone[k].querySelectorAll('IMG');
        // console.log(removeIMG);
        // // parentOfIMG.removeChild(removeIMG);
        // // removeIMG = [];
        // // removeIMG.length = 0;
        // removeIMG.splice(0,removeIMG.length);
    }
    liFirstLevel.forEach(element => {
        element.style.backgroundColor = '';
        var removeClass = element.querySelector('.insertedDIV');
        removeClass.classList.remove('insertedDIV'); 
    });
    qandAsection.style.display = 'none';
    resultSection.style.display = 'none';
    document.getElementsByClassName('corAnswers-Board')[0].append(displayAllQuestions);
    CorrectedAnswersSection.style.display = 'grid';
    resultSound.play();
}
// redoQuiz.addEventListener('click', redoQuizFunc);
// function redoQuizFunc() {
//     document.querySelectorAll('li').forEach(element => {
//         element.removeAttribute('style');
//     });
//     document.querySelectorAll('.QandA-Board>ol>li').forEach((element,i) => {
//         if(i>0){
//             element.style.display = 'none'
//             questionIndex();
//         }
//     });
//     document.querySelectorAll('.explainButton, .imgSizeRight, .imgSizeWrong').forEach(element => {
//         element.remove();
//     });
//     document.querySelectorAll('[availablechances]').forEach(element => {
//         element.setAttribute('availablechances', element.getAttribute('maxchances'));
//         element.removeAttribute('confirmed');
//     });
//     resultSection.style.display = 'none';
//     CorrectedAnswersSection.style.display = 'none';
// }

//PAGE PRELOAD
setTimeout(function() {
    $('.loader-bg').fadeToggle();
}, 1500);

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

window.addEventListener("DOMContentLoaded", () => {
    quizBgSound.volume = 0.2;
    quizBgSound.play();
    letsStart.volume = 0.1;
    letsStart.play();
    getDarkOrLightModeFROMCache();
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

// FOR TOGGLING THEMES
var head = document.head;
var antiqueWhiteCssFile;
var blackPearlCssFile;
var crimsonCssFile;
var darkCyanCssFile;
var darkPurpleCssFile;

darkPurpleCssFile = document.getElementById('darkPurpleCssFile');
var antiqueWhiteThemeBtn = document.getElementById('antiqueWhite');
antiqueWhiteThemeBtn.addEventListener('click', changeToAntiquewhiteTheme);
var blackPearlThemeBtn = document.getElementById('blackPearl');
blackPearlThemeBtn.addEventListener('click', changeToBlackPearlTheme);
var crisomThemeBtn = document.getElementById('crimson');
crisomThemeBtn.addEventListener('click', changeToCrimsonTheme);
var darkCyanThemeBtn = document.getElementById('darkCyan');
darkCyanThemeBtn.addEventListener('click', changeToDarkCyanTheme);
var darkPurpleThemeBtn = document.getElementById('darkPurple');
darkPurpleThemeBtn.addEventListener('click', changeToDarkPurpleTheme);

function setDarkOrLightModeInCache(colorMode){
    localStorage.setItem('colorMode', colorMode)
}
function getDarkOrLightModeFROMCache(){
    if(colorMode = localStorage.getItem('colorMode')){
        if(colorMode=='DarkPurpleTheme'){changeToDarkPurpleTheme()}
        else if(colorMode=='BlackPearlTheme'){changeToBlackPearlTheme()}
        else if(colorMode=='CrimsonTheme'){changeToCrimsonTheme()}
        else if(colorMode=='DarkCyanTheme'){changeToDarkCyanTheme()}
        else if(colorMode=='AntiquewhiteTheme'){changeToAntiquewhiteTheme()}
    } else {changeToDarkPurpleTheme()}
}
function changeToAntiquewhiteTheme() {
    setDarkOrLightModeInCache('AntiquewhiteTheme')
    antiqueWhiteCssFile = document.createElement('link');
    antiqueWhiteCssFile.id = 'antiqueWhiteCssFile"'
    antiqueWhiteCssFile.type = 'text/css';
    antiqueWhiteCssFile.href = '../style/bibleQuizBG-antiquewhite.css';
    antiqueWhiteCssFile.rel = 'stylesheet';
    head.appendChild(antiqueWhiteCssFile);
    blackPearlCssFile.remove();
    crimsonCssFile.remove();
    darkCyanCssFile.remove();
    darkPurpleCssFile.remove();
}
function changeToBlackPearlTheme() {
    setDarkOrLightModeInCache('BlackPearlTheme')
    blackPearlCssFile = document.createElement('link');
    blackPearlCssFile.id = 'blackPearlCssFile"'
    blackPearlCssFile.type = 'text/css';
    blackPearlCssFile.href = '../style/bibleQuizBG-blackpearl.css';
    blackPearlCssFile.rel = 'stylesheet';
    head.appendChild(blackPearlCssFile);
    antiqueWhiteCssFile.remove();
    crimsonCssFile.remove();
    darkCyanCssFile.remove();
    darkPurpleCssFile.remove();
}
function changeToCrimsonTheme() {
    setDarkOrLightModeInCache('CrimsonTheme')
    crimsonCssFile = document.createElement('link');
    crimsonCssFile.id = 'crimsonCssFile"'
    crimsonCssFile.type = 'text/css';
    crimsonCssFile.href = '../style/bibleQuizBG-crimson.css';
    crimsonCssFile.rel = 'stylesheet';
    head.appendChild(crimsonCssFile);
    antiqueWhiteCssFile.remove();
    blackPearlCssFile.remove();
    darkCyanCssFile.remove();
    darkPurpleCssFile.remove();
}
function changeToDarkCyanTheme() {
    setDarkOrLightModeInCache('DarkCyanTheme')
    darkCyanCssFile = document.createElement('link');
    darkCyanCssFile.id = 'darkCyanCssFile"'
    darkCyanCssFile.type = 'text/css';
    darkCyanCssFile.href = '../style/bibleQuizBG-darkcyan.css';
    darkCyanCssFile.rel = 'stylesheet';
    head.appendChild(darkCyanCssFile);
    antiqueWhiteCssFile.remove();
    blackPearlCssFile.remove();
    crimsonCssFile.remove();
    darkPurpleCssFile.remove();
}
function changeToDarkPurpleTheme() {
    setDarkOrLightModeInCache('DarkPurpleTheme')
    head.appendChild(darkPurpleCssFile);
    antiqueWhiteCssFile.remove();
    blackPearlCssFile.remove();
    crimsonCssFile.remove();
    darkCyanCssFile.remove();
}