var express = require('express');
var request = require('request');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/web'));

app.post('/resize', function(req, resp) {
  req.pipe(request('http://img-resize.com/resize')).pipe(resp);
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
