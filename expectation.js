function Expectation(parentTest) {
	this.parentTest = parentTest;
	this.expectationType = [];
	this.expectedValue = [];
	this.expectationResult = [];
}


//different expectations
//function return expectations
Expectation.prototype.returnOfType = function(val) {
	this.expectationType[this.expectationType.length] = 'returnOfType';
	this.expectedValue[this.expectedValue.length] = val;
	this.expectationResult.length++;
}

Expectation.prototype.returnsEqualTo = function(val) {
	this.expectationType[this.expectationType.length] = 'returnEqualTo';
	this.expectedValue[this.expectedValue.length] = val;
	this.expectationResult.length++;
}

Expectation.prototype.returnsLessThan = function(val) {
	this.expectationType[this.expectationType.length] = 'returnLessThan';
	this.expectedValue[this.expectedValue.length] = val;
	this.expectationResult.length++;
}

Expectation.prototype.returnLessThanOrEqualTo = function(val) {
	this.expectationType[this.expectationType.length] = 'returnLessThanOrEqualTo';
	this.expectedValue[this.expectedValue.length] = val;
	this.expectationResult.length++;
}

Expectation.prototype.returnGreaterThan = function(val) {
	this.expectationType[this.expectationType.length] = 'returnGreaterThan';
	this.expectedValue[this.expectedValue.length] = val;
	this.expectationResult.length++;
}

Expectation.prototype.returnGreaterThanOrEqualTo = function(val) {
	this.expectationType[this.expectationType.length] = 'returnGreaterThanOrEqualTo';
	this.expectedValue[this.expectedValue.length] = val;
	this.expectationResult.length++;
}

//callback expectations
Expectation.prototype.callbackWithArgs = function() {
	this.expectationType[this.expectationType.length] = 'callbackWithArgs';
	this.expectedValue[this.expectedValue.length] = arguments;
	this.expectationResult.length++;
}

Expectation.prototype.callbackWithArgsCount = function(val) {
	this.expectationType[this.expectationType.length] = 'callbackWithArgsCount';
	this.expectedValue[this.expectedValue.length] = val;
	this.expectationResult.length++;
}

//callback function return expectations
Expectation.prototype.callbackReturnOfType = function(val) {
	this.expectationType[this.expectationType.length] = 'callbackReturnOfType';
	this.expectedValue[this.expectedValue.length] = val;
	this.expectationResult.length++;
}

Expectation.prototype.interceptCallback = function() {
	var func = this.parentTest.parameters[this.parentTest.parameters.length - 1];
	var exp = this;
	this.parentTest.parameters[this.parentTest.parameters.length - 1] = function() {
		//evaluate callback arguments expectations
		for(i = 0 ; i < exp.expectationType.length ; i++) {
			switch(exp.expectationType[i]) {
				case 'callbackWithArgs':
					exp.expectationResult[i] = arguments.length == exp.expectedValue[i].length;
					for(j = 0 ; j < arguments.length && exp.expectationResult[i] ; j++) {
						exp.expectationResult[i] = arguments[j] == exp.expectedValue[i][j];
					}
				break;
				case 'callbackWithArgsCount':
					exp.expectationResult[i] = arguments.length == exp.expectedValue[i];
				break;
				
				default:
					//do nothing, this expectation is probably handled elsewhere.
				break;
			}
		}
		
		var callbackReturn;
		try {
			callbackReturn = func();
		}
		catch(err) {
			exp.parentTest.exception(err);
			return;
		}
		
		//evaluate callback return expectations
		for(i = 0 ; i < exp.expectationType.length ; i++) {
			switch(exp.expectationType[i]) {
				case 'callbackReturnOfType':
					exp.expectationResult[i] = callbackReturn == expectedValue[i];
				break;
				
				default:
					//do nothing, this expectation is probably handled elsewhere.
				break;
			}
		}
		
		exp.done();
	}
}

Expectation.prototype.evaluate = function() {
	if(this.parentTest.parameters && this.parentTest.parameters.length > 0 && typeof(this.parentTest.parameters[this.parentTest.parameters.length - 1]) == 'function') {	//possible callback, override
		this.interceptCallback();
	}
	
	var returnedVal;
	try {
		returnedVal = this.parentTest.invokable.apply(this, this.parentTest.parameters);
	}
	catch(err) {
		this.parentTest.exceptionNotification(err);
		return;
	}
	
	for(i = 0 ; i < this.expectationType.length ; i++) {
		switch(this.expectationType[i]) {
			case 'returnEqualTo':
				this.expectationResult[i] = returnedVal === this.expectedValue[i];
			break;
			
			case 'returnOfType':
				this.expectationResult[i] = typeof(returnedVal) == this.expectedValue[i];
			break;
			
			default:
				//do nothing, this expectation is probably handled elsewhere.
			break;
		}
	}
	
	this.done();
}

Expectation.prototype.done = function() {
	//check if all expectations have been evaluated to either true or false
	//if yes, call parentTest.done
	for(i = 0 ; i < this.expectationResult.length ; i++) {
		if(typeof(this.expectationResult[i]) == 'undefined') {
			return;
		}
	}
	
	this.parentTest.done(this.expectationResult);
}

exports.Expectation = Expectation;