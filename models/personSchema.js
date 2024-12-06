const mongoose = require("mongoose");

//Schema des entités
const personSchema = new mongoose.Schema({
    name : {type : String, required : true},
    age : { type: Number },
    favoriteFoods : {type : [String]}
});

//Creation du modele basé sur notre schema 
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
