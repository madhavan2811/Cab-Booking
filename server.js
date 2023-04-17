require('./models/db');
const { auth } = require('express-openid-connect');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const employeeController = require('./controllers/employeeController');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'SexJ5nvuge5C0FJZxUrC059rLc3VU0Rh',
  issuerBaseURL: 'https://dev-ibclh0ql0hxv4f55.us.auth0.com'
};


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

//Static Files
app.use(express.static("public"));

app.use(auth(config));

// sendFile will go here

app.get('/', function(req, res) {
    // res.sendFile(path.join(__dirname, '/welcome.html'));
     res.sendFile(__dirname + '/welcome.html')
   });

   app.post('/success', function(req, res) {
    // res.sendFile(path.join(__dirname, '/welcome.html'));
     res.sendFile(__dirname + '/success.html')
   });


   app.get('/service', function(req, res) {
    // res.sendFile(path.join(__dirname, '/welcome.html'));
     res.sendFile(__dirname + '/services.html')
   });

   app.get('/cost', function(req, res) {
    // res.sendFile(path.join(__dirname, '/welcome.html'));
     res.sendFile(__dirname + '/cost.html')
   });
 
   app.get('/register', function(req, res) {
    // res.sendFile(path.join(__dirname, '/welcome.html'));
     res.sendFile(__dirname + '/register.html')
   });



   app.get('/admin', function(req, res) {
    // res.sendFile(path.join(__dirname, '/welcome.html'));
     res.sendFile(__dirname + '/admin.html')
   });


   app.get('/payment', function(req, res) {
    // res.sendFile(path.join(__dirname, '/welcome.html'));
     res.sendFile(__dirname + '/payment.html')
   });

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/', employeeController);

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});