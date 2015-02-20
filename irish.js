var expectations = require('./expectations');
var descriptions = require('./descriptions');
require('./irish_base');

expectations.addPredicate('toBeAn', function(predicate) {
	expectations.expect(this.subject).toBeA(predicate);
});

expectations.addPredicate('toBeAtLeast', function(predicate) {
	expectations.expect(this.subject).not.toBeBelow(predicate);
});

expectations.addPredicate('toBeAtMost', function(predicate) {
	expectations.expect(this.subject).not.toBeAbove(predicate);
});

expectations.addPredicate('toExist', function() {
	expectations.expect(this.subject).not.toBeA('undefined');
});

expectations.addPredicate('toHaveProperty', function(predicate) {
	expectations.expect(this.subject[predicate]).not.toExist();
	this.toHavePropertyPredicate = predicate;
	return this;
});

expectations.addPredicate('withValue', function(predicate) {
	if(this.toHavePropertyPredicate) {
		expectations.expect(this.subject[this.toHavePropertyPredicate]).toEqual(predicate);
	}
	else {
		throw new SyntaxError('malformed expression.');
	}
});

expectations.addPredicate('toReturn', function(predicate) {
	expectations.expect(this.subject).toBeA('function');
	expectations.expect(this.subject()).toEqual(predicate);
});

expectations.addPredicate('toReturnA', function(predicate) {
	expectations.expect(this.subject).toBeA('function');
	expectations.expect(this.subject()).toBeA(predicate);
});

expectations.addPredicate('toReturnAn', function(predicate) {
	expectations.expect(this.subject).toReturnA(predicate);
});

expectations.addPredicate('toThrow', function(predicate) {
	expectations.expect(this.subject).toBeA('function');
	try {
		this.subject();
		expectations.expect(true).toBe(false);
	}
	catch(err) {
		expectations.expect(err).toEqual(predicate);
	}
});

expectations.addPredicate('toThrowA', function(predicate) {
	expectations.expect(this.subject).toBeA('function');
	try {
		this.subject();
		expectations.expect(true).toBe(false);
	}
	catch(err) {
		expectations.expect(err).toBeA(predicate);
	}
});

expectations.addPredicate('toThrowAn', function(predicate) {
	expectations.expect(this.subject).toThrowA(predicate);
});

exports.describe = descriptions.describe;
exports.addPredicate = expectations.addPredicate;