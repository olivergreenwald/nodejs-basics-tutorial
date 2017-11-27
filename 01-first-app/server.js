//This file will start a loop where Node.js will start

//Modules = importing a functionality we need
var http = require('http');


function onRequest(request, response) {
	//Sets header of response     Key            Value
    response.writeHead(200, {'Content-Type': 'text/plain'});
    //Render plain text to the screen
    response.write('Hello World');
    //Makes it clear that I am done with handling the response
    response.end();
}

//Creates a server,  listens to port 8000 
//onRequest = function to handle requests
http.createServer(onRequest).listen(8000);