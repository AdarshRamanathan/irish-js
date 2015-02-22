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

function suite(_irishjs_suiteDescription, _irishjs_suiteSpec) {
	var _irishjs_tests = [];
	var _irishjs_beforeEach, _irishjs_afterEach;
	var _irishjs_result;
	
	var test = function(testDescription, testSpec) {
		var t = new Test(testDescription, testSpec);
		_irishjs_tests.push(t);
		_irishjs_beforeEach && _irishjs_beforeEach();
		t.run();
		_irishjs_afterEach && _irishjs_afterEach();
	};
	
	var it = test;
	
	var beforeEach = function(func) {
		if(typeof(func) == 'function') {
			_irishjs_beforeEach = func;
		}
		else {
			throw new TypeError('expected a function.');
		}
	};
	
	var afterEach = function(func) {
		if(typeof(func) == 'function') {
			_irishjs_afterEach = func;
		}
		else {
			throw new TypeError('expected a function.');
		}
	};
	
	var expect = expectations.expect;
	
	var _irishjs_runSuite = function() {
		if(typeof(_irishjs_suiteSpec) != 'function') {
			throw new TypeError('expected a function.');
		}
		
		eval('(' + _irishjs_suiteSpec.toString() + ')();');
		
		_irishjs_result = true;
		for(i = 0 ; i < _irishjs_tests.length && _irishjs_result ; i++) {
			_irishjs_result = _irishjs_tests[i].result;
		}
	};
	
	_irishjs_runSuite();
	
	return {
		name: _irishjs_suiteDescription,
		tests: _irishjs_tests,
		result: _irishjs_result
	};
}

exports.suite = suite;
exports.describe = suite;