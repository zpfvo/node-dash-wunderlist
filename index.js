'use strict';
//warning this may trigger multiple times for one press
//...usually triggers twice based on testing for each press
var conf = require('./conf.js');
var dash_button = require('node-dash-button');
var dash = dash_button("00:bb:3a:a0:e5:ac", null, null, 'all'); //address from step above


var request = require('request')

var create_task = {
  url: 'https://a.wunderlist.com/api/v1/tasks',
  method: 'PUT',
  headers: {
    'Content-Type':'application/json',
    'X-Client-ID': conf.wunderlist_auth.clientID,
    'X-Access-Token': conf.wunderlist_auth.accessToken
  }
  ,body: JSON.stringify({'list_id': 271721562, 'title': 'test'})
};

function callback(error, response, body) {
  console.log(response, body);
  if (!error && response.statusCode == 200) {
    console.log(body, response);
  }
}

//request(create_task, callback)
request(create_task, callback)



dash.on("detected", function (){
    console.log("omg found");
    create_test();
});
