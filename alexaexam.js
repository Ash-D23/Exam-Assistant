
'use strict';
const Alexa = require('alexa-sdk');
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: "us-east-1",
  apiVersion: "2012-08-10"
});

const SKILL_NAME = 'Exam Assiistant';

const HELP_MESSAGE = 'You can say tell me , or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


const handlers = {
    'LaunchRequest': function () {
       this.emit(':ask', 'Hello Welcome to Exam Notes, What would you like me to do? . and if you want me to stop at any time jus say stop');
    },
    'title': function(){
        var t = this.event.request.intent.slots.id.value;
        
    const params = {
    Key: {
      id: {
        S: t
      }
    },
    TableName: "notes"
  };
  dynamodb.getItem(params, (err, data) => {
    if (err) {
      console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        this.response.speak('wrong query');
        this.emit(':responseReady');
      
    } else {
      console.log("Query succeeded.");
        console.log(data);
        this.response.speak('title said is : '+ t + ' and ' + data.Item.text.S);
        this.emit(':responseReady');
    }
  });
    

    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};