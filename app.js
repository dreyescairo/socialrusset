var http = require('http');
var mongoose = require('mongoose');
var express = require('express');

var app = express();
var db;

var config={
 "USER"    : "dreyescairo", 
 "PASS"    : "Ssvegeta13?",
 "HOST"    : "ds047911.mongolab.com:47911/sr_blog",
 "PORT"    : "47911",
 "DATABASE" : "sr_blog"

};

var dbPath = "mongodb://"+config.USER + ":"+
	config.PASS + "@"+
	config.HOST + ":"+
	config.port + "/"+
	config.DATABASE;
	
var standardGreeting = 'Hello World!';

var greetingSchema = mongoose.Schema({
	sentence: String
	});
	
var Greeting = mongoose.model('greetingSchema');

db = mongoose.connect(dbPath);

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