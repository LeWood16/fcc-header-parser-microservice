'use strict';
var express = require('express');
var os = require('os');
var useragent = require('useragent');
useragent(true);

var app = express();
var ifaces = os.networkInterfaces();
var obj = {};


// get browser's ip information, then store in in obj
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      obj.ifname = alias;
      obj.ipaddress = iface.address;
    } else {
      // this interface has only one ipv4 adress
      obj.ipaddress = iface.address;
    }
    ++alias;
  });
});
    


app.get('/', function(req, res) {
  
  // parse browser's selected language
  let lang = req.headers["accept-language"];
  lang = lang.slice(0, lang.indexOf(','));
  obj['language'] = lang;
  
  // parse OS
  var agent = useragent.parse(req.headers['user-agent']);
  obj['software'] = agent.os.toString();
  res.send(obj);
});



app.listen(process.env.PORT || 3000, function(){
  console.log('Example app listening on port ' + process.env.PORT + '!');
})