var expectations = require('./expectations');

expectations.addPredicate('toBe', function(predicate) {
	this.evaluate(typeof(this.subject) === predicate);
});

expectations.addPredicate('toBeA', function(predicate) {
	this.evaluate(typeof(this.subject) == predicate || (typeof(predicate) == 'function' && this.subject instanceof predicate));
});

expectations.addPredicate('toEqual', function(predicate) {
	console.log(this);
	this.evaluate(this.subject == predicate);
});

expectations.addPredicate('toBeAbove', function(predicate) {
	this.evaluate(this.subject > predicate);
});

expectations.addPredicate('toBeBelow', function(predicate) {
	this.evaluate(this.subject < predicate);
});