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

class DiffTemplate {
    constructor() {};

    diff(input1, input2) {
        /**
         * Return the index ranges where the text differs
         * @param {string} input1       The first text
         * @param {string} input2       The second text
         * @return {Array.<Array>}      A list of ranges
         */
        var elems1 = this.splitIntoElements(input1);
        var elems2 = this.splitIntoElements(input2);

        var endValues = this.getTrimmedBounds(elems1, elems2);
        var start = endValues[0];
        var elems1End = endValues[1];
        var elems2End = endValues[2];

        var C = this.getLCSArray(elems1, elems2, start, elems1End, elems2End);
        this.printDiff(C, elems1, elems2, C.length-1, (C[0].length)-1, elems1End, elems2End);

        var lcsLen = C[C.length-1][(C[0].length)-1]+ (elems1.length-C.length+1);
        console.log("Longest subsequence is: " +  lcsLen.toString());
        return 0;
    }
    
    getLCSArray(elems1, elems2, start, elems1End, elems2End) {
        
        // Intialize DP array
        var C = new Array(elems1End-start+2);
        for (var i = start-1; i <= elems1End; i++) {
            var idx = i-start+1;
            C[idx] = new Array(elems2End-start+2);
            C[idx][0] = 0;
        }        
        C[0].fill(0);

        // Finds Longest Common Subsequence length
        for (var i = start; i <= elems1End; i++) {
            var idx = i-start+1;
            for (var j = start; j <= elems2End; j++) {
                var jdx = j-start+1;
                if (this.isEqual(elems1[i], elems2[j])) {
                    C[idx][jdx] = C[idx-1][jdx-1] + 1
                } else {
                    C[idx][jdx] = Math.max(C[idx-1][jdx], C[idx][jdx-1])
                }
            }
        }
        return C;
    }

    printDiff(C, X, Y, i, j, elems1End, elems2End) {
        if (i > 0 && j > 0 && this.isEqual(X[i], Y[j])) {
            this.printDiff(C, X, Y, i-1, j-1);
            console.log("  " + X[i]);
        } else if (j > 0 && (i == 0 || C[i][j-1] >= C[i-1][j])) {
            this.printDiff(C, X, Y, i, j-1, elems1End, elems2End);
            console.log("+ " + Y[j]);
        } else if (i > 0 && (j == 0 || C[i][j-1] < C[i-1][j])) {
            this.printDiff(C, X, Y, i-1, j, elems1End, elems2End);
            console.log("- " + X[i]);
        } else {
            return;
        }
    }
    
    getTrimmedBounds(elems1, elems2) {
        var start = 0;
        var m_end = elems1.length-1;
        var n_end = elems2.length-1;
        // trim off the matching items at the beginning
        while (
            start <= m_end 
            && start <= n_end 
            && this.isEqual(elems1[start], elems2[start])
        ) {
            start++;
        }
        // trim off the matching items at the end
        while (
            start <= m_end 
            && start <= n_end 
            && this.isEqual(elems1[m_end], elems2[n_end])
        ) {
            m_end--;
            n_end--;
        }
        return [start, m_end, n_end];
    }

    splitIntoElements(input) {
        return [input];
    }

    isEqual(elem1, elem2) {
        return elem1 == elem2;
    }
}

class LineDiff extends DiffTemplate {

    splitIntoElements(input) {
        return input.split('\n');
    }

    isEqual(line1, line2) {
        return line1 === line2;
    }
}
/*
var tmp = new LineDiff();
var a = "abc\n\
def\n\
abc\n\
def\n\
ghi"

var b = "abc\n\
zzz\n\
abc\n\
zzz\n\
ghi"

tmp.diff(a,b);
*/

function replaceNext(inputString, startIndex, rString, repl) {
    /**
     * Replace the next instance of the pattern starting at startIndex
     * @param {string} inputString      The input text
     * @param {int} startIndex          Starting index, inclusive
     * @param {string} rString          The regex pattern as a string
     * @param {string} repl          The replacement string
     * @return {string}     The resulting string
     */

    if (rString == '')  return inputString;
    var substr1 = inputString.substring(0, startIndex);
    var substr2 = inputString.substring(startIndex);
    substr2 = substr2.replace(new RegExp(rString), repl);
    return substr1 + substr2;
}

function replaceAll(inputString, rString, repl){
    /**
     * Replace all substrings that match a pattern
     * @param {string} inputString      The input text
     * @param {string} rString          The regex pattern as a string
     * @param {string} repl          The replacement string
     * @return {string}     The resulting string
     */
    if (rString == '')  return inputString;
    return inputString.replace(new RegExp(rString, 'g'), repl);
}