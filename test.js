var describe = require('./irish').describe;

var x = describe('a test suite', function() {
	
	var a = function() {
		throw new SyntaxError();
	};
	
	it('should throw an error', function() {
		expect(a).toThrowAn(Error);
	});
	
	var b = 34;
	
	it('should exist', function() {
		expect(b).not.toEqual(34);
	});
	
	it('should have property name with value SyntaxError', function() {
		try {
			a();
		}
		catch(err) {
			expect(err).toHaveAProperty('name').withValue('SyntaxError');
		}
	});
});

console.log(x);