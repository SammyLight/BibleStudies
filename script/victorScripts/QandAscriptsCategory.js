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
// const buttonPauseCat = document.querySelector("#pauseButtonCat");
// const buttonPlayCat = document.querySelector("#playButtonCat");
// const audioElementCat = document.querySelector("AUDIO");

// buttonPauseCat.addEventListener('click', bgSoundPauseButton);
// buttonPlayCat.addEventListener('click', bgSoundPlayButton);

// document.addEventListener("DOMContentLoaded", () => {
//     audioElementCat.volume = 0.2;
//     audioElementCat.play();
// });

// function bgSoundPauseButton() {
//     if (audioElementCat.play()){
//         audioElementCat.pause();
//         buttonPauseCat.style.display = 'none';
//         buttonPlayCat.style.display = 'block';
//     } 
// }
// function bgSoundPlayButton() {
//     if (audioElementCat.paused){
//         audioElementCat.play();
//         if (buttonPlayCat.style.display == 'block') {
//             buttonPlayCat.style.display = 'none';
//         }
//         if (buttonPauseCat.style.display == 'none') {
//             buttonPauseCat.style.display = 'block'
//         }
//     }
// }
const buttonPause = document.querySelector("#pauseButtonCat");
const buttonPlay = document.querySelector("#playButtonCat");
const audioElementCat = document.querySelector("AUDIO");
buttonPause.addEventListener('click', bgSoundPauseButton);
buttonPlay.addEventListener('click', bgSoundPlayButton);

window.addEventListener("DOMContentLoaded", () => {
    audioElementCat.volume = 0.2;
    audioElementCat.play();
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
closeCatSettings.addEventListener('click', closeCatSettingsFunc);

function showCatSettings() {
    catSettingsContent = document.getElementById("catSettingsContent");
    catSettingsContent.classList.toggle("show");
    catSettingsContent.prepend(closeCatSettings);
    showHintSound.play();
}
//TO HIDE SETTINGS
function closeCatSettingsFunc() {
    if (catSettingsContent.classList.contains('show')) {
        catSettingsContent.classList.remove('show');
    }
      clickSound.play(); 
      closeHintSound.play();
}
//CLICK ANYWHERE TO CLOSE SETTINGS
document.addEventListener('mouseup', function(e) {
    var container = document.getElementById("catSettingsContent");
    if (!container.contains(e.target)) {
        if (container.classList.contains('show')) {
            container.classList.remove('show');
            closeHintSound.play();
            clickSound.play();
        }
    }
});
