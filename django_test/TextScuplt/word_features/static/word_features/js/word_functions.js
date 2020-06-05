/**
 * Abstract Diff Class
 * @abstract
 * @class DiffTemplate
 */
class DiffTemplate {

    /** @abstract @constructor */
    constructor() {
        if (this.constructor == DiffTemplate) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    };

    /**
     * Return the index ranges where the text differs
     * @param {string} input1       The first text
     * @param {string} input2       The second text
     * @returns {Array.<Array>}      A list of ranges
     * @memberof DiffTemplate
     */
    diff(input1, input2) {
        let X = this.splitIntoSequence(input1);
        let Y = this.splitIntoSequence(input2);
        let [C, start, xEnd, yEnd] = this.seqToLCSAndBounds(X, Y);

        /** Backtrack the LCS DP Array to compute the diff ranges. */
        let plus = [];
        let minus = [];
        const seqType = {SAME: 1, PLUS: 2, MINUS: 3};

        let i = C.length-1;
        let j = (C[0].length)-1;
        let currType = 0;
        let prevType, endRange;
        while (i >= 0 && j >= 0) {
            let idx = i-1+start;
            let jdx = j-1+start;
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
                /** End case */
                if (prevType == seqType.PLUS) {
                    plus.unshift([jdx+1, endRange]);
                } else if (prevType == seqType.MINUS) {
                    minus.unshift([idx+1, endRange]);
                }
                break;
            }

            /** Dealing with when range type changes */
            if (currType != prevType) {

                if (prevType == seqType.PLUS) {
                    plus.unshift([jdx+1, endRange]);
                } else if (prevType == seqType.MINUS) {
                    minus.unshift([idx+1, endRange]);
                }

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
     * Return the length of the longest common subsequence
     * The input sequence is needed since C skips the ends of the input 
     * where they are duplicated
     *
     * @param {Array.<Array.<Number>>} C    The LCS array
     * @param {Array.<String>} X    The first sequence
     * @returns {Number}
     * @memberof DiffTemplate
     */
    getLCSLength(C, X) {
        return C[C.length-1][(C[0].length)-1]+ (X.length-C.length+1);
    }


    /**
     * Takes two sequences and converts them to the LCS array and the bounds
     * after skipping duplicate lines at the ends.
     * @param {Array.<String>} X    The first sequence
     * @param {Array.<String>} Y    The first sequence
     * @returns {Array<Array.<number>|number}
     *  C: LCS array
     *  start: the index of X and Y where the LCS starts
     *  xEnd: the last index of X where the LCS ends
     *  yEnd: the last index of Y where the LCS ends
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
     * @param {Array.<String>} X    The first sequence
     * @param {Array.<String>} Y    The second seqeunce
     * @param {number} start    The index of X and Y where the LCS starts
     * @param {number} xEnd     The last index of X where the LCS ends
     * @param {number} yEnd     The last index of Y where the LCS ends
     * @returns {Array.<number>}    The LCS array
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


    /**
     *  Print the first lines that X and Y share
     *  Helper for printDiffAll
     * @param {Array.<String>} X     The first sequence
     * @param {Array.<String>} Y     The second sequence
     * @param {Number} start     The start index of the LCS
     * @memberof DiffTemplate
     */
    printCommonStart(X, Y, start) {
        for (let i=0; i<start; i++) {
            console.log(i.toString()+' '+X[i]+'   '+Y[i]);
        }
    }


    /**
     * Print the last lines that X and Y share
     * Helper for printDiffAll
     * @param {Array.<String>} X     The first sequence
     * @param {Array.<String>} Y     The second sequence
     * @param {number} xEnd     The last index of X where the LCS ends
     * @param {number} yEnd     The last index of Y where the LCS ends
     * @memberof DiffTemplate
     */
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
     * @param {Array.<Array.<number>>} C       The LCS array
     * @param {Array.<String>} X       The first sequence
     * @param {Array.<String>} Y         The second sequence
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
     * Prints both sequences, marking the elements 
     * that are added and removed.
     * @param {Array.<Array.<number>>} C
     * @param {Array.<String>} X    The first sequence
     * @param {Array.<String>} Y    The second sequence
    * @param {number} start    The index of X and Y where the LCS starts
     * @param {number} xEnd     The last index of X where the LCS ends
     * @param {number} yEnd     The last index of Y where the LCS ends
     * @memberof DiffTemplate
     */
    printDiffAll(C, X, Y, start, xEnd, yEnd) {
        this.printCommonStart(X, Y, start);
        this.printDiff(C, X, Y, C.length-1, (C[0].length)-1, start);
        this.printCommonEnd(X, Y, xEnd, yEnd);
    }


    /**
     * Returns the indices of the sequences after skipping the beginning
     * and end duplicate elements. 
     * @param {Array.<String>} X    The first sequence
     * @param {Array.<String>} Y    The second sequence
     * @returns {Array.<number>}
     */
    getTrimmedBounds(X, Y) {
        let start = 0;
        let xEnd = X.length-1;
        let yEnd = Y.length-1;
        // trim off the matching items at the beginning
        while (
            start <= xEnd 
            && start <= yEnd 
            && this.isEqual(X[start], Y[start])
        ) {
            start++;
        }
        // trim off the matching items at the end
        while (
            start <= xEnd 
            && start <= yEnd 
            && this.isEqual(X[xEnd], Y[yEnd])
        ) {
            xEnd--;
            yEnd--;
        }
        return [start, xEnd, yEnd];
    }

    
    /** @abstract */
    splitIntoSequence(input) {
        throw new Error("Method 'splitIntoSequence()' must be implemented.");
    }


    /** @abstract */
    isEqual(elem1, elem2) {
        throw new Error("Method 'splitIntoSequence()' must be implemented.");
    }
}


/**
 * Finds diff by line
 *
 * @class LineDiff
 * @extends {DiffTemplate}
 */
class LineDiff extends DiffTemplate {

    
    /**
     * Separates sequence by line breaks
     * @param {String} input
     * @returns {Array.<String>}
     * @memberof LineDiff
     */
    splitIntoSequence(input) {
        return input.split('\n');
    }

    
    /**
     * Returns if two strings are equal
     * @param {String} line1
     * @param {String} line2
     * @returns {boolean}
     * @memberof LineDiff
     */
    isEqual(line1, line2) {
        return line1 === line2;
    }
}


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