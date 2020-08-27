let textArea = document.getElementById('textarea');
let wordCountVal = document.getElementById('word-count-value');
let lineCountVal = document.getElementById('line-count-value');
let charCountVal = document.getElementById('char-count-value');

function updateCount() {
    let input = textArea.value;
    wordCountVal.innerHTML = countWords(input);
    lineCountVal.innerHTML = countLines(input);
    charCountVal.innerHTML = countChars(input);
};

textArea.addEventListener('input', updateCount);