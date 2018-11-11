//step 3 lines added
var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');


var express = require('express')
var app = express()
var port = process.env.PORT || 8000

app.disable('x-powered-by')

//step 3 addition allows the path to get all the information added in the newly 
//created guests.json file.  
app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

//step 4 adding the ability to access individual items from the guests.json file 
app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON){
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

//step 2
// app.get('/guests', function(req, res) {
//   var guests = ['Mary', 'Don']
//   res.send(guests)
// })

//step 2
app.use(function(req, res ) {
  res.sendStatus(404)
})


// step 1 changed in step 2 old combination of .get and .use
// app.use(function(req, res) {
//   var guests = ['Mary', 'Don']
//   res.send(guests)
// })








app.listen(port, function() {
  console.log('Listening on port', port)
})

