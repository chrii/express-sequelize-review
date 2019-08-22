const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./config/database');

// Authentifiziert die Datenbank mit einem Promise
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Initialisiert Express auf die Variable app
const app = express();

/**
 * Initialisiert die Templating Engine "Handlebars" und setzt sie als Standard
 * Außerdem wird mit "exphbs" das default Layout auf main geleitet
 * Mehr auf www.https://handlebarsjs.com/
 */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Diese Middleware checkt ob das encoding des geparsten Bodys stimmt
app.use(bodyParser.urlencoded({ extended: false }));

// Macht "public" zu einem statischen Ordner der immer gleich angesprochen werden kann
app.use(express.static(path.join(__dirname, 'public')))

// Index bekommt eine andere Layout Datei als default
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Stellt alle Routes aus der gigs.js zur Verfügung
app.use('/gigs', require('./routes/gigs'));

// Läd den Port aus der .env Datei - wenn vorhanden
// Ansonsten 5000
const PORT = process.env.PORT || 5000;

// Startet den Server und hört auf den angegebenen Port
app.listen(PORT, console.log('Server started on ' + PORT));