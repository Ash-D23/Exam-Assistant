const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: "us-east-1",
  apiVersion: "2012-08-10"
});

exports.handler = (event, context, callback) => {
  const params = {
    TableName: "notes"
  };
  dynamodb.scan(params, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      const notes = data.Items.map(item => {
        if(item.status.S == 'UPDATED'){
          return { id: item.id.S, title: item.title.S, text: item.text.S,status: item.status.S,url: item.url.S };
        }
        else{
          return { id: item.id.S, title: item.title.S, text: item.text.S,status: item.status.S,url: "processing" };
        }
        });
        callback(null, notes);
    }
  });
};
