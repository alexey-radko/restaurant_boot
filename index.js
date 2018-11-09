"use strict";

const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

// process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

restService.post("/", function(req, res) {
  const agent = new WebhookClient({ req, res });
  console.log('Dialogflow Request headers: ' + JSON.stringify(requesreq.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(requesreq.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

function createBooking(agent) {
    let guests = agent.parameters.guests;
    let time = new Date(agent.parameters.time);
    let date = new Date(agent.parameters.date);
    let bookingDate = new Date(date);
    bookingDate.setHours(time.getHours());
    bookingDate.setMinutes(time.getMinutes());
    let now = new Date();
        
    if (guests < 1){
        agent.add('You need to reserve a table for at least one person. Please try again!');
    } else if (bookingDate < now){
        agent.add(`You can't make a reservation in the past. Please try again!`);
    } else if (bookingDate.getFullYear() > now.getFullYear()) {
        agent.add(`You can't make a reservation for ${bookingDate.getFullYear()} yet. Please choose a date in ${now.getFullYear()}.`);
    } else {
        let timezone = parseInt(agent.parameters.time.toString().slice(19,22));
        bookingDate.setHours(bookingDate.getHours() + timezone);
        agent.add(`You have successfully booked a table for ${guests} guests on ${bookingDate.toString().slice(0,21)}`);
        agent.add('See you at the restaurant!');
        agent.add('Have a wonderful day!');
    }
 }

  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('restaurant.booking.create', createBooking);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});


 

 
