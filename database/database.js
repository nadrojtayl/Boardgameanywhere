//Set up users, games and rooms tables

//a schema is the format for a table

// model is an interface for interacting with an actual collection

var mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient


db = mongoose.connect('mongodb://localhost/boardgames');

var room = new mongoose.Schema({
	gamedata:String,
	userIds: [{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
})

var Room = mongoose.model('Room',room)

var user = new mongoose.Schema({
	name: String,
	rooms:[{type:mongoose.Schema.Types.ObjectId, ref:'Room'}]
})

var User = mongoose.model('user', user)

var game = new mongoose.Schema({
	name: String,
	rooms:[{type:mongoose.Schema.Types.ObjectId,ref:'Room'}]
})

var Game = mongoose.model('Game',game);	

//save user brian
var testuser = new User({name:'Brian'});
testuser.save(function(err){
	if(err){console.log(err)}
})

//save a room that brian participates in
User.findOne({name:'Brian'},function(err,person){
	var room = new Room({gamedata:'fakedata'})
	room.userIds.push(person.id);
	room.save();
})


// //var test = new game({lettersremaining:JSON.stringify(['a','e','i','o','u'])})




// //test.create();