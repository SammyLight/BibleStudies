var clickSoundTwo = document.getElementById("clickSound");
var buttons = document.querySelectorAll("BUTTON");
var links = document.querySelectorAll("A");

//BUTTONS CLICK SOUND
buttons.forEach(button => {
  button.addEventListener("click", () => {
    // clickSound.play();
    clickSoundTwo.play();
  });
});
//LINKS CLICK SOUND
links.forEach(elm => {
    elm.addEventListener("click", () => {
        // clickSound.play();
        clickSoundTwo.play();
    });
  });
  //PAGE PRELOAD
setTimeout(function() {
    $('.loader-bg-bibleQuiz').fadeToggle();
}, 1500);

const buttonPause = document.querySelector("#pauseButtonCat");
const buttonPlay = document.querySelector("#playButtonCat");
const audioElementCat = document.querySelector("AUDIO");
buttonPause.addEventListener('click', bgSoundPauseButton);
buttonPlay.addEventListener('click', bgSoundPlayButton);

window.addEventListener("DOMContentLoaded", () => {
    audioElementCat.volume = 0.2;
    audioElementCat.play();
    getDarkOrLightModeFROMCache();
});
function bgSoundPauseButton() {
    if (audioElementCat.play()){
        audioElementCat.pause();
        buttonPause.style.opacity = '0.3';
        buttonPlay.style.opacity = '1';
    } 
}
function bgSoundPlayButton() {
    if (audioElementCat.paused){
        audioElementCat.play();
        if (buttonPlay.style.opacity == '1') {
            buttonPlay.style.opacity = '0.3';
        }
        if (buttonPause.style.opacity == '0.3') {
            buttonPause.style.opacity = '1'
        }
    }
}

var catSettingsContent;
var closeCatSettings = document.createElement("SPAN");
closeCatSettings.classList.add('closeCatSettings');
closeCatSettings.innerText = 'x';
closeCatSettings.addEventListener('click', closeCatSettingsFunc);

function showCatSettings() {
    catSettingsContent = document.getElementById("catSettingsContent");
    catSettingsContent.classList.toggle("show");
    catSettingsContent.prepend(closeCatSettings);
    showHintSound.play();
}
//TO HIDE SETTINGS
function closeCatSettingsFunc() {
    if (catSettingsContent.className == "show") {
        catSettingsContent.className = "";
      }
      clickSound.play(); 
      closeHintSound.play();
}
//CLICK ANYWHERE TO CLOSE SETTINGS
document.addEventListener('mouseup', function(e) {
    var container = document.getElementById("catSettingsContent");
    if (!container.contains(e.target)) {
        if (container.className == "show") {
            container.className = "";
            closeHintSound.play();
            clickSound.play();
          }
        }
});

// FOR TOGGLING THEMES
var head = document.head;
var antiqueWhiteCssFile;
var blackPearlCssFile;
var copperRoseCssFile;
var crimsonCssFile;
var darkCyanCssFile;
var darkPurpleCssFile;

