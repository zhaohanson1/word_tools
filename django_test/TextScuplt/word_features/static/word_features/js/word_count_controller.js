let wordCountDisplay = $('#word-count-value')
let textArea = $('#textarea')

let getWordCount = function() {
    let input = textArea.val();
    let count = wordCount(input);
    wordCountDisplay.text(count);
}

textArea.on('input', getWordCount);