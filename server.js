const mongoose = require('mongoose');
const express = require("express");
require('dotenv').config();
const app = express(); 

const { findPersonByName, updateAgeByName, findOneByFood, queryChain } = require('./controllers/personController');
const Person = require('./models/personSchema'); 

// Middleware pour le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connexion réussie à MongoDB');

        // Insertion de plusieurs personnes
        const peopleArray = [
            { name: 'Fatou Dia', age: 30, favoriteFoods: ['Pizza', 'Mafé'] },
            { name: 'Aminata Ndiaye', age: 25, favoriteFoods: ['Tchiep', 'Sauce_Gombo'] },
            { name: 'Alassane Cissé', age: 35, favoriteFoods: ['Pizza', 'Poulet_Roti'] },
            { name: 'Rane Bo', age: 5, favoriteFoods: ['Salades', 'Fataya'] },
            { name: 'Alpha Diallo', age: 22, favoriteFoods: ['Filet_Poisson'] },
            { name: 'Samira Ngodo', age: 35, favoriteFoods: ['Egosu_Soupe', 'Pizza'] }
        ];

        //Ajout de plusieurs personnes en une fois
        Person.create(peopleArray)
            .then((savedPeople) => {
                console.log('Personnes enregistrées :', savedPeople);

                // Récupérer toutes les personnes après l'insertion
                Person.find()  // Affiche toutes les personnes
                    .then(allPeople => {
                        console.log('Toutes les personnes dans la base de données :', allPeople);

                        // Recherche d'une personne par son nom après insertion
                        findPersonByName('Samira Ngodo');

                        // Mise à jour de l'âge d'une personne
                        updateAgeByName('Rane Bo', 27);

                        // Recherche par repas
                        findOneByFood('Pizza');

                        // Recherche avec une chaîne de requêtes
                        queryChain();
                    })
                    .catch(error => {
                        console.log('Erreur lors de la récupération des personnes :', error);
                    });

            })
            .catch((error) => {
                console.error('Erreur d\'enregistrement des personnes :', error);
            });
    })
     .catch((error) => {
        console.log('Erreur de connexion à MongoDB :', error);
    });

    // Démarrage du serveur Express
const port = 7000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});