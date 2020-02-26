const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys');
require('./models/User');
require('./api/passport');


//connecter la base de donnée à notre fichier avec le mongoURI
const connectBDD = () => {
    mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Base de donnée connectée.")
};
connectBDD();

const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);

const Port = process.env.Port || 5000;
app.listen(Port, () => console.log('Serveur actif sur le port ' + Port + '.'));