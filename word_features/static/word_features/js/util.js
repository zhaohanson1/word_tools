// Initalize all popovers
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
  })

const copyTextAreaToClipboard = function(e) {
    let id = e.target.dataset.textareaName;
    $('#'+id).select();
    document.execCommand('copy');
    document.getSelection().empty();
  };


let storedText = null; 
swapText = function(textbox1, textbox2) {
    storedText = textbox1.value;
    textbox1.value = textbox2.value;
    textbox2.value = storedText;
}

undoText = function(textbox1) {
    if (storedText)
      textbox1.value = storedText;
}