var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
var graphs = require('./graph.js');
app.use('/graph', graphs);

app.put('/', function(req, res){
    console.log('request recieved (index):', req.body);
    res.send("Done");
});

app.listen(3000, 'localhost', function() {
    console.log('Server running on port 3000');
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;