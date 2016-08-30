var express = require('express');

var app = express();
var helper = require(__dirname + '/serverhelpers/remainingletters.js');
var BP = require('body-parser')

app.use(BP.urlencoded({ extended: true }));
app.use(BP.json());
//console.log(helper.getletters('IOWEYOU'))

//FIX ISSUE WHERE YOU KEEP OVERCOUNTING
app.use(express.static('public'));

var lettersinuse = {};
var current

var remainingletters = ['a','e','i','o','u'];

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html')
})

app.post('/remainingletters',function(req,res){

	//console.log('room',req.body.room.length)
	lettersinuse[req.body.room] = req.body.room in lettersinuse ? lettersinuse[req.body.room].concat(req.body.word): req.body.word
	res.writeHead(200,{'Access-Control-Allow-Origin':'*'})
	res.end(JSON.stringify(helper.getletters(lettersinuse[req.body.room])));
})

app.post('/split',function(req,res){
	
	var room =req.body.room	;
	console.log('remainingletters',lettersinuse[room].length);
	if(lettersinuse[room].length === 0){
		res.end('You won!');
	}
	split = lettersinuse[room].pop();
	res.end(JSON.stringify(split));
})

app.listen('3000');