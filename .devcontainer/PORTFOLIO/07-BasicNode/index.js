console.log("Hello World!");

const sw = require('star-wars-quotes');
console.log(sw());

const superheroes = require('superheroes');
const supervillains = require('supervillains');

const hero = superheroes.random();
const villain = supervillains.random();

console.log(`${hero} vs ${villain}`);

const fs = require('fs');
const { error } = require('console');

fs.readFile('./data/input.txt', 'utf8', (err, data) => {
    if(err){
        console.error("Error al leer el archivo:" , err);
        return;
    }
    console.log("Secret message:", data);
});

