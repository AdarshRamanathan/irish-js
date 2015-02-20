var describe = require('./irish').describe;

var x = describe('a test suite', function() {
	
	beforeEach(function() {
		console.log('before each');
	});
	
	afterEach(function() {
		console.log('after each');
	});
	
	var a = function() {
		throw new SyntaxError();
	};
	
	it('should print stuff', function() {
		expect(a).toThrowAn(Error);
	});
	
	it('should print more stuff', function() {
		expect('hello').toBeA('string');
		expect('boo').toReturn('boo');
	});
	
	it('should have property bob with value lol', function() {
		try {
			a();
		}
		catch(err) {
			expect(err).toHaveProperty('name').withValue('SyntaxError');
		}
	});
});

console.log(x);