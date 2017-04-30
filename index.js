'use strict';
var express = require('express');
var os = require('os');
var useragent = require('useragent');
var publicIp = require('public-ip');

useragent(true);

var app = express();
var ifaces = os.networkInterfaces();
var obj = {};

// parses public ip, depending in it being either v4 or v6
publicIp.v4().then(function (ip) {
    obj.ipaddress = ip;
});

publicIp.v6().then(function (ip) {
    obj.ipaddress = ip;
});


app.get('/', function(req, res) {
  
  // parses browser's selected language
  let lang = req.headers["accept-language"];
  lang = lang.slice(0, lang.indexOf(','));
  obj['language'] = lang;
  
  // parses OS
  var agent = useragent.parse(req.headers['user-agent']);
  obj['software'] = agent.os.toString();
  res.send(obj);
});



app.listen(process.env.PORT || 3000, function(){
  console.log('Example app listening on port ' + process.env.PORT + '!');
})