module.exports.getletters = function(word){
	game = {};
	game.teststring = word;
	unusedletters = []
		game.bananagramsdistribution = {
			A:13,
			B:3,
			C:3,
			D:6,
			E:18,
			F:3,
			G:4,
			H:3,
			I:12,
			J:2,
			K:2,
			L:5,
			M:3,
			N:8,
			O:11,
			P:3,
			Q:2,
			R:9,
			S:6,
			T:9,
			U:6,
			V:3,
			W:3,
			X:2,
			Y:3,
			Z:2
		}
		//remove letters currently in string from unused pile
		game.teststring.forEach(function(letter){
			game.bananagramsdistribution[letter] = game.bananagramsdistribution[letter]-1;
			//console.log('letter',letter.letter,'number',bananagramsdistribution[letter.letter])
		})
		//console.log(game.bananagramsdistribution['H']);
		function shuffle(array) {
		  var currentIndex = array.length, temporaryValue, randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }

		  return array;
		}

		for(var key in game.bananagramsdistribution){
			for(var i=0; i<game.bananagramsdistribution[key];i++){
				unusedletters.push(key);
			}
		}
		console.log('length',		unusedletters.length);
		unusedletters = shuffle(unusedletters);

		return unusedletters;
}

module.exports.getletters('HEY'.split(''))