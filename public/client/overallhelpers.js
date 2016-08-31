//replace all function for strings

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

var startnew = function(){
	var name = $('#room').val();
	$('#gamespace').empty();

	if($('#game').val() === "Bananagrams"){
		$('#gamespace').append(bananagramssetup());
	} else {
		$('#gamespace').append(checkerssetup());
	}
}


var loadgame = function(){
	// console.log('heres');
	// var game = $('#game').val();
	// debugger;	
	var name = $('#room').val();
	$('#gamespace').empty();

	if($('#game').val() === "Bananagrams"){
		//console.log(name);
		$.ajax({url:'http://localhost:3000/loadgame',
			method:'POST',
			data:{name:name},
			success:function(data){
				console.log('hey');
				
				var cleanedData = data.replace(/\\/g, "")
				//cleanedData = cleanedData.replaceAll('>t<',"");
				// //cleanedData = cleanedData.replaceAll('> t<',"");
				// //cleanedData = cleanedData.replaceAll('>tt<',"");
				game.currenthtml = cleanedData;
				$('#gamespace').html(cleanedData);
				game.teststring = [];
				$('text').each(function(index,text){game.teststring.push(text.textContent)})
				game.setup()
				if(data.length === 0){
					$('#gamespace').append(bananagramssetup());
				}

				//setTimeout(refresh,1000);
			},failure:function(err){
				console.log('hey');
				$('#gamespace').append(bananagramssetup());
			}
		})



		//$('#gamespace').append(bananagramssetup());
	} else {
		$('#gamespace').append(checkerssetup());
	}
}

function refresh(){
	$('#gamespace').empty();
	console.log('here')
	var name = $('#room').val();

	$.ajax({url:'http://localhost:3000/loadgame',
			method:'POST',
			data:{name:name},
			success:function(data){
				console.log('hey');
				
				var cleanedData = data.replace(/\\/g, "")
				//cleanedData = cleanedData.replaceAll('>t<',"");
				// //cleanedData = cleanedData.replaceAll('> t<',"");
				// //cleanedData = cleanedData.replaceAll('>tt<',"");
				game.currenthtml = cleanedData;
				$('#gamespace').html(cleanedData);
				game.teststring = [];
				$('text').each(function(index,text){game.teststring.push(text.textContent)})
				game.setup()
				if(data.length === 0){
					$('#gamespace').append(bananagramssetup());
				}
				//setTimeout(refresh,1000);
			},failure:function(err){
				console.log('hey');
				$('#gamespace').append(bananagramssetup());
			}
		})
	}

	function save(){
		var html = $('#gamespace').html()
		var name = $('#room').val()

		$.ajax({
			method:'POST',
			url:'http://localhost:3000/newgame',
			data:{html:html,'name':name},
			success:function(){
				alert('Saved your game');
			}, failure:
			function(){
				alert('Couldnt save your game')
			}
		})

	}


