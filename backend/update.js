const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
  const data = event.body
  const params = {
    TableName: "todos",
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression : "SET #text = :text, #checked = :checked",
    ExpressionAttributeNames: {
        '#text' : 'text',
        '#checked' : 'checked'
    },
    ExpressionAttributeValues: {
        ':text' : data.text, 
        ':checked' : data.checked   
    },
    ReturnValues: 'UPDATED_NEW'
  }


  const result = await client.update(params).promise();
  if (result.Attributes) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Couldn't find the todo item." })
    }
  }
};