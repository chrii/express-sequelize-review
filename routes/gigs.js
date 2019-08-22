const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * Der Router startet bei "/gigs"
 * "Gig" ist das definierte Model - .findAll() gibt alle gefundenen Querys aus der Datenbank zurück
 * "then" ist ein promise dessen attribut "gigs" den response der Datenbank enthält
 * render erstellt eine Seite "gigs" aus Handlebars
 * render enthält auch den value "gigs" der den response enthält und an Handlebars mitgegeben wird
 */
router.get('/', (req, res) =>
    Gig.findAll()
        .then(gigs => {
            res.render('gigs', {
                gigs
            });
        })
        .catch(err => console.log(err)));

router.get('/add', (req, res) => res.render('add'));

// Add a Gig
router.post('/add', (req, res) => {

    let { title, technologies, budget, description, contact_email } = req.body;
    let errors = [];

    if (!title) {
        errors.push({ text: 'add title' });
    }
    if (!technologies) {
        errors.push({ text: 'add technologies' });
    }
    if (!description) {
        errors.push({ text: 'add description' });
    }
    if (!contact_email) {
        errors.push({ text: 'add email' });
    }

    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        })
    } else {

        Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        })
            .then(gig => res.redirect('/gigs'))
            .catch(err => console.log(err));
    }
});

// Search 

router.get('search', (req, res) => {
    const { term } = req.query;
    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
        .then(gigs => res.render('gigs', { gigs }))
        .catch(err => console.log(err));
});

module.exports = router;