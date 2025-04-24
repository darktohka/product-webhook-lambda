# product-webhook-lambda

A proof of concept showing AWS Lambda streaming functionalities.

When a new product is created using the [product-crud-lambda](https://github.com/darktohka/product-crud-lambda), a notification will appear in a Discord channel as a message.

## Steps

1. Create a new AWS Lambda in the AWS Console. Give it access to DynamoDB when creating: create a new role and search for DynamoDB.
2. Run `npm install` to install dependencies.
3. Run `make build` to build the `function.zip` file. This is a ZIP file containing `node_modules` and our application code.
4. Upload the `function.zip` file to the AWS Lambda.
5. Create a new Discord channel. This is where you will receive the create notifications.
6. Create a new integration in the Discord channel settings. Copy the Discord webhook URL.
7. Add a new environment variable to the AWS Lambda: `DISCORD_WEBHOOK_URL`
8. Enable streams on the DynamoDB table.
9. Create a new policy, granting access to `GetRecords, GetShardIterator, DescribeStream, and ListStreams`.
10. Attach the policy to the AWS Lambda's role.
11. Create a new Trigger on the AWS Lambda to trigger on the `NEW IMAGE` event on the DynamoDB table.
12. Enable the new Trigger.
13. Use the product create HTTP route to create a new product.

## Troubleshooting

In case of any issues, use the CloudWatch portal to check the lambda logs. You will find the lambda logs in **Log Groups**.

## DynamoDB CRUD Routes

- **`GET /products`**: Retrieves all products from the DynamoDB table.
- **`GET /products/{id}`**: Retrieves a single product by its ID.
- **`POST /products`**: Creates a new product in the DynamoDB table.
- **`PUT /products/{id}`**: Updates an existing product by its ID.
- **`DELETE /products/{id}`**: Deletes a product by its ID from the DynamoDB table.

## Testing Commands

- `make build`
- `curl -X GET https://r5h2s64j2l.execute-api.eu-west-2.amazonaws.com/products`
- `curl -X POST https://r5h2s64j2l.execute-api.eu-west-2.amazonaws.com/products --json '{"name":"Product","description":"Cool product!","stock":100}'`
- `curl -X PUT https://r5h2s64j2l.execute-api.eu-west-2.amazonaws.com/products/6b455b2d-26d8-41e5-8d24-8fa5f9d1fca1 --json '{"name":"New Product Name","description":"New product description!","stock":1000}'`
- `curl -X DELETE https://r5h2s64j2l.execute-api.eu-west-2.amazonaws.com/products/6b455b2d-26d8-41e5-8d24-8fa5f9d1fca1`
