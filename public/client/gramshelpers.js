//establish string of users board and split into array
	var game = {};
	game.switchable = true;

	function initiategame(string){
		game.teststring = string.split("")
		var y = 50,x=0;
		var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
		game.teststring = game.teststring.map(function(letter,index){if(letter === " "){y=y+50;x=0;};x+=32;return {letter:letter,y:y,x:(x) + 20,offset:10}})
		game.teststring = game.teststring.filter(function(obj){return letters.indexOf(obj.letter) !== -1;})
		$.ajax({
			method:'POST',
			url:'http://localhost:3000/remainingletters',
			success:function(data){
				//console.log('here')
				var letters = JSON.parse(data);
				game.unusedletters = letters;
			},failure:function(){
				console.log('Couldnt get unused letters from servers');
			},
			data:{word:game.teststring.map(function(obj){return obj.letter}),room:$('#room').val()}
		})
		
		//game.unusedletters = getunusedletterspile()
		game.updateletters();
		game.setup()
	}
	
	//game.teststring = "HELLO".split("")
	//game.teststring = game.teststring.map(function(letter,index){return {letter:letter,y:50,x:(32*index) + 20,offset:10}})

//get array of unused letters, letters still in pile
function getunusedletterspile(){


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
			game.bananagramsdistribution[letter.letter] = game.bananagramsdistribution[letter.letter]-1;
			//console.log('letter',letter.letter,'number',bananagramsdistribution[letter.letter])
		})

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

		unusedletters = shuffle(unusedletters);

		return unusedletters;
}

//draw letters on svg
	game.updateletters = function(){
		//debugger;
		d3.select('svg').selectAll('rect').data(game.teststring).enter().append('g').append('rect').attr('height',32).attr('width',32).attr('x',function(d){return d.x -2 }).attr('y',function(d){return d.y -28}).attr('fill','rgb(250,208,170)').attr('stroke-width',1).attr('stroke','black').attr('class','draggable').attr('transform','translate(100,0)').attr('class','moveable')

		d3.select('svg').selectAll('text').data(game.teststring).enter().append('g').append('text').attr('x',function(d){return d.x}).attr('y',function(d){return d.y}).attr('font-size',32).text(function(d){return d.letter}).attr('class','draggable').attr('transform','translate(100,0)').attr('class','moveableletter')
	}

	game.addtoteststring = function(letter){
		game.teststring.push(
			{letter:letter,y:50,x:(32*game.teststring.length) + 20,offset:10}
		)
	}

//update board and unusedpile when user takes letter from unused
	game.nextletter = function(){
		console.log('here')
		$.ajax({
			method:'POST',
			url:'http://localhost:3000/split',
			data:{room:$('#room').val()},
			success:function(data){
				data = data.replace('"',"").replace('"',"");
				game.addtoteststring(data);
				game.updateletters();
			},failure:function(){
				console.log('There was an error')
			}

		})
		// if(game.unusedletters.length>0){
		// 	var newletter = game.unusedletters.pop();
		// 	game.addtoteststring(newletter);
		// 	game.updateletters();
		// 	//$('#remainingcount').html(game.unusedletters.length)
		// } else{
		// 	youwin()
		// }

		//and alert user they won if they take the last letter
		function youwin(){
			alert("You are the last player to split! You won!")
		}
	}

//attach event listeners so player can move tiles
	game.setup = function(){


		game.tiles = $('.moveable')
		game.index = 0;
		game.selected = $('.moveable:eq(' + game.index + ')');
		game.selectedletter= $('.moveableletter:eq(' + game.index + ')');
		game.selected.attr('stroke','red')
		game.translateamount = 2;


		var getnewtranslate = function(old,changex,changey){
		
		var oldx = Number(old.slice(old.indexOf('(') +1,old.indexOf(',')));
		var oldy = Number(old.slice(old.indexOf(',') + 1,old.indexOf(')')));
		//console.log(oldy)
		//var newtrans = old.slice(old.indexOf('(') + 1).slice(0,-1)
		var final = 'translate(' + (oldx + changex) + ',' + (oldy + changey) + ')';
		//console.log(oldy)
		//console.log(final);
		return final;
		}

	$('body').keydown(function(evt){
		//console.log('which',evt.which)
		if(evt.which === 65){
			if(game.switchable === true){
				//console.log(game.index > $('.moveable').length);
				game.index = game.index > $('.moveable').length ? 0: game.index +1;
				setInterval(function(){game.switchable = true;
				},400)
				//console.log(game.index)
				//change tile
				game.selected.attr('stroke','black')
				game.selected = $('.moveable:eq(' + game.index + ')')
				game.selected.attr('stroke','red')
				//change letter
				game.selectedletter = $('.moveableletter:eq(' + game.index + ')')
				game.switchable = false;
			}
		}
		if(evt.which===39){
			game.selected.attr('transform',getnewtranslate(game.selected.attr('transform'),game.translateamount,0))
			game.selectedletter.attr('transform',getnewtranslate(game.selectedletter.attr('transform'),game.translateamount,0))
		} else if(evt.which === 37){
			game.selected.attr('transform',getnewtranslate(game.selected.attr('transform'),-game.translateamount,0))
			game.selectedletter.attr('transform',getnewtranslate(game.selectedletter.attr('transform'),-game.translateamount,0))
		} else if(evt.which === 40){
			game.selected.attr('transform',getnewtranslate(game.selected.attr('transform'),0,game.translateamount))
			game.selectedletter.attr('transform',getnewtranslate(game.selectedletter.attr('transform'),0,game.translateamount))
		} else if(evt.which === 38){
			game.selected.attr('transform',getnewtranslate(game.selected.attr('transform'),0,-game.translateamount))
			game.selectedletter.attr('transform',getnewtranslate(game.selectedletter.attr('transform'),0,-game.translateamount))
		} else if(evt.which === 88){
			game.selected.remove();
		}

	})	




	}