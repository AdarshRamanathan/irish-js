var expectations = require('./expectations');

function Test(testDescription, testSpec) {
	this.testDescription = testDescription;
	this.testSpec = testSpec;
}

Test.prototype.run = function() {
	try {
		this.testSpec && this.testSpec();
		this.result = true;
	}
	catch(err) {
		if(err instanceof expectations.AssertionError) {
			this.result = false;
		}
		else {
			throw err;
		}
	}
};

function Suite(suiteDescription, suiteSpec) {
	this.suiteDescription = suiteDescription;
	this.suiteSpec = suiteSpec;
	this.tests = [];
}

Suite.prototype.run = function() {
	this.suiteSpec && this.suiteSpec();
	
	this.result = true;
	for(i = 0 ; i < this.tests.length && this.result ; i++) {
		this.result = this.tests[i].result;
	}
};

function describe(suiteDescription, suiteSpec) {
	
	var s = new Suite(suiteDescription, suiteSpec);
	
	it = function(testDescription, testSpec) {
		expect = expectations.expect;
		
		var t = new Test(testDescription, testSpec);
		s.tests.push(t);
		s.beforeEach && s.beforeEach();
		t.run();
		s.afterEach && s.afterEach();
	};
	
	beforeEach = function(func) {
		if(typeof(func) == 'function') {
			s.beforeEach = func;
		}
		else {
			throw new TypeError('expected a function.');
		}
	};
	
	afterEach = function(func) {
		if(typeof(func) == 'function') {
			s.afterEach = func;
		}
		else {
			throw new TypeError('expected a function.');
		}
	};
	
	s.run();
	
	return s;
}

exports.describe = describe;