chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    if (message.txt === 'hello') {
        (function () {
            // console.log(document.querySelector('title').textContent)
            saveDynamicDataToFile()
        })()
    }
}