QUnit.module('Line Diff');


QUnit.test('No difference', function(assert) {
    let ld = new LineDiff();
    let a = 'Hello World!';
    let b = 'Hello World!';
    let acutal = ld.diff(a,b);
    let expected = [ [], [] ];
    assert.deepEqual(acutal, expected);
});


QUnit.test('Line Test case 1: Change line', function(assert) {
    let ld = new LineDiff();
    let a = `abc
            def
            abc
            def
            ghi`;
    let b = `abc
            zzz
            abc
            zzz
            ghi`;
    let acutal = ld.diff(a,b);
    let expected = [ [[1,1],[3,3]],  [[1,1],[3,3]] ];
    assert.deepEqual(acutal, expected);
});

QUnit.test('Line Test case 2: Insertion, Deletion, and Change', function(assert) {
    let ld = new LineDiff();
    let a = `abc
            def

            abc

            def
            ghi`
    let b = `xyz

            abc
            def

            zzz
            ghi`;
    let acutal = ld.diff(a,b);
    let expected = [ [[0,0],[4,5]],  [[0,1],[4,4]] ];
    assert.deepEqual(acutal, expected);
});

QUnit.test('Line Test case 3: Multiline ', function(assert) {
    let ld = new LineDiff();
    let a = `This part of the
document has stayed the
same from version to
version.  It shouldn\'t
be shown if it doesn\'t
change.  Otherwise, that
would not be helping to
compress the size of the
changes.

This paragraph contains
text that is outdated.
It will be deleted in the
near future.

It is important to spell
check this dokument. On
the other hand, a
misspelled word isn\'t
the end of the world.
Nothing in the rest of
this paragraph needs to
be changed. Things can
be added after it.`;


    let b = `This is an important
notice! It should
therefore be located at
the beginning of this
document!

This part of the
document has stayed the
same from version to
version.  It shouldn\'t
be shown if it doesn\'t
change.  Otherwise, that
would not be helping to
compress the size of the
changes.

It is important to spell
check this document. On
the other hand, a
misspelled word isn\'t
the end of the world.
Nothing in the rest of
this paragraph needs to
be changed. Things can
be added after it.

This paragraph contains
important new additions
to this document.;`

    let acutal = ld.diff(a,b);
    let expected = [ [[0,5],[17,17],[25,28]],  [[9,13],[16,16]] ];
    assert.deepEqual(acutal, expected);
});

QUnit.test('Line Test case 4: Oooga', function(assert) {
    let ld = new LineDiff();
    let a = `Oooga
Oooga
Oooga
Oooga
Oooga`
    let b = `Oooga
Oooga
Booga
Oooga
Oooga`
    let acutal = ld.diff(a,b);
    let expected = [ [[2,2]], [[2,2]] ];
    assert.deepEqual(acutal, expected);
});
