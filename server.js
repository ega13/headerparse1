
var path = require('path');
var accepts = require('accepts');
var express = require('express');
var useragent = require('express-useragent');
var app = express();


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(useragent.express());

// routing
app.get("/", function (req, res) {
  res.redirect('/api/whoami');
  // response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
  var lang = accepts(req);
  var soft = "OS: " + req.useragent.os + ", Browser: " +req.useragent.browser;
  var ipadr = req.ip;
  res.json({
    "ipaddress": ipadr,
    "language": lang.languages()[0],
    "software": soft
  }).end();
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
