QUnit.module('Word Replace');

QUnit.test('Nothing to replace', function(assert) {
    var inputText = 'Hello World!';
    var expectedText = 'Hello World!';

    assert.equal(wordReplace(inputText, '', 'A'), expectedText);
});

QUnit.test('Empty input', function(assert) {
    var inputText = '';
    var expectedText = '';
    assert.equal(wordReplace(inputText, 'foo', 'bar'), expectedText);
});

QUnit.test('Empty replacement string', function(assert) {
    var inputText = 'foobar';
    var expectedText = 'bar';
    assert.equal(wordReplace(inputText, 'foo', ''), expectedText);
});

QUnit.test('Simple replacement', function(assert) {
    var inputText = 'foobar';
    var expectedText = 'foobaz';
    assert.equal(wordReplace(inputText, 'bar', 'baz'), expectedText);
});


QUnit.test('Replace multiple instances', function(assert) {
    var inputText = 'foobarfoobarfoobar';
    var expectedText = 'foobazfoobazfoobaz';
    assert.equal(wordReplace(inputText, 'bar', 'baz'), expectedText);

    var inputText = 'barbarbarbar';
    var expectedText = 'barbar';
    assert.equal(wordReplace(inputText, 'barb', 'b'), expectedText);
});


QUnit.test('Test regexp', function(assert) {
    var inputText = 'foobar';
    var expectedText = 'feeber';
    assert.equal(wordReplace(inputText, '[ao]', 'e'), expectedText);

    var inputText = 'foobar123';
    var expectedText = 'foobareee';
    assert.equal(wordReplace(inputText, '\\d', 'e'), expectedText);
});