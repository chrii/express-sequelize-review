const Sequelize = require('sequelize');

// Klasse die Funktionen von Sequelize zur Verfügung stellt
// Mehr auf https://sequelize.org/
module.exports = new Sequelize(
    'codegig_db',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        dialect: 'postgres',
        operatorAliases: false,
        pool: {
            max: 5,
            min: 0,
            aquire: 30000,
            idle: 10000
        }
    });
