function AssertionError(message) {
	this.name = 'AssertionError';
	this.message = message || 'an assertion failed.';
}

function assert(boolExpr) {
	if(!boolExpr) {
		throw new AssertionError();
	}
}

function Expectation(subject, parent) {
	this.subject = subject;
	this.negation = ((parent) ? (parent.negation) : (false));
	
	Object.defineProperty(this, 'not', {
		get: function() {
			this.negation = !this.negation;
			return this;
		}
	});
}

Expectation.addPredicate = function(predicateName, predicateFunc) {
	if(typeof(predicateName) == 'string' && typeof(predicateFunc) == 'function') {
		Expectation.prototype[predicateName] = predicateFunc;
	}
	else {
		throw new TypeError('expected a string and a function.');
	}
}

Expectation.prototype.evaluate = function(boolExpr) {
	assert(boolExpr ^ this.negation);
};

function expect(subject, parent) {
	return new Expectation(subject, parent);
}

exports.AssertionError = AssertionError;
exports.expect = expect;
exports.addPredicate = Expectation.addPredicate;