darkPurpleCssFile = document.getElementById('darkPurpleCssFile');
var antiqueWhiteThemeBtn = document.getElementById('antiqueWhite');
antiqueWhiteThemeBtn.addEventListener('click', changeToAntiquewhiteTheme);
var blackPearlThemeBtn = document.getElementById('blackPearl');
blackPearlThemeBtn.addEventListener('click', changeToBlackPearlTheme);
var copperRoseThemeBtn = document.getElementById('copperRose');
copperRoseThemeBtn.addEventListener('click', changeToCopperRoseTheme);
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
        else if(colorMode=='CopperRoseTheme'){changeToCopperRoseTheme()}
        else if(colorMode=='CrimsonTheme'){changeToCrimsonTheme()}
        else if(colorMode=='DarkCyanTheme'){changeToDarkCyanTheme()}
        else if(colorMode=='AntiquewhiteTheme'){changeToAntiquewhiteTheme()}
    } else {changeToDarkPurpleTheme()}
}
function changeToAntiquewhiteTheme() {
    setDarkOrLightModeInCache('AntiquewhiteTheme')
    antiqueWhiteCssFile = document.createElement('link');
    antiqueWhiteCssFile.id = 'antiqueWhiteCssFile'
    antiqueWhiteCssFile.type = 'text/css';
    antiqueWhiteCssFile.href = '../style/bibleQuizBG-antiquewhite.css';
    antiqueWhiteCssFile.rel = 'stylesheet';
    head.appendChild(antiqueWhiteCssFile);
    blackPearlCssFile.remove();
    crimsonCssFile.remove();
    darkCyanCssFile.remove();
    darkPurpleCssFile.remove();
    copperRoseCssFile.remove();
}
function changeToBlackPearlTheme() {
    setDarkOrLightModeInCache('BlackPearlTheme')
    blackPearlCssFile = document.createElement('link');
    blackPearlCssFile.id = 'blackPearlCssFile'
    blackPearlCssFile.type = 'text/css';
    blackPearlCssFile.href = '../style/bibleQuizBG-blackpearl.css';
    blackPearlCssFile.rel = 'stylesheet';
    head.appendChild(blackPearlCssFile);
    antiqueWhiteCssFile.remove();
    crimsonCssFile.remove();
    darkCyanCssFile.remove();
    copperRoseCssFile.remove();
    darkPurpleCssFile.remove();
}
function changeToCopperRoseTheme() {
    setDarkOrLightModeInCache('CopperRoseTheme')
    copperRoseCssFile = document.createElement('link');
    copperRoseCssFile.id = 'copperRoseCssFile'
    copperRoseCssFile.type = 'text/css';
    copperRoseCssFile.href = '../style/bibleQuizBG-copperrose.css';
    copperRoseCssFile.rel = 'stylesheet';
    head.appendChild(copperRoseCssFile);
    antiqueWhiteCssFile.remove();
    crimsonCssFile.remove();
    darkCyanCssFile.remove();
    darkPurpleCssFile.remove();
}
function changeToCrimsonTheme() {
    setDarkOrLightModeInCache('CrimsonTheme')
    crimsonCssFile = document.createElement('link');
    crimsonCssFile.id = 'crimsonCssFile'
    crimsonCssFile.type = 'text/css';
    crimsonCssFile.href = '../style/bibleQuizBG-crimson.css';
    crimsonCssFile.rel = 'stylesheet';
    head.appendChild(crimsonCssFile);
    antiqueWhiteCssFile.remove();
    blackPearlCssFile.remove();
    darkCyanCssFile.remove();
    darkPurpleCssFile.remove();
    copperRoseCssFile.remove();
}
function changeToDarkCyanTheme() {
    setDarkOrLightModeInCache('DarkCyanTheme')
    darkCyanCssFile = document.createElement('link');
    darkCyanCssFile.id = 'darkCyanCssFile'
    darkCyanCssFile.type = 'text/css';
    darkCyanCssFile.href = '../style/bibleQuizBG-darkcyan.css';
    darkCyanCssFile.rel = 'stylesheet';
    head.appendChild(darkCyanCssFile);
    antiqueWhiteCssFile.remove();
    blackPearlCssFile.remove();
    crimsonCssFile.remove();
    copperRoseCssFile.remove();
    darkPurpleCssFile.remove();
}
function changeToDarkPurpleTheme() {
    setDarkOrLightModeInCache('DarkPurpleTheme')
    head.appendChild(darkPurpleCssFile);
    antiqueWhiteCssFile.remove();
    blackPearlCssFile.remove();
    crimsonCssFile.remove();
    copperRoseCssFile.remove();
    darkCyanCssFile.remove();
}
window.addEventListener("DOMContentLoaded", () => {
    getDarkOrLightModeFROMCache();
});