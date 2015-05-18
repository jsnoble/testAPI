var express = require('express');
var app = express();
var compress = require('compression');

app.use(compress());
app.use(express.static('client/public'));

app.listen(3000);
