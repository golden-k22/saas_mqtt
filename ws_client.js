'use strict'

var mqtt = require('mqtt')

var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

// This sample should be run in tandem with the aedes_server.js file.
// Simply run it:
// $ node aedes_server.js
//
// Then run this file in a separate console:
// $ node websocket_sample.js
//
var host = 'ws://localhost:8081'   // broker host

var options = {
  keepalive: 1,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'sensors',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  rejectUnauthorized: false
}

console.log('connecting mqtt client...')
var client = mqtt.connect(host)

client.on('error', function (err) {
  console.log(err)
  client.end()
})

client.on('connect', function () {
  console.log('client connected:' + clientId)
  // client.publish('presence', 'wss secure connection demo...!', { qos: 0, retain: false })
  client.subscribe('sensors/72170021', function (err) {
      if (!err) {
          // client.publish('presence', 'Hello mqtt')
      }
  })
})

client.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
})

client.on('close', function () {
  console.log(clientId + ' disconnected')
})
