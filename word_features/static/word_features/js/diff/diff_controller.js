let lineDiff = new LineDiff();
let text1 = document.getElementById('id_text_1');
let text2 = document.getElementById('id_text_2');
let rangeInput = document.getElementById('id_ranges');

$('#diff-form').submit(function() {
    let r = lineDiff.diff(text1.value, text2.value);
    rangeInput.value = JSON.stringify(r);
});


/* util.js */
let swapButton = document.getElementById('swap-btn');
swapButton.addEventListener('click', function() {
    swapText(text1, text2);
});