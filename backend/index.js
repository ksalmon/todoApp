const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
  const params = {
    TableName: "todos"
  }

  const result = await client.scan(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(result.Items)
  };
};