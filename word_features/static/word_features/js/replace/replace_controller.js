let inputArea = document.getElementById('input-text');
let regexInput = document.getElementById('regex-input');
let replTextArea = document.getElementById('repl-text-input');
let outputArea = document.getElementById('output-text');
let regexCheck = document.getElementById('regex-box');

const MAX_ROWS = 3;

function getWordReplace() {
    let inputText = inputArea.value;
    let regexText = regexInput.value;
    let replText = replTextArea.value;
    if (regexCheck.checked) {
        outputArea.value = regexReplaceAll(inputText, regexText, replText);
    } else {
        outputArea.value = replaceAll(inputText, regexText, replText);
    }
}

// Dealing with Textarea Height
let patternInputs = document.querySelectorAll(".pattern");
patternInputs.forEach(elem => elem.addEventListener("keyup", () => {
    let numberOfLineBreaks = (elem.value.match(/\n/g) || []).length;
    let newHeight = Math.min(numberOfLineBreaks + 1, MAX_ROWS);
    elem.rows = newHeight;
}));

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