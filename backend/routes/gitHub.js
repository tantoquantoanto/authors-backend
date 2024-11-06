const express = require('express')
const github = express.Router()
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const session = require('express-session')
const jwt = require('jsonwebtoken')
require('dotenv').config()


github.use(
    session({
        secret: process.env.CLIENT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
)

// inizializzazione passport
github.use(passport.initialize())
// Connetto passport con sessione express per persistenza utenti
github.use(passport.session())


// Determina come i dati dell'utente vengono memorizzati nella sessione.
// Qui ad esempio salva in sessione l'intero oggetto USER
passport.serializeUser((user, done) => {
    done(null, user)
})

// Recupera i dati dell'utente dalla sessione sotto forma di oggetto USER
passport.deserializeUser((user, done) => {
    done(null, user)
})

// usiamo la strategy che abbiamo deciso di importare (in questo caso Github)
/*
* istanziamo GithubStrategy passando come oggetto di configurazione le chiavi
* precedentemente create per la nostra OAUTH APP
*
* come secondo argomento una callback (vedi documentazione) che restituisce il profilo utente
* */

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            // qui dobbiamo eventualmente salvare l'utente!
            return done(null, profile);
        }
    )
);

github.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res, next) => {
    const redirectUrl = `http://localhost:5173/success?user=${encodeURIComponent(JSON.stringify(req.user))}`
    res.redirect(redirectUrl)
})

github.get(
    '/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
    async (req, res, next) => {
        const user = req.user;

        console.log(user)

        const token = jwt.sign(user, process.env.JWT_SECRET);
        const redirectUrl = `http://localhost:5173/success/${encodeURIComponent(token)}`
        res.redirect(redirectUrl)
    })

github.get('/success', (req, res) => {
    res.redirect('http://localhost:5173/home')
})

github.get('/oauth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('errore')
        }

        req.session.destroy((error) => {
            if (error) {
                // fai qualcosa
            }

            res.redirect('/')
        })
    })
})

module.exports = github
