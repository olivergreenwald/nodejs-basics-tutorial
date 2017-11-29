//Overall --> implements routing

//gives us helper functions to work with urls
var url = require('url');
var fs = require('fs');

//how to render html function
function renderHTML(path, response) {
    fs.readFile(path, null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

module.exports = {
  handleRequest: function(request, response) {
      //sets header
      response.writeHead(200, {'Content-Type': 'text/html'});
      //check which url the user entered
      //store path in a variable
      var path = url.parse(request.url).pathname;
      switch (path) {
          //root directory route
          case '/':
              //tells which file to show html of
              renderHTML('./index.html', response);
              break;
          //login route
          case '/login':
              //tells which file to show html of
              renderHTML('./login.html', response);
              break;
          //if user enters anything else, it will come back with error
          default:
              response.writeHead(404);
              response.write('Route not defined');
              response.end();
      }

  }
};