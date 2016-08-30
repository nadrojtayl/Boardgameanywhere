

	var boardmap = []
	for(var i =0;i<8;i++){
		boardmap.push([{}]);
	}

	for(var i = 0;i<8;i++){
		for(var j=0;j<8;j++){
			var obj = {x:(32*i),y:(32*j),width:32,height:32,redorwhite:'burlywood'};
			if(i%2 === j%2){
				obj['redorwhite'] = 'lightgrey';
			}
			boardmap[i][j] = obj;
		}
	}

	var boardmap = _.flatten(boardmap);

	var board = $('#checkers')


	d3.select('#checkers').selectAll('rect').data(boardmap).enter().append('rect').attr('fill',function(d){return d.redorwhite}).attr('x',function(d){return d.x}).attr('y',function(d){return d.y}).attr('width',32).attr('height',32).attr('class','moveable').attr('transform','translate(0,0)')
	
	circlemap = boardmap.filter(function(item,index){
		return index % 8 !== 3 && index % 8 !== 4;
	})

	circlemap = circlemap.filter(function(item,index){
		return (item['redorwhite'] === 'burlywood')
	})

	circlemap.forEach(function(obj,ind){
		if(obj.y > 128){
			obj['color'] = "red";
		} else {
			obj['color'] = 'black';
		}
	})

	console.lo



	d3.select('#checkers').selectAll('circle').data(circlemap).enter().append('circle').attr('cx',function(d){return d.x+16}).attr('cy',function(d){return d.y+16}).attr('r',16).attr('fill',function(d){return d.color})
	console.log('here');
