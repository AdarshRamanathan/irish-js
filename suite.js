function Suite(suiteName) {
	this.suiteName = suiteName;
	this.testCases = [];
}

Suite.prototype.before = function(func) {
	if(typeof(func) == 'function') {
		this.setUp = func;
	}
}

Suite.prototype.beforeEach = function(func) {
	if(typeof(func) == 'function') {
		this.setUpEach = func;
	}
}

Suite.prototype.afterEach = function(func) {
	if(typeof(func) == 'function') {
		this.tearDownEach = func;
	}
}

Suite.prototype.after = function(func) {
	if(typeof(func) == 'function') {
		this.tearDown = func;
	}
}

Suite.prototype.addTest = function(testCase) {
	if(testCase && testCase instanceof Test) {
		this.testCases[this.testCases.length] = testCase;
	}
}

Suite.prototype.run = function() {
	this.setUp && this.setUp();
	
	for(i = 0 ; i < testCases.length ; i++) {
		this.setUpEach && this.setUpEach();
		
		testCases[i].run();
		
		this.tearDownEach && this.tearDownEach();
	}
	
	this.tearDown && this.tearDown();
}

exports.Suite = Suite;