
// setup express server
var express  = require('express');
var aws      = require('aws-sdk');
var fs       = require('fs');
var app      = express();

//By default, AWS SDK will read environment variables to configure AWS credentials.

//Optional - override default SNS/SQS endpoints
var sns_endpoint_override = process.env.SNS_ENDPOINT;
var sqs_endpoint_override = process.env.SQS_ENDPOINT;

if(!!sns_endpoint_override){
    console.log('Overriding AWS SNS endpoint to:', sns_endpoint_override)
    aws.config.sns = { 'endpoint': sns_endpoint_override }
}

if(!!sqs_endpoint_override){
    console.log('Overriding AWS SQS endpoint to:', sqs_endpoint_override)
    aws.config.sqs = { 'endpoint': sqs_endpoint_override }
}

// this is the main object for holding all the UI data rendered in ejs templates
// date for the various UI menu items is held in the 'data' array.
//
// menuitem is used to hold the currently active / selected menu items to be displayed, 
// when index.ejs is loaded, it invokes a javascript function to enable the required div section using
// this variable. 
// 
// the def_* variables are used to hold default / prepop values for the various input boxes 

var ui = {
    menuitem: 1,
    data: [],
    def_snsname: '',
    def_snsarn: '',
    def_sqsname: '',
    def_sqsurl: '',
    def_sqsar: '',
    def_subarn: '',
    def_msghandle: ''
}


var snsController = require('./controllers/snsController')
var sqsController = require('./controllers/sqsController')

snsController(aws, app, ui);
sqsController(aws, app, ui);

// server listen port - can be overriden by an environment variable
var port = process.env.PORT || 3000

// configure assets and views
app.use('/assets', express.static(__dirname+'/public'))
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs')


// login and serve up index
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('./index', {ui: ui})
})


// Start server.
app.listen(port)
console.log('AWS SNS SQS test server listening on port', port);




