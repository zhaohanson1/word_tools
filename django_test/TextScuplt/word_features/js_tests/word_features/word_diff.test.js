QUnit.module("Word Diff");

QUnit.test('No difference', function(assert) {
    var text1 = 'Hello World!';
    var text2 = 'Hello World!';
});


QUnit.test('Basic use case', function(assert) {
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

    assert.equal(tmp.diff(a,b), 0);
});