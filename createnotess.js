const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: "us-east-1",
  apiVersion: "2012-08-10"
});

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, "g"), replace);
};

exports.handler = (event, context, callback) => {
  const id = replaceAll(event.title, " ", "-").toLowerCase();
  const params = {
    Item: {
      id: {
        S: id
      },
      title: {
        S: event.title
      },

      text: {
        S: event.text
      },
      status: {
        S: 'Processing'
      }
    },
    TableName: "notes"
  };
  dynamodb.putItem(params, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, {
        id: params.Item.id.S,
        title: params.Item.title.S,
        text : params.Item.text.S,
        status : params.Item.status.S
      });
    }
  });
  
  //sns
  var sns = new AWS.SNS();

    sns.publish({
        Message: id,
        TopicArn: 'arn:aws:sns:us-east-1:499131530143:new_posts'
    }, function(err, data) {
        if (err) {
            console.log(err.stack);
            return;
        }
        console.log('push sent');
        console.log(data);
        context.done(null, 'Function Finished!');  
    });
};