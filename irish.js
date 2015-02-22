var expectations = require('./expectations');
var descriptions = require('./descriptions');
require('./irish_base');

expectations.addPredicate('toBeAn', function(predicate) {
	this.expect(this.subject).toBeA(predicate);
});

expectations.addPredicate('toBeAtLeast', function(predicate) {
	this.expect(this.subject).not.toBeBelow(predicate);
});

expectations.addPredicate('toBeAtMost', function(predicate) {
	this.expect(this.subject).not.toBeAbove(predicate);
});

expectations.addPredicate('toExist', function() {
	this.expect(this.subject).not.toEqual(undefined);
});

expectations.addPredicate('toHaveAProperty', function(predicate) {
	this.expect(this.subject[predicate]).toExist();
	this.toHavePropertyPredicate = predicate;
	return this;
});

expectations.addPredicate('toReturn', function(predicate) {
	this.expect(this.subject).toBeA('function');
	this.expect(this.subject()).toEqual(predicate);
});

expectations.addPredicate('toReturnA', function(predicate) {
	this.expect(this.subject).toBeA('function');
	this.expect(this.subject()).toBeA(predicate);
});

expectations.addPredicate('toReturnAn', function(predicate) {
	this.expect(this.subject).toReturnA(predicate);
});

expectations.addPredicate('toThrow', function(predicate) {
	this.expect(this.subject).toBeA('function');
	try {
		this.subject();
		this.expect(true).toBe(false);
	}
	catch(err) {
		this.expect(err).toEqual(predicate);
	}
});

expectations.addPredicate('toThrowA', function(predicate) {
	this.expect(this.subject).toBeA('function');
	try {
		this.subject();
		this.expect(true).toBe(false);
	}
	catch(err) {
		this.expect(err).toBeA(predicate);
	}
});

expectations.addPredicate('toThrowAn', function(predicate) {
	this.expect(this.subject).toThrowA(predicate);
});

expectations.addPredicate('withValue', function(predicate) {
	if(this.toHavePropertyPredicate) {
		this.expect(this.subject[this.toHavePropertyPredicate]).toEqual(predicate);
	}
	else {
		throw new SyntaxError('malformed expression.');
	}
});

exports.suite = descriptions.suite;
exports.describe = descriptions.describe;
exports.addPredicate = expectations.addPredicate;