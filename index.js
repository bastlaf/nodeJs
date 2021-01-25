#!/usr/bin/env node

// appel des npm.
const { getCode } = require("country-list");
const axios = require('axios');
const chalk = require('chalk');

// dit que je veux au moins un argument.
const myArgs = process.argv.slice(2);

// dit que je veux 1 ou 2 arguments (pays et/ou date).
if(myArgs.length != 2 && myArgs.length != 1){
    console.log(chalk.red("Argument 1 =") + " country.");
    console.log(chalk.red('Argument 2 =') +" date.");
    return;
};

// déclare les différentes variables.
let country = myArgs[0]; // country = doit être le premier argument.
let code = getCode(country); // code = crée le code du pays (exemple : belgium = BE).
let year = new Date().getFullYear(); // year = sera l'année actuelle.

// déclare que si il y deux arguments, year prendra la valeur du deuxième argument. 
if(myArgs.length == 2){
    year = Number(myArgs[1]);
};

// fait en sorte d'être lu par l'api axios.
axios.get('https://date.nager.at/api/v2/publicholidays/' +year+'/'+code).then(function (response) {
// affiche pour chaque jour de vacances, le nom, un tiret, et la date.
    console.log(chalk.green('*****************************'));
    console.log(chalk.underline('the public holidays are:'));
    console.log(chalk.underline(''));
    response.data.forEach(holiday => {
        console.log(chalk.bgCyan(holiday.date) + chalk.green(' - ') + chalk.bgGrey(holiday.name));
    });
    console.log(chalk.green('*****************************'));
})

// si les arguments ne sont pas trouvé correctement par axios, alors il retournera ceci.
.catch(function (error) {
    console.error(chalk.bgRed('NOT GOOD BROTHER !'));
});
