var irish = require('./irish');

function func1(f) {
	//console.log(testSuites);
	f(0, 'foo');
	return 'hello';
}

function callback() {
	console.log('hello!!');
}

var x = false;
function async() {
	setTimeout(function() {x= true;}, 200);
	return x;
}

var t1 = new irish.Test('hello world');
t1.invoke(func1).passArgs(callback);
t1.expect.returnOfType('string');
t1.expect.returnEqualTo('hello');
t1.expect.callbackWithArgs(0);
t1.expect.callbackWithArgsCount(2);
t1.run();

var t2 = new irish.Test('lalalala');
t2.invoke(func1).passArgs(callback);
t2.expect.returnLessThan(5);

//console.log(t1);
//console.log(t2.expect);

t2.run();

var t3 = new irish.Test('foobarbaz');
t3.invoke(async);
t3.expect.returnEqualTo(true);
t3.run();

//console.log(t1);