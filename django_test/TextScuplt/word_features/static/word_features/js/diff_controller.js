let lineDiff = new LineDiff();
let text1 = $('#id_text_1')
let text2 = $('#id_text_2')
let rangeInput = $('#id_ranges')

$('#diff-form').submit(function() {
    let r = lineDiff.diff(text1.val(), text2.val());
    rangeInput.val(JSON.stringify(r));
});
