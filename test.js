var expectation_import = require('./expectation');

function Test(testName) {
	this.testName = testName;
	this.expect = new expectation_import.Expectation(this);
	this.timeout = 2000;
	this.stdout = console.log;
	this.stderr	 = console.log;
}

Test.prototype.before = function(func) {
	if(typeof(func) == 'function') {
		this.setUp = func;
	}
}

Test.prototype.after = function(func) {
	if(typeof(func) == 'function') {
		this.tearDown = func;
	}
}

Test.prototype.invoke = function(func) {
	if(typeof(func) == 'function') {
		this.invokable = func;
	}
	return this;
}

Test.prototype.passArgs = function() {
	if(typeof(this.invokable) == 'function') {
		this.parameters = arguments;
	}
	else {
		var err = new SyntaxError();
		err.message = 'cannot pass arguments - invocation target is ' + typeof(this.invokable) + '.';
		throw err;
	}
	return this;
}

Test.prototype.run = function() {
	this.setUp && this.setUp();
	
	//set a timeout
	this.asyncTimer = setTimeout(this.timeoutNotification, this.timeout);
	//run the tests
	this.expect && this.expect.evaluate();
	
	this.tearDown && this.tearDown();
}

Test.prototype.done = function(expectationResult) {
	var flag = true;
	for(i = 0 ; i < expectationResult.length ; i++) {
		flag = flag && expectationResult[i];
	}
	
	clearTimeout(this.asyncTimer);
	if(flag) {
		this.passingNotification();
	}
	else {
		this.failureNotification();
	}
}

Test.prototype.timeoutNotification = function() {
	this.stdout({result: 'time', expectation: this.expect});
}

Test.prototype.passingNotification = function() {
	this.stdout({result: 'pass', expectation: this.expect});
}

Test.prototype.failureNotification = function() {
	this.stdout({result: 'fail', expectation: this.expect});
}

Test.prototype.exceptionNotification = function(err) {
	clearTimeout(this.asyncTimer);
	this.stdout({result: 'error', expectation: this.expect});
}

exports.Test = Test;