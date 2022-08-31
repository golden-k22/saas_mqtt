'use strict'

var HOST = 'wss://localhost'

var mqtt = require('mqtt')
var path = require('path')
const serverConfig = require("./config.js");
// var fs = require('fs')
// var KEY = fs.readFileSync('cert/tls-key.pem')
// var CERT = fs.readFileSync('cert/tls-cert.pem')




const tcpPort = serverConfig.TCPPORT;
const wsPort = serverConfig.WSPORT;
const wssPort = serverConfig.WSSPORT;
var PORT = wssPort;

var options = {
  // key: KEY,
  // cert: CERT,
  protocol: 'wss',
  rejectUnauthorized: false
}

var client = mqtt.connect(HOST+':'+PORT, options)
console.log("hello");

client.subscribe('messages')
client.publish('messages', 'Current time is: ' + new Date())
// client.on('message', function (topic, message) {
//   console.log(message)
// })
client.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
})

client.on('connect', function () {
  console.log('Connected')
})
