const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
  endpoint: 'http://localhost:8000'
});

exports.create = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'note',
    Item: {
      id: uuid.v1(),
      // userId: event.requestContext.identity.cognitoIdentityId,
      content: data.content,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }
  };

  try {
    await dynamoDb.put(params).promise();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(params),
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
    });
  }
}

exports.get = async (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: 'very good',
  });
}
