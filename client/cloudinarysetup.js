$('.upload_form').append($.cloudinary.unsigned_upload_tag("p76riotl", 
  		 {cloud_name: 'boardgameanywhere' }));
		 $('.upload_form').unsigned_cloudinary_upload("zcudy0uz", 
		  { cloud_name: 'demo', tags: 'browser_uploads' }, 
		  { multiple: true }
		).bind('cloudinarydone', function(e, cddata) {

		  console.log(cddata.result.url) 
		  $.ajax({
		  	method:'POST',
		  	url:'https://api.ocr.space/Parse/Image',
		  	data:{'apikey':'f19b20c27688957','language':'eng','url':cddata.result.url},
		  	success: function(data){
		  		console.log(data.ParsedResults);
		  		console.log('typeof',typeof data.ParsedResults[0].ParsedText);
		  		console.log(data.ParsedResults[0].ParsedText);
		  	},
		  	failure: function(data){
		  		console.log('error');
		  	}
		  })
		
		}
		)