//Script for the Toggling between Questions and Question count

var questions = document.getElementsByTagName('ol')[0].children;
var resultSection = document.getElementById('quizResult-section');
var qandAsection = document.getElementById('QandA-section');
var redoQuiz = document.getElementById('redoQuizButton');
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
var scoreCorrect = document.getElementById('scoreCorrect');
var scoreMissed = document.getElementById('scoreMissed');
var totalQuestions = questions.length;
var currentQuestionIndex;
var currentQuestion;
var nextQuestion;
var previousQuestion = questions[0]; //the first question is the initial previousQuestion
var questionsArray = [];
var passFailSequenceArray = [];
var passedQuestionsArray = [];
var failedQuestionsArray = [];
// var questionsArray = [];
var previousClickedULArray = [];
var clickedOptionsArray = [];
var confirmButtonHasBeenClicked;
var notLastQuestion = 1;
var leftBorder = '5px solid black';
var modal = document.getElementById('completeQuiz');

var slideIndex = 1;
showNextOrPrevQuestion(slideIndex);

function plusDivs(n) {
    showNextOrPrevQuestion(slideIndex += n);
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
    // var allOptionsUnderQuestion = questions[i].querySelectorAll('UL>LI');
    var allOptionsUnderQuestion = document.querySelectorAll('.QandA-Board>OL>LI>UL>LI');
    allOptionsUnderQuestion.forEach(element => {
        element.classList.add('option')
    });

    questions[i].querySelector('UL').addEventListener('click', isClickedLiAnAnswer);
    questionsArray.push(questions[i]);
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
    previousQuestion = currentQuestion;
    questionIndex();
    if ((emph = currentQuestion.querySelector('em')) && (emph.parentElement == currentQuestion)) {
        greyOutOFF(questionhint)
    } else {
        greyOutON(questionhint)
    }

    if (n == 2) {
        greyOutOFF(prevquestionbutton);
    } else if (n == 1) {
        console.log('Jesus')
        greyOutON(prevquestionbutton);
        if ((emph = currentQuestion.querySelector('em')) && (emph.parentElement == currentQuestion)) {
            greyOutOFF(questionhint)
        } else {
            greyOutON(questionhint)
        }
    }

}

function questionIndex() {
    var questionCount = document.getElementById("questioncount");
    currentQuestionIndex = slideIndex;
    questionCount.innerHTML = currentQuestionIndex + "/" + totalQuestions;
}

function isClickedElmOrParentAnOptionLI(c) {
    var cp = c.parentElement;
    var cli = null;
    if ((c.tagName == 'LI') && (c.classList.contains('option'))) {
        cli = c;
        return c
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
            // show the "Quiz Result" li/button after the last Question has benn answered;
            if (currentQuestionIndex == totalQuestions) {
                document.getElementById("quizResult").innerHTML = "Quiz Result";
                confirmButton.style.pointerEvents = 'none';
            }
            plusDivs(1);
        } else {
            qandAsection.style.display = "none";
            resultSection.style.display = "block";
            scoreCorrect.innerText = passedQuestionsArray.length + '/' + questionsArray.length;
            scoreMissed.innerText = failedQuestionsArray.length + '/' + questionsArray.length;
            // questionsIndex
            for (k = 0; k < passFailSequenceArray.length; k++) {
                var pf = passFailSequenceArray[k];
                var indexSpan = document.createElement('SPAN');
                //set the color of the span elelement to indicate the failed or passed
                if (pf == 'fail') {
                    indexSpan.style.color = 'red';
                } else if (pf == 'pass') {
                    indexSpan.style.color = 'green';
                }
                //append the span elekent to the questionIndex
                if (k < passFailSequenceArray.length - 1) {
                    indexSpan.innerText = k + 1 + ' ';
                    questionsIndex.append(indexSpan);
                } else if (k == passFailSequenceArray.length - 1) {
                    indexSpan.innerText = k + 1;
                    questionsIndex.append(indexSpan);
                }
            }

        }
    }
    // color selected options which are wrong 'pink'
    if (!currentQuestionsOptions.getAttribute('confirmed')) {
        confirmButton.innerText = 'Next';
        greyOutOFF(nextquestionbutton);
        currentQuestion.querySelectorAll('.option').forEach(opt => {
            if (opt.style.backgroundColor == 'yellow') {
                opt.style.backgroundColor = 'pink';
                opt.style.borderLeft = leftBorder; //this indicates the option selected
            }
        });
        // indicate correct options with 'lightGreen' color
        currentQuestion.querySelectorAll('STRONG').forEach(element => {
            const rightAnswer = isClickedElmOrParentAnOptionLI(element);
            rightAnswer.style.backgroundColor = 'lightgreen';
            // rightAnswer.click();
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
                    if ((opt.querySelector('strong') == null) && (opt.style.borderLeft == leftBorder)) {
                        currentQuestion.setAttribute('rightorwrong', 0);
                        failedQuestionsArray.push(currentQuestion);
                        passFailSequenceArray.push('fail');
                        rOw = 0;
                        contnueChecking = 0; //stop checking if any wrong option has been selected
                    } else if (opt.querySelector('strong')) { // check if the or any (in case they are more than one) right option was not selected
                        if (opt.style.borderLeft != leftBorder) {
                            currentQuestion.setAttribute('rightorwrong', 0);
                            failedQuestionsArray.push(currentQuestion);
                            passFailSequenceArray.push('fail');
                            rOw = 0;
                            contnueChecking = 0; //stop checking if any wrong option has been selected
                        } else if (opt.style.borderLeft == leftBorder) {
                            currentQuestion.setAttribute('rightorwrong', 1);
                            rOw = 1;
                            //This doesn't stop the loop in case there is another correct option which was not selected
                        }
                    }
                }
                if ((i == currentOptions.length - 1) && (rOw == 1)) {
                    passedQuestionsArray.push(currentQuestion);
                    passFailSequenceArray.push('pass');
                }
            }
        }
    }
}

function isClickedLiAnAnswer(event) {
    var liClicked = event.target;
    //Check if UL has been clicked before or not, if not, add it to the clicked ULs so that it cannot be clicked again
    if ((!questionsArray.includes(liClicked.parentElement)) && (!currentQuestion.querySelector('UL').getAttribute('confirmed'))) { //Ensure it is not the question UL itself that is being clicked
        var actualClickedOption = isClickedElmOrParentAnOptionLI(liClicked);
        var chancesLeft = actualClickedOption.parentElement.getAttribute('availablechances');
        var maxchances = actualClickedOption.parentElement.getAttribute('maxchances');
        var rightAnswer = null;
        if ((chancesLeft > 0) && (actualClickedOption.style.backgroundColor != 'yellow')) { //it hasn't been clicked
            actualClickedOption.style.backgroundColor = 'yellow';
            actualClickedOption.parentElement.setAttribute('availablechances', chancesLeft - 1);

            if (!previousClickedULArray.includes(this)) {
                previousClickedULArray.push(this);
                if (previousClickedULArray.length == questionsArray.length) {
                    // show the "Quiz Result" li/button after the last Question has benn answered;
                    quizResult = document.getElementById("quizResult").innerHTML = "Quiz Result";
                    // quizResult.style.display = "block";

                }
                /* if (previousClickedULArray.length == questionsArray.length) {
                    var completeQuizOrProceed = document.getElementById('completeQuiz');
                    completeQuizOrProceed.style.display = 'block';
                } */
            }

        } else if ((chancesLeft < maxchances) && (actualClickedOption.style.backgroundColor == 'yellow')) { //it has been clicked
            actualClickedOption.style.backgroundColor = '';
            chancesLeft = Number(chancesLeft) + 1
            actualClickedOption.parentElement.setAttribute('availablechances', chancesLeft);
            if (chancesLeft == maxchances) {

                if (previousClickedULArray.includes(this)) {
                    previousClickedULArray.splice(previousClickedULArray.indexOf(this), 2);
                    // if (previousClickedULArray.length == questionsArray.length) {
                    // show the "Quiz Result" li/button after the last Question has benn answered;
                    // quizResult = document.getElementById("quizResult").innerHTML = "Quiz Result";
                    // quizResult.style.display = "block";
                    // }
                }
            }
        }
    }
}

function PREVIOUS_isClickedLiAnAnswer(event) {
    var liClicked = event.target;
    //Check if UL has been clicked before or not, if not, add it to the clicked ULs so that it cannot be clicked again
    // if ((previousClickedULArray.length == 0)||(previousClickedULArray.includes(this)==false)){
    // if ((previousClickedULArray.includes(this)==false)&&(questionsArray.includes(liClicked.parentElement)==false)){
    if (!questionsArray.includes(liClicked.parentElement)) { //Ensure it is not the question UL itself that is being clicked
        var actualClickedOption = isClickedElmOrParentAnOptionLI(liClicked);
        var chancesLeft = actualClickedOption.parentElement.getAttribute('availablechances');
        var rightAnswer = null;
        if ((!clickedOptionsArray.includes(actualClickedOption)) && (chancesLeft > 0)) {
            //The right answer is put inside <STRONG></STRONG>
            // &&(liClicked.querySelector('BUTTON'))
            clickedOptionsArray.push(actualClickedOption);
            if (actualClickedOption.querySelector('STRONG')) { //check if clicked element's has an element with tagName STRONG
                rightAnswer = actualClickedOption;
                // } else if ((liClicked.tagName == 'STRONG') || (liClicked.parentElement.querySelector('STRONG'))) { //check if clicked element's tagName is STRONG
                //     rightAnswer = liClicked.parentElement; //change parenet LI color
            } else { //it is a wrong answer
                actualClickedOption.style.backgroundColor = 'pink';
            }

            if (rightAnswer) {
                rightAnswer.style.backgroundColor = 'lightgreen';
                if ((rightAnswer.querySelector('UL')) && (!rightAnswer.querySelector('.explainButton'))) {
                    explainButtonCreate(rightAnswer).addEventListener('click', showExplanation);
                }
            }
            actualClickedOption.parentElement.setAttribute('availablechances', chancesLeft - 1);
            if (!previousClickedULArray.includes(this)) {
                previousClickedULArray.push(this);
                if (previousClickedULArray.length == questionsArray.length) {
                    // show the "Quiz Result" li/button after the last Question has benn answered;
                    quizResult = document.getElementById("quizResult").innerHTML = "Quiz Result";
                    // quizResult.style.display = "block";

                }
                if (previousClickedULArray.length == questionsArray.length) {
                    var completeQuizOrProceed = document.getElementById('completeQuiz');
                    completeQuizOrProceed.style.display = 'block';
                }
            }
        }
    }
}

//TO SHOW POPUP
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//TO SHOW QUESTION HINT
function showHint() {
    var showHint = currentQuestion.children[0];
    if (showHint.tagName == "EM") {
        showHint.classList.toggle("show");
    }
}

//TO SHOW EXPLANATION
function showExplanation() {
    this.parentNode.querySelector('UL').classList.toggle("show");
}

//TO CREATE AN EXPLANATION BUTTON
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
    console.log(liFirstLevel)

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
        if ((optClone[k].style.backgroundColor != 'lightgreen')) { //find all wrong options to display none them (correct options have lightGreen background)
            optClone[k].style.display = 'none'; //display none all options LIs that are wrong options (their backgroundColor != 'lightgreen') 
        }
        optClone[k].style.backgroundColor = ''//remove all backgroundcolors
    }

    liFirstLevel.forEach(element => {
        element.style.backgroundColor = '';
    });
    resultSection.style.display = 'none';
    document.getElementsByClassName('corAnswers-Board')[0].append(displayAllQuestions);
    CorrectedAnswersSection.style.display = 'block';
}