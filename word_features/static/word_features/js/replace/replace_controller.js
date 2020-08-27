let inputArea = document.getElementById('input-text');
let regexInput = document.getElementById('regex-input');
let replTextArea = document.getElementById('repl-text-input');
let outputArea = document.getElementById('output-text');

getWordReplace = function() {
    let inputText = inputArea.value;
    let regexText = regexInput.value;
    let replText = replTextArea.value;
    outputArea.value = replaceAll(inputText, regexText, replText);
}

inputArea.addEventListener('input', getWordReplace);
regexInput.addEventListener('input', getWordReplace);
replTextArea.addEventListener('input', getWordReplace);

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