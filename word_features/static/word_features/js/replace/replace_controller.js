let inputArea = document.getElementById('input-text');
let regexInput = document.getElementById('regex-input');
let replTextArea = document.getElementById('repl-text-input');
let outputArea = document.getElementById('output-text');
let regexCheck = document.getElementById('regex-box');

getWordReplace = function() {
    let inputText = inputArea.value;
    let regexText = regexInput.value;
    let replText = replTextArea.value;
    if (regexCheck.checked) {
        outputArea.value = regexReplaceAll(inputText, regexText, replText);
    } else {
        outputArea.value = replaceAll(inputText, regexText, replText);
    }
    
}
inputArea.addEventListener('input', getWordReplace);
regexInput.addEventListener('input', getWordReplace);
replTextArea.addEventListener('input', getWordReplace);
regexCheck.addEventListener('click', getWordReplace);

/* util.js */
let swapButton = document.getElementById('swap-btn');
let undoButton = document.getElementById('undo-btn');
swapButton.addEventListener('click', function() {
    swapText(inputArea, outputArea);
    getWordReplace();
});

undoButton.addEventListener('click', function() {
    undoText(inputArea);
    getWordReplace();
});