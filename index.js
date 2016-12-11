'use strict';
//warning this may trigger multiple times for one press
//...usually triggers twice based on testing for each press
var conf = require('./conf.js')
var dash_button = require('node-dash-button')
var dash = dash_button("00:bb:3a:a0:e5:ac", null, null, 'all') //address from step above
import Wunderlist from 'wunderlist-api'

const listTitle = conf.params.listTitle
const newItem = conf.params.newItem
const state = conf.params.state
const starred = conf.params.starred
var revision = 0
var listID = 0

const wunderlist = new Wunderlist({
  clientId: conf.wunderlist_auth.clientID,
  accessToken: conf.wunderlist_auth.accessToken
})

var addItem = () => {
  wunderlist.getLists()
    .then( response => {
      // response
      var lists = JSON.parse(response.body)
      for(var i=0; i<lists.length; i++){
          i == 0 ? console.log('lists found:'+ '\n\t' + lists[i].title)
                 : console.log('\t' + lists[i].title)
          if(lists[i].title == listTitle){
            listID = lists[i].id
            revision = lists[i].revision
          }
      }
      updateList()
    })
    .catch( error => {
      console.log('ERROR, could not get list!\n' + error)
    });
}

var updateList = () => {
  if(listID == 0){
    console.log('No list with title "' + listTitle +'" found!')
  }
  else{
    console.log('list: "' + listTitle + '" with ID ' + listID + ' found!')
    wunderlist.getTasks(listID)
      .then( response => {
        var item_titles = JSON.parse(response.body).map((item) => item['title'])
        console.log(item_titles)
        if (item_titles.indexOf(newItem) == -1) {
          wunderlist.createTask(listID, newItem, state, starred)
            .then( response => {
              console.log('list updated')
            })
            .catch( error => {
              console.log('list update failed')
            })
        } else {
          console.log('Item already in list')
        }
      })
      .catch( error => {
        console.error(error)
      })
  }
}

/*
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
*/

dash.on("detected", function (){
    console.log("omg found")
    addItem()
});
