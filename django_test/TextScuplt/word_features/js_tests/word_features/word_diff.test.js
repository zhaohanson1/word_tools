QUnit.module('Word Diff');


QUnit.test('No difference', function(assert) {
    let ld = new LineDiff;
    let a = 'Hello World!';
    let b = 'Hello World!';
    let acutal = ld.diff(a,b);
    let expected = [ [], [] ];
    assert.deepEqual(acutal, expected);
});


QUnit.test('Test case 1: Change line', function(assert) {
    let ld = new LineDiff();
    let a = 'abc\ndef\nabc\ndef\nghi';
    let b = 'abc\nzzz\nabc\nzzz\nghi';
    let acutal = ld.diff(a,b);
    let expected = [ [[1,1],[3,3]],  [[1,1],[3,3]] ];
    assert.deepEqual(acutal, expected);
});

QUnit.test('Test case 2: Insertion, Deletion, and Change', function(assert) {
    let ld = new LineDiff();
    let a = 'abc\ndef\n\nabc\n\ndef\nghi'
    let b = 'xyz\n\nabc\ndef\n\nzzz\nghi'
    let acutal = ld.diff(a,b);
    let expected = [ [[0,0],[4,5]],  [[0,1],[4,4]] ];
    assert.deepEqual(acutal, expected);
});