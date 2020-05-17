function isWhiteSpace(ch) {  
    return (ch == ' ') || (ch == '\t') || (ch == '\n');
}

/**
 * Count the number of words.
 * @param {string}  inputString     The input text
 * @returns {number}    The number of words in inputString
 *                      If input is invalid, return -1;
 */
function wordCount(inputString) {

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

class DiffTemplate {

    constructor() {};

    /**
     * Return the index ranges where the text differs
     * @param {string} input1       The first text
     * @param {string} input2       The second text
     * @returns {Array.<Array>}      A list of ranges
     * @memberof DiffTemplate
     */
    diff(input1, input2) {   
        let X = this.splitSequence(input1);
        let Y = this.splitSequence(input2);
        let [C, start, xEnd, yEnd] = this.seqToLCSAndBounds(X, Y);
        let q = this.getDiffRanges(C,X,Y,start);
        //this.printDiffAll(C,X,Y,start,xEnd, yEnd);
        //console.log('Longest subsequence is: '+this.getLCSLength(C, X).toString());
        //console.log(q);
        return q;
    }


    getLCSLength(C, X) {
        return C[C.length-1][(C[0].length)-1]+ (X.length-C.length+1);
    }


    /**
     * Takes two sequences and converts them to the LCS array and the bounds
     * after skipping duplicate lines at the ends.
     * @param {Array.<String>} X
     * @param {Array.<String>} Y
     * @returns {Array<Array.<number>|number}
     * @memberof DiffTemplate
     */
    seqToLCSAndBounds(X, Y) {
        let [start, xEnd, yEnd] = this.getTrimmedBounds(X, Y);
        let C = this.computeLCSArray(X, Y, start, xEnd, yEnd);
        return [C, start, xEnd, yEnd];
    }


    /**
     * Computes the DP array of the longest common subsequence for X and Y,
     * ignoring duplicate lines at 0 to start and at xEnd and yEnd to X.length
     * and Y.length, respectively
     * @param {Array.<String>} X
     * @param {Array.<String>} Y
     * @param {number} start
     * @param {number} xEnd
     * @param {number} yEnd
     * @returns {Array.<number>}
     * @memberof DiffTemplate
     */
    computeLCSArray(X, Y, start, xEnd, yEnd) {
        /** Intialize DP array */ 
        let C = new Array(xEnd-start+2);
        for (let i = 0; i < xEnd-start+2; i++) {
            C[i] = new Array(yEnd-start+2);
            C[i][0] = 0;
        }        
        C[0].fill(0);

        /** LCS Algorithm */
        for (let i = start; i <= xEnd; i++) {
            let idx = i-start+1;
            for (let j = start; j <= yEnd; j++) {
                let jdx = j-start+1;
                if (this.isEqual(X[i], Y[j])) {
                    C[idx][jdx] = C[idx-1][jdx-1] + 1
                } else {
                    C[idx][jdx] = Math.max(C[idx-1][jdx], C[idx][jdx-1])
                }
            }
        }
        return C;
    }


    printCommonStart(X, Y, start) {
        for (let i=0; i<start; i++) {
            console.log(i.toString()+' '+X[i]+'   '+Y[i]);
        }
    }


    printCommonEnd(X,Y,xEnd,yEnd) {
        let endLength = X.length-1-xEnd;
        for (let i=1; i<=endLength; i++) {
            console.log(
                (xEnd+i).toString()
                + '   '
                + X[xEnd+i]
                + '   '
                + Y[yEnd+i]
            );
        }
    }


    /**
     * Backtrack the LCS DP array recursively and print the path
     *
     * @param {Array.<Array.<number>>}  C       The LCS array
     * @param {Array.<String>}  X       The first string
     * @param {Array.<String>}Y         The second string
     * @param {number} i    The current row index in path
     * @param {number} j    The current column index in path
     * @param {number} start    The trimmed start bound
     * @returns
     * @memberof DiffTemplate
     */
    printDiff(C, X, Y, i, j, start) {
        let plus = [];
        let minus = [];
        let idx = i-1+start;
        let jdx = j-1+start;
        if (i > 0 && j > 0 && this.isEqual(X[idx], Y[jdx])) {
            let l = this.printDiff(C, X, Y, i-1, j-1, start);
            plus = l[0];
            minus = l[1];
            console.log((i-1).toString() + '   ' + X[idx]);
        } else if (j > 0 && (i == 0 || C[i][j-1] >= C[i-1][j])) {
            let l = this.printDiff(C, X, Y, i, j-1, start);
            plus = l[0];
            minus = l[1];
            plus.push(jdx);
            console.log((j-1).toString() + ' + ' + Y[jdx]);
        } else if (i > 0 && (j == 0 || C[i][j-1] < C[i-1][j])) {
            let l = this.printDiff(C, X, Y, i-1, j, start);
            plus = l[0];
            minus = l[1];
            minus.push(idx);
            console.log((i-1).toString() + ' - ' + X[idx]);  
        } 
        return [plus, minus];
    }


    /**
     *
     *
     * @param {Array.<Array.<number>>} C
     * @param {Array.<String>} X
     * @param {Array.<String>} Y
     * @param {number} start
     * @param {number} xEnd
     * @param {number} yEnd
     * @memberof DiffTemplate
     */
    printDiffAll(C, X, Y, start, xEnd, yEnd) {
        this.printCommonStart(X, Y, start);
        this.printDiff(C, X, Y, C.length-1, (C[0].length)-1, start);
        this.printCommonEnd(X, Y, xEnd, yEnd);
    }


    /**
     * Backtrack the LCS DP Array to compute the diff ranges.
     *
     * @param {Array.<Array.<number>>} C
     * @param {Array.<String>} X
     * @param {Array.<String>} Y
     * @param {number} start
     * @returns {Array.<Array.<number>>}
     * @memberof DiffTemplate
     */
    getDiffRanges(C,X,Y,start) {
        var plus = [];
        var minus = [];
        const seqType = {SAME: 1, PLUS: 2, MINUS: 3};
        const updateRanges = () => {
            if (prevType == seqType.PLUS) {
                plus.unshift([jdx+1, endRange]);
            } else if (prevType == seqType.MINUS) {
                minus.unshift([idx+1, endRange]);
            }
        };
        let i = C.length-1;
        let j = (C[0].length)-1;
        var currType, endRange;
        var prevType = -1;

        while (i >= 0 && j >= 0) {
            var idx = i-1+start;
            var jdx = j-1+start;
            if (i > 0 && j > 0 && this.isEqual(X[idx], Y[jdx])) {
                currType = seqType.SAME;
                i -= 1;
                j -= 1;
            } else if (j > 0 && (i == 0 || C[i][j-1] >= C[i-1][j])) {
                currType = seqType.PLUS;
                j -= 1;
            } else if (i > 0 && (j == 0 || C[i][j-1] < C[i-1][j])) {
                currType = seqType.MINUS;
                i -= 1;
            } else {
                updateRanges();
                break;
            }

            if (currType != prevType) {
                updateRanges();
                if (currType == seqType.PLUS) {
                    endRange = jdx;
                } else if (currType == seqType.MINUS) {
                    endRange = idx;
                }
                prevType = currType;
            }
        }
        return [plus, minus];
    }
    

    /**
     * Returns the indices of the sequences after skipping the beginning
     * and end duplicate elements. 
     * @param {Array.<String>} X
     * @param {Array.<String>} Y
     * @returns {Array.<number>} 
     */
    getTrimmedBounds(X, Y) {
        let start = 0;
        let m_end = X.length-1;
        let n_end = Y.length-1;
        // trim off the matching items at the beginning
        while (
            start <= m_end 
            && start <= n_end 
            && this.isEqual(X[start], Y[start])
        ) {
            start++;
        }
        // trim off the matching items at the end
        while (
            start <= m_end 
            && start <= n_end 
            && this.isEqual(X[m_end], Y[n_end])
        ) {
            m_end--;
            n_end--;
        }
        return [start, m_end, n_end];
    }

    splitSequence(input) {
        return [input];
    }

    isEqual(elem1, elem2) {
        return elem1 == elem2;
    }
}


class LineDiff extends DiffTemplate {

    splitSequence(input) {
        return input.split('\n');
    }

    isEqual(line1, line2) {
        return line1 === line2;
    }
}


/**
 * Replace the next instance of the pattern starting at startIndex
 * @param {string} inputString      The input text
 * @param {int} startIndex          Starting index, inclusive
 * @param {string} rString          The regex pattern as a string
 * @param {string} repl          The replacement string
 * @returns {string}     The resulting string
 */
function replaceNext(inputString, startIndex, rString, repl) {
    if (rString == '')  return inputString;
    let substr1 = inputString.substring(0, startIndex);
    let substr2 = inputString.substring(startIndex);
    substr2 = substr2.replace(new RegExp(rString), repl);
    return substr1 + substr2;
}

/**
 * Replace all substrings that match a pattern
 * @param {string} inputString      The input text
 * @param {string} rString          The regex pattern as a string
 * @param {string} repl          The replacement string
 * @returns {string}     The resulting string
 */
function replaceAll(inputString, rString, repl){
    if (rString == '')  return inputString;
    return inputString.replace(new RegExp(rString, 'g'), repl);
}