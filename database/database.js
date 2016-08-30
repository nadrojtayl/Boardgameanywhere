var db = require('mongoose');

db = mongoose.connection('mongodb://localhost/test');



var game = new mongoose.Schema({
	lettersremaining: String
})

var game = mongoose.model('Game',game);	

var test = new game({lettersremaining:JSON.stringify(['a','e','i','o','u'])})

test.save(function(err){
	if(err){
		console.log('err');
	}
})


test.create();