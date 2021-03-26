QUnit.module('Word Replace Next');

QUnit.test('Nothing to replace', function(assert) {
    var inputText = 'Hello World!';
    var expectedText = 'Hello World!';

    assert.equal(replaceNext(inputText, 0, '', 'A'), expectedText);
    assert.equal(replaceNext(inputText, 1, '', 'A'), expectedText);
});


QUnit.test('Simple replacement', function(assert) {
    var inputText = 'foobar';
    var expectedText = 'fooqux';
    assert.equal(replaceNext(inputText, 0, 'bar', 'qux'), expectedText);
});


QUnit.test('Replace offset', function(assert) {
    var inputText = 'foobarbar';
    var expectedText = 'fooquxbar';
    assert.equal(replaceNext(inputText, 3, 'bar', 'qux'), expectedText);

    expectedText = 'foobarqux';
    assert.equal(replaceNext(inputText, 6, 'bar', 'qux'), expectedText);
});


QUnit.test('Negative offest treated as 0', function(assert) {
    /** String.substring treats negatives as zero **/
    var inputText = 'foobar';
    var expectedText = 'fooqux';
    assert.equal(replaceNext(inputText, -1, 'bar', 'qux'), expectedText);
});



QUnit.module('Word Replace All');

QUnit.test('Nothing to replace', function(assert) {
    var inputText = 'Hello World!';
    var expectedText = 'Hello World!';
    assert.equal(replaceAll(inputText, '', 'A'), expectedText);
});


QUnit.test('Single replacement', function(assert) {
    var inputText = 'foobar';
    var expectedText = 'fooqux';
    assert.equal(replaceAll(inputText, 'bar', 'qux'), expectedText);
});


QUnit.test('Multiple replacements', function(assert) {
    var inputText = 'foobarfoobarfoobar';
    var expectedText = 'fooquxfooquxfooqux';
    assert.equal(replaceAll(inputText, 'bar', 'qux'), expectedText);

    var inputText = 'barbarbarbar';
    var expectedText = 'barbar';
    assert.equal(replaceAll(inputText, 'barb', 'b'), expectedText);
});


QUnit.test('Test regexp', function(assert) {

    var inputText = 'foobar';
    var expectedText = 'febar';
    assert.equal(regexReplaceAll(inputText, 'o+', 'e'), expectedText);

    var inputText = 'foob[aor';
    var expectedText = 'foober';
    assert.equal(regexReplaceAll(inputText, '[ao', 'e'), expectedText);
    
    var inputText = 'foobar';
    var expectedText = 'feeber';
    assert.equal(regexReplaceAll(inputText, '[ao]', 'e'), expectedText);

    var inputText = 'foobar123';
    var expectedText = 'foobareee';
    assert.equal(regexReplaceAll(inputText, '\\d', 'e'), expectedText);

    
});
