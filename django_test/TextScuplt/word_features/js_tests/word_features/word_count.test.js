/* global QUnit */

QUnit.test( "a basic test example", function( assert ) {
    var value = "hello";
    assert.equal( value, "hello", "We expect value to be hello" );
});

QUnit.module("Word count");
QUnit.test( "Word count of empty string is 0", function( assert ) {
    var inputString = "";
    var count = wordCount(inputString);
    assert.equal(count, 0);
});