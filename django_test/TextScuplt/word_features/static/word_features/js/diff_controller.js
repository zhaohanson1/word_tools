var lineDiff = new LineDiff();
var text1 = $('#id_text_1')
var text2 = $('#id_text_2')
var rangeInput = $('#id_ranges')

$('#diff-form').submit(function() {
    var r = lineDiff.diff(text1.val(), text2.val());
    rangeInput.val(JSON.stringify(r));
});