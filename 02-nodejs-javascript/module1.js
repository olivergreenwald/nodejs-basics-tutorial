function myFunction() {
    console.log('Function was called');
}

var myString = 'String!';

//To make this function and string available outisde this file, we can export them
module.exports.myFunction = myFunction;
module.exports.myString = myString;