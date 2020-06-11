function updateCount() {
    let input = $('#textarea').val();
    updateWordCount(input);
    updateLineCount(input);
    updateCharCount(input);
};

function updateWordCount(input) {
    let count = wordCount(input);
    $('#word-count-value').text(count);
}

function updateLineCount(input) {
    let count = lineCount(input);
    $('#line-count-value').text(count);
}

function updateCharCount(input) {
    let count = charCount(input);
    $('#char-count-value').text(count);
}

$('#textarea').on('input', updateCount);