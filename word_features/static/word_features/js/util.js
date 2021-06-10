// Initalize all popovers
$(function() {
    $('[data-toggle="tooltip"]').tooltip();
})

const copyTextAreaToClipboard = function(e) {
    let id = e.target.dataset.textareaName;
    var textArea = document.getElementById(id);

    if (!navigator.clipboard) {
        $('#' + id).select();
        document.execCommand('copy');
    } else {
        var text_to_copy = textArea.value;
        navigator.clipboard.writeText(text_to_copy).catch(
            function(err) {
                console.error("err in copy")
                console.error(err);
            }
        );
    }
    document.getSelection().empty();
};

const pasteClipboardToTextArea = function(e) {
    let id = e.target.dataset.textareaName;
    var textArea = document.getElementById(id);
    if (!navigator.clipboard) {
        $('#' + id).select();
        document.execCommand('paste');
    } else {
        textArea.focus();
        navigator.clipboard.readText().then(
            t => textArea.value = t
        ).catch(
            function(err) {
                console.error("err in paste")
                console.error(err);
            }
        );
    }
    document.getSelection().empty();
};

let storedText = null;
const swapText = function(textbox1, textbox2) {
    storedText = textbox1.value;
    textbox1.value = textbox2.value;
    textbox2.value = storedText;
}

const undoText = function(textbox1) {
    if (storedText)
        textbox1.value = storedText;
}