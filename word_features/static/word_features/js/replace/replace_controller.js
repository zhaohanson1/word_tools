let inputArea = $('#input-text')
let regexInput = $('#regex-input')
let replTextArea = $('#repl-text-input')
let outputArea = $('#output-text')
let regexCheck = $('#regex-box')

getWordReplace = function() {
    let inputText = inputArea.val();
    let regexText = regexInput.val();
    let replText = replTextArea.val();
    if (regexCheck.prop('checked')) {
        outputArea.text(regexReplaceAll(inputText, regexText, replText));
    } else {
        outputArea.text(replaceAll(inputText, regexText, replText));
    }
    
}

inputArea.on('input', getWordReplace);
regexInput.on('input', getWordReplace);
replTextArea.on('input', getWordReplace);
regexCheck.on('click', getWordReplace);