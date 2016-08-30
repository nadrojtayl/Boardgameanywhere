var express = require('express');

var app = express();
var helper = require(__dirname + '/serverhelpers/remainingletters.js');
var BP = require('body-parser')
var db = require(__dirname + '/database/database.js')

app.use(BP.urlencoded({ extended: true }));
app.use(BP.json());
//console.log(helper.getletters('IOWEYOU'))

//FIX ISSUE WHERE YOU KEEP OVERCOUNTING
app.use(express.static('public'));

var lettersinuse = {};

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
	//console.log('remainingletters',lettersinuse[room].length);
	if(lettersinuse[room].length === 0){
		res.end('You won!');
	}
	split = lettersinuse[room].pop();
	res.end(JSON.stringify(split));
})

app.post('/newgame',function(req,res){
	//console.log(req.body.name);
	db.postRoom(req.body.name,req.body.html)
	res.end('Got it');
})

app.post('/loadgame',function(req,res){
	db.getGameData(req.body.name,function(data){
		res.end(JSON.stringify(data));
	})
})

app.listen('3000');