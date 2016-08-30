var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/',function(res,req){
	res.writeHead(200,{'Access-Control-Allow-Origin':'*'})
	res.sendFile(__dirname + 'index.html')
})

app.listen('3000');