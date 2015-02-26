var http = require('http');
var mongoose = require('mongoose');
var express = require('express');

var app = express();
var db;

mongoose.connect('mongodb://<dreyescairo>:<Ssvegeta13?>@ds047911.mongolab.com:47911/sr_blog');

	
var standardGreeting = 'Hello World!';
var Schema = mongoose.Schema;
var greetingSchema = new Schema({
	sentence: String
	});
	
var Greeting = mongoose.model('greetingSchema', greetingschema);



mongoose.connection.once('open',function(){
var greeting;
Greeting.find( function(err, greetings){
if(!greetings){
greeting = new Greeting({sentence:standardGreeting});
greeting.save();
}
});
});

app.get('/', function(req,res){
Greeting.findOne(function (err,greeting){
res.send(greeting.sentence);
});
});

app.use(function(err,req,res,next){
if(req.xhr){
res.send(500,'Something went wrong!');
}
else{
next(err);
}
});

console.log('starting Express (NodeJS) Web Server');
app.listen(8080);
console.log('Webserverlistening on port 8080');