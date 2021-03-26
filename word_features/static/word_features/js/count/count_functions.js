function isWhiteSpace(ch) {
    return (ch == ' ') || (ch == '\t') || (ch == '\n');
}

function isNewLine(ch) {
    return (ch == '\n');
}

/**
 * Count the number of words.
 * @param {String}  inputString     The input text
 * @returns {Number}    The number of words in inputString
 *                      If input is invalid, return -1;
 */
function countWords(inputString) {

    if (typeof inputString != 'string')
        return -1;

    let count = 0;
    let i = 0;
    while (i < inputString.length) {
        let ch = inputString[i];
        while (i < inputString.length && isWhiteSpace(ch)) {
            ch = inputString[++i];
        }

        if (i >= inputString.length) {
            break;
        }

        while (i < inputString.length && !isWhiteSpace(ch)) {
            ch = inputString[++i];
        }
        count++;
    }

    return count;
}


/**
 * Return the number of characters
 *
 * @param {String} inputString
 * @returns {Number}
 */
function countChars(inputString) {
    return (inputString.replace(/\n/g, '')).length;
}


/**
 * Return the number of lines
 * https://stackoverflow.com/a/43820645
 *
 * @param {String} inputString
 * @returns {Number}
 */
function countLines(inputString) {
    if (inputString == '')
        return 0;
    return (inputString.match(/\n/g) || '').length + 1;
}