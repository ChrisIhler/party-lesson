//step 3 lines added
var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');


var express = require('express')
var app = express()
var port = process.env.PORT || 8000

app.disable('x-powered-by')

//step 3 addition. 
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

