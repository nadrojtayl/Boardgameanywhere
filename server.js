var express = require('express');

var app = express();
var helper = require(__dirname + '/serverhelpers/remainingletters.js');
var BP = require('body-parser')

app.use(BP.urlencoded({ extended: true }));
app.use(BP.json());
//console.log(helper.getletters('IOWEYOU'))


app.use(express.static('public'));

var remainingletters = ['a','e','i','o','u'];

app.get('/',function(req,res){
	//res.end()
	//res.writeHead(200,{'Access-Control-Allow-Origin':'*'})

	res.sendFile(__dirname + '/index.html')
})

app.post('/remainingletters',function(req,res){
	console.log(req.body);
	res.writeHead(200,{'Access-Control-Allow-Origin':'*'})
	res.end(JSON.stringify(remainingletters));
})

app.get('/split',function(req,res){
	if(remainingletters.length === 0){
		res.end('You won!');
	}
	split = remainingletters.pop();
	res.end(JSON.stringify(split));
})

app.listen('3000');