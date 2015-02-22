var expectations = require('./expectations');
var descriptions = require('./descriptions');
require('./irish_base');

expectations.addPredicate('toBeAn', function(predicate) {
	expectations.expect(this.subject, this).toBeA(predicate);
});

expectations.addPredicate('toBeAtLeast', function(predicate) {
	expectations.expect(this.subject, this).not.toBeBelow(predicate);
});

expectations.addPredicate('toBeAtMost', function(predicate) {
	expectations.expect(this.subject, this).not.toBeAbove(predicate);
});

expectations.addPredicate('toExist', function() {
	expectations.expect(this.subject, this).not.toEqual(undefined);
});

expectations.addPredicate('toHaveAProperty', function(predicate) {
	expectations.expect(this.subject[predicate], this).not.toExist();
	this.toHavePropertyPredicate = predicate;
	return this;
});

expectations.addPredicate('toReturn', function(predicate) {
	expectations.expect(this.subject, this).toBeA('function');
	expectations.expect(this.subject(), this).toEqual(predicate);
});

expectations.addPredicate('toReturnA', function(predicate) {
	expectations.expect(this.subject, this).toBeA('function');
	expectations.expect(this.subject(), this).toBeA(predicate);
});

expectations.addPredicate('toReturnAn', function(predicate) {
	expectations.expect(this.subject, this).toReturnA(predicate);
});

expectations.addPredicate('toThrow', function(predicate) {
	expectations.expect(this.subject, this).toBeA('function');
	try {
		this.subject();
		expectations.expect(true, this).toBe(false);
	}
	catch(err) {
		expectations.expect(err, this).toEqual(predicate);
	}
});

expectations.addPredicate('toThrowA', function(predicate) {
	expectations.expect(this.subject, this).toBeA('function');
	try {
		this.subject();
		expectations.expect(true, this).toBe(false);
	}
	catch(err) {
		expectations.expect(err, this).toBeA(predicate);
	}
});

expectations.addPredicate('toThrowAn', function(predicate) {
	expectations.expect(this.subject, this).toThrowA(predicate);
});

expectations.addPredicate('withValue', function(predicate) {
	if(this.toHavePropertyPredicate) {
		expectations.expect(this.subject[this.toHavePropertyPredicate], this).toEqual(predicate);
	}
	else {
		throw new SyntaxError('malformed expression.');
	}
});

exports.suite = descriptions.suite;
exports.describe = descriptions.describe;
exports.addPredicate = expectations.addPredicate;