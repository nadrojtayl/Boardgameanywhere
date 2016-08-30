var bananagramssetup = _.template("<h2 class = 'upload_form header' id='header' margin-bottom:'25px'>2. Upload your picture to start up right where you left off </h2> \
\
	<script src='client/cloudinarysetup.js'></script>\
\
	<div class='space'  >\
		<svg class='draggable' id = 'gameboard' width = 1000 height = 500 style = 'border:5px solid black'>\
			<image xlink:href='client/assets/tabletop.jpg' x= 0 y=-100 width = 1000 height=750></image>\
		</svg>	\
	</div>\
	<button onclick = 'game.nextletter()''>Get next letter</button>\
	<p> Letters remaining: <span id= 'remainingcount'>10</span> </p>")

var checkerssetup = _.template("\
	<h2 class = 'upload_form header' id='header' margin-bottom:'25px'>2. Upload your picture to start up right where you left off </h2>\
	<svg id='checkers' width = 256 height =256></svg>\
	<script src='client/appendcheckersboard.js'></script>\
	<script src='client/cloudinarysetup.js'></script>\
\
	")