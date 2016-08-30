var appendcheckers = function(){

	var boardmap = []
	for(var i =0;i<8;i++){
		boardmap.push([{}]);
	}

	for(var i = 0;i<8;i++){
		for(var j=0;j<8;j++){
			var obj = {x:(32*i),y:(32*j),width:32,height:32,redorwhite:'white'};
			if(i%2 === j%2){
				obj['redorwhite'] = 'red';
			}
			boardmap[i][j] = obj;
		}
	}

	var boardmap = _.flatten(boardmap);

	var board = $('#checkers')


	d3.select('#checkers').selectAll('rect').data(boardmap).enter().append('rect').attr('fill',function(d){return d.redorwhite}).attr('x',function(d){return d.x}).attr('y',function(d){return d.y}).attr('width',32).attr('height',32)

	console.log('here');
}
