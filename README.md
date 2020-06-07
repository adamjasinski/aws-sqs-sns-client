## AWS SQS & SNS Node.js Client 

## What is this?
Node.js web client that excercises the AWS SNS & SQS functionality

## Screenshots
![Alt text](/screenshots/snsmenu.png?raw=true)
![Alt text](/screenshots/sqsmenu.png?raw=true)

## Contains:
- app.js = main app & webserver. Launch this
- /controllers = HTTP routes and sns/sqs API functionality 
- /config = example aws creds config file and example endpoint override (optional) config file
- /public = stylesheet
- views = main index.ejs
- views/partials = partials for menu navigation, sns and sqs forms 

### SQS Functionality:
- Create SQS queues
- List SQS queues
- Get queue URL
- Get queue attributes
- Send message to queue
- Get (receive) message from queue
- Delete message from queue
- Purge all messages from queue
- Delete queues
- Set queue attributes (namely policy for SNS subcription)

### SNS Functionality:
- Create topics
- Add queue subscription
- Add email subscription
- Send message to topic
- List topics
- Delete topics
- List subscriptions
- Delete subscriptions

## Acknowledgements
Based on code from AWS SQS examples at: https://www.youtube.com/watch?v=4Z74luiE2bg\ and https://github.com/andrewpuch/aws-sqs-node-js-examples

Mark Allen's SNS code here: https://github.com/markcallen/snssqs/blob/master/create.js

CSS template inspired from: https://www.sanwebe.com/2014/08/css-html-forms-designs


## Installation overview
install Node.js: https://nodejs.org/en/


clone the repo and install modules:

```
git clone https://github.com/ajyounguk/aws-sns-sqs-demo
cd aws-sns-sqs-demo
npm install
```

## AWS Credentials

Use the following environment variables to configure your AWS creds
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_DEFAULT_REGION

Reference: [AWS SDK docs](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)

## Overrride Amazon SNS/SQS endpoints

If you need to route your request to a proxy, or want to route SQS/SNS requests to a local pseudo AWS service (e.g. goaws or localStack) you can override endopoints by using the following environment variables:

- SNS_ENDPOINT
- SQS_ENDPOINT

e.g. `SNS_ENDPOINT=http://localstack:4575`


For IAM user, add group policy = AmazonSQSFullAccess, AmazonSNSFullAccess 

## How to run it
run the webserver:

```
node app.js
```

point your browser at the local/remoteIP port 3000 to load the HTML forms, click the SNS/SQS buttons to select the required functionality.

For more information on AWS SNS and SQS:

https://aws.amazon.com/sns/
https://aws.amazon.com/sqs/

goaws and localstack links:

https://github.com/p4tin/goaws
https://github.com/localstack/localstack

## Running in Docker

Build with Docker:

```
docker build -t aws-sqs-sns-client .
```

Run the application configured to use localStack:

```
docker run -e AWS_ACCESS_KEY_ID=xxx -e AWS_SECRET_ACCESS_KEY=xxx -e AWS_DEFAULT_REGION=eu-north-1 -e SNS_ENDPOINT=http://localhost:4575 -e SQS_ENDPOINT=http://localhost:4576 -p 3000:3000 aws-sqs-sns-client
```