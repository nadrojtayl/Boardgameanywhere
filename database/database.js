var db = require('mongoose');

db = mongoose.connection('boardgameanywhere')


var game = mongoose.Schema({
	lettersremaining: 'String'
})

var user = mongoose.Schema({
	name: 'String'
})

var test = 'user',{lettersremaining:JSON.stringify()}


test.create();