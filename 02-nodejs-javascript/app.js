//Core module --> don't have to specify a path
//Through this variable, we can access all the fucntions and variables
var http = require('http');

//We can create our own modules so that we can split up our code into different files
var module1 = require('./module1');
var module2 = require('./module2');

//You can delete the name below to make an anonymous function 
//Anonymous function is for when you want to do something once and never again (disappears after it runs)
function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(module2.myVariable);
    module2.myFunction();
    response.end();
}


http.createServer(onRequest).listen(8000);