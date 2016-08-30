var loadgame = function(){
	// console.log('heres');
	// var game = $('#game').val();
	// debugger;	
	$('#gamespace').empty();
	if($('#game').val() === "Bananagrams"){
		$('#gamespace').append(bananagramssetup());
	} else {
		$('#gamespace').append(checkerssetup());
	}
}
