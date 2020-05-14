
function isWhiteSpace(ch) {  
    return (ch == ' ') || (ch == '\t') || (ch == '\n');
}

function wordCount(inputString) {
    /**
     * Count the number of words.
     * @param {string}  inputString     The input text
     * @return {int}    The number of words in inputString
     *                  If input is invalid, return -1;
     */

    if (typeof inputString != 'string')
        return -1;
    
    var count=0; 
    var i=0;
    while (i<inputString.length) {
        var ch = inputString[i];
        while (i<inputString.length && isWhiteSpace(ch)) {
            ch = inputString[++i];
        }
        if (i>=inputString.length) {
            break;
        }

        while (i<inputString.length && !isWhiteSpace(ch)) {
            ch = inputString[++i];
        }
        count++;
    }
    
    return count;
}

function wordDiff(input1, input2) {
    /**
     * Return the index ranges where the text differs
     * @param {string} input1       The first text
     * @param {string} input2       The second text
     * @return {Array.<Array>}      A list of ranges
     */
    return 0;
}

function wordReplace(inputString, rString, replace){
    /**
     * Replace all substrings that match a pattern
     * @param {string} inputString      The input text
     * @param {string} rString          The regex pattern as a string
     * @param {string} replace          The replacement string
     * @return {string}     The resulting string
     */
    if (rString == '') 
        return inputString;
    var re = new RegExp(rString, 'g');
    return inputString.replace(re, replace);
}