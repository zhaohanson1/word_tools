/**
 * Replace the next instance of the pattern starting at startIndex
 * @param {string} inputString      The input text
 * @param {int} startIndex          Starting index, inclusive
 * @param {string} pattern          The pattern as a string
 * @param {string} repl          The replacement string
 * @returns {string}     The resulting string
 */
function replaceNext(inputString, startIndex, pattern, repl) {
    if (pattern == '')  return inputString;
    let substr1 = inputString.substring(0, startIndex);
    let substr2 = inputString.substring(startIndex);
    substr2 = substr2.replace(new RegExp(pattern), repl);
    return substr1 + substr2;
}


/**
 * Replace all substrings that match a pattern
 * @param {string} inputString      The input text
 * @param {string} pattern          The pattern as a string
 * @param {string} repl          The replacement string
 * @returns {string}     The resulting string
 */
function replaceAll(inputString, pattern, repl){
    if (pattern == '')  return inputString;
    pattern = escapeRegExp(pattern);
    return inputString.replace(new RegExp(pattern, 'g'), repl);
}


function escapeRegExp(str) {
    return str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}