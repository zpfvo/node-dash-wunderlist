//warning this may trigger multiple times for one press
//...usually triggers twice based on testing for each press
var conf = require('./conf.js');
var dash_button = require('node-dash-button');
var dash = dash_button("00:bb:3a:a0:e5:ac", null, null, 'all'); //address from step above
var WunderlistSDK = require('wunderlist');
var wunderlistAPI = new WunderlistSDK(conf.wunderlist_auth);
var TasksService = require('./node_modules/wunderlist/public/services/Tasks');
var tasks = new TasksService();
// wunderlistAPI.http.lists.all()
//   .done(function (lists) {
//     console.log(lists)
//   })

var create_test =  task.create({
      'list_id': 271721562,
      'title': 'Test :)'
    })
    .done(function (taskData, statusCode) {
      // ...
    })
    .fail(function (resp, code) {
      // ...
    });


dash.on("detected", function (){
    console.log("omg found");
    create_test();
});
