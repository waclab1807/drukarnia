#!/usr/bin/env node
var app = require('../app.js');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function(){

});