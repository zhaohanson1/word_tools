/* global QUnit */


QUnit.module('Word count');

QUnit.test( 'Hello world!', function( assert ) {
    var inputString = 'Hello world!';
    var count = wordCount(inputString);
    assert.equal(count, 2);
});

QUnit.test( 'Empty string', function( assert ) {
    var inputString = '';
    var count = wordCount(inputString);
    assert.equal(count, 0);
});

QUnit.test( 'Single character', function( assert ) {
    var inputString = 'A';
    var count = wordCount(inputString);
    assert.equal(count, 1);
});

QUnit.test( 'Whitespaces', function( assert ) {
    
    var count = wordCount('           ');
    assert.equal(count, 0);

    var count = wordCount('    foo    ');
    assert.equal(count, 1);

    var count = wordCount('foo        ');
    assert.equal(count, 1);

    var count = wordCount('        foo');
    assert.equal(count, 1);
});

QUnit.test( 'Multiline strings', function( assert ) {
    var inputString = 'foo\nbar';
    var count = wordCount(inputString);
    assert.equal(count, 2);

    inputString = 'foo\n\n\nbar';
    var count = wordCount(inputString);
    assert.equal(count, 2);

    inputString = 'foo\nbar\nbaz';
    var count = wordCount(inputString);
    assert.equal(count, 3);
});

QUnit.test( 'Non-strings should return invalid', function( assert ) {
    
    var count = wordCount(0);
    assert.equal(count, -1);

    count = wordCount({'foo': 'bar'});
    assert.equal(count, -1);

    count = wordCount(null);
    assert.equal(count, -1);

    count = wordCount(()=>{});
    assert.equal(count, -1);

    count = wordCount(true);
    assert.equal(count, -1);

    count = wordCount(undefined);
    assert.equal(count, -1);

    count = wordCount(Symbol('foo'));
    assert.equal(count, -1);
});

QUnit.test( 'Lorum ipsum', function( assert ) {
    var inputString = 'Lorem ipsum dolor sit amet, consectetur adipiscing ' +
    'elit. Nam sollicitudin ac leo at mattis. Cras elementum nisi a quam ' +
    'pulvinar venenatis. Etiam vitae ultricies mi. Vivamus lectus massa, '+
    'hendrerit volutpat orci sed, hendrerit scelerisque tellus. Vivamus ' +
    'egestas in mi sit amet consectetur. Nam a venenatis nunc, sed posuere ' +
    'sapien. Aliquam molestie arcu a tortor lobortis mattis. Mauris vitae ' +
    'lobortis augue, nec dictum lorem. Integer sit amet quam eu dui ' +
    'tincidunt consectetur. Sed convallis, purus sed semper porttitor, ' +
    'sapien orci accumsan felis, mattis malesuada sapien odio pulvinar ' +
    'erat. Nunc mollis id ante eget aliquam. Vestibulum a lacinia tortor. ' +
    'Nulla vel convallis.';

    var count = wordCount(inputString);
    assert.equal(count, 100);
});