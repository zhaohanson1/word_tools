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