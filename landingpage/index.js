
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', __dirname + "/views");

app.get('/', (req, res, next) => {
	res.render('index')
});

var port = 3000;

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

/*
do we want each link to another page or just scroll down ( i personally like the immediate scroll down )
 */