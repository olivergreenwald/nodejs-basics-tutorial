var http = require('http');
//file system module --> can read a file into our application and send to client
var fs = require('fs');

function onRequest(request, response) {
    //text/html tells program you are using html and to render it that way
    response.writeHead(200, {'Content-Type': 'text/html'});
    //Arguments for readFile method
    //First argument = path of file
    //Second argument = options
    //Third argument = Call back w/ error and data if successful
    fs.readFile('./index.html', null, function(error, data) {
        //To cover if there is an error
        if (error) {
            //not found response
            response.writeHead(404);
            response.write('File not found!');
        //no error case
        } else {
            //writing data we get (html file)
            response.write(data);
        }
        response.end();
    });
}

http.createServer(onRequest).listen(8000);