'use strict';

var   express = require('express')
    , app = express()
    , fs = require('fs')
    , port = process.env.PORT || 3000
    , static_dir = __dirname + '/client'
    , main_view = static_dir + '/main.html'
    , enconding = 'UTF-8';

var viewEngine = function(filename, options, callback) {
  fs.readFile(main_view, enconding, function(err, main) {
      fs.readFile(filename, enconding, function (err, partial) {
          callback(null, main.replace('{{body}}', partial));
      });
  });
};
    
              
//Configure

app.set('views', static_dir + '/views');
app.set("view options", {layout: false});
app.engine('html', viewEngine);
app.set('view engine', 'html');
app.use(express['static'](static_dir));
    
//Index Route
app.get('/', function(req, res){
    res.render('home');
});

//Contacts Route
app.get('/contacts', function(req, res){
    res.render('contacts');
});

//Settings Route
app.get('/settings', function(req, res){
    res.render('settings');
});

//Start Listening
app.listen(port);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);
    
