/* global QUnit */


QUnit.module('Count');

QUnit.test('Hello world!', function(assert) {
    var inputString = 'Hello world!';
    var count = countWords(inputString);
    assert.equal(count, 2);
});

QUnit.test('Empty string', function(assert) {
    var inputString = '';
    var count = countWords(inputString);
    assert.equal(count, 0);
});

QUnit.test('Single character', function(assert) {
    var inputString = 'A';
    var count = countWords(inputString);
    assert.equal(count, 1);
});

QUnit.test('Whitespaces', function(assert) {

    var count = countWords('           ');
    assert.equal(count, 0);

    var count = countWords('    foo    ');
    assert.equal(count, 1);

    var count = countWords('foo        ');
    assert.equal(count, 1);

    var count = countWords('        foo');
    assert.equal(count, 1);
});

QUnit.test('Multiline strings', function(assert) {
    var inputString = 'foo\nbar';
    var count = countWords(inputString);
    assert.equal(count, 2);

    inputString = 'foo\n\n\nbar';
    var count = countWords(inputString);
    assert.equal(count, 2);

    inputString = 'foo\nbar\nbaz';
    var count = countWords(inputString);
    assert.equal(count, 3);
});

QUnit.test('Non-strings should return invalid', function(assert) {

    var count = countWords(0);
    assert.equal(count, -1);

    count = countWords({ 'foo': 'bar' });
    assert.equal(count, -1);

    count = countWords(null);
    assert.equal(count, -1);

    count = countWords(() => {});
    assert.equal(count, -1);

    count = countWords(true);
    assert.equal(count, -1);

    count = countWords(undefined);
    assert.equal(count, -1);

    count = countWords(Symbol('foo'));
    assert.equal(count, -1);
});

QUnit.test('Lorum ipsum', function(assert) {
    var inputString = 'Lorem ipsum dolor sit amet, consectetur adipiscing ' +
        'elit. Nam sollicitudin ac leo at mattis. Cras elementum nisi a quam ' +
        'pulvinar venenatis. Etiam vitae ultricies mi. Vivamus lectus massa, ' +
        'hendrerit volutpat orci sed, hendrerit scelerisque tellus. Vivamus ' +
        'egestas in mi sit amet consectetur. Nam a venenatis nunc, sed posuere ' +
        'sapien. Aliquam molestie arcu a tortor lobortis mattis. Mauris vitae ' +
        'lobortis augue, nec dictum lorem. Integer sit amet quam eu dui ' +
        'tincidunt consectetur. Sed convallis, purus sed semper porttitor, ' +
        'sapien orci accumsan felis, mattis malesuada sapien odio pulvinar ' +
        'erat. Nunc mollis id ante eget aliquam. Vestibulum a lacinia tortor. ' +
        'Nulla vel convallis.';

    var count = countWords(inputString);
    assert.equal(count, 100);
});

QUnit.test('Line Count', function(assert) {
    var inputString, count;

    inputString = 'Hello World!';
    count = countLines(inputString);
    assert.equal(count, 1);

    inputString = '';
    count = countLines(inputString);
    assert.equal(count, 0);

    inputString = 'Hello \nWorld!';
    count = countLines(inputString);
    assert.equal(count, 2);
})