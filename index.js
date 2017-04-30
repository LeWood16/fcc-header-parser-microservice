'use strict';
var express = require('express');
var os = require('os');
var app = express();
    
    

app.get('/', function(req, res) {
  res.send('Hello, World!');
});


app.listen(process.env.PORT || 3000, function(){
  console.log('Example app listening on port ' + process.env.PORT + '!');
})