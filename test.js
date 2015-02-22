var suite = require('./irish').suite;

var x = suite('a test suite', function() {
	
	var a = function() {
		throw new SyntaxError();
	};
	
	test('should throw an error', function() {
		expect(a).toThrowAn(Error);
	});
	
	var b;
	
	test('should exist', function() {
		expect(b).not.toExist();
	});
	
	test('should have property name with value SyntaxError', function() {
		try {
			a();
		}
		catch(err) {
			expect(err).toHaveAProperty('name').withValue('SyntaxError');
		}
	});
});

console.log(x);