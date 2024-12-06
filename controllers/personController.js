const Person = require('../models/personSchema');

// Création d'une nouvelle personne
async function createPerson(name, age, favoriteFoods) {
    const person = new Person({
        name,
        age,
        favoriteFoods
    });

    try {
        const savedPerson = await person.save();
        console.log('Personne enregistrée:', savedPerson);
        return savedPerson;
    } 
    catch (error) {
        console.error('Erreur de création de la personne:', error);
    }
}


// Recherche par aliment favori
async function findOneByFood(food) {
    try {
        const person = await Person.findOne({ favoriteFoods: food });
        console.log('Personne trouvée par aliment favori :', person);
        return person;
    } catch (error) {
        console.error('Erreur de recherche par aliment favori :', error);
    }
}


// Fonction de Recherche d'une personne par le nom
async function findPersonByName(name) {
    try {
        const person = await Person.find({ name });
        console.log('Personnes trouvées:', person);
        return person;
    } 
    catch (error) {
        console.error('Erreur lors de la recherche par nom:', error);
    }
}

// Fonction de Mise à jour de l'âge d'une entité par le nom
async function updateAgeByName(name, newAge) {
    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { name },
            { age: newAge },
            { new: true } // il retourne le document mis à jour
        );
        console.log('Personne mise à jour:', updatedPerson);
        return updatedPerson;
    } 
    catch (error) {
        console.error('Erreur lors de la mise à jour de l\'âge:', error);
    }
}

// Suppression d'une personne par l'ID
async function deletePersonById(personId) {
    try {
        const deletedPerson = await Person.findByIdAndRemove(personId);
        console.log('Personne supprimée:', deletedPerson);
        return deletedPerson;
    } 
    catch (error) {
        console.error('Erreur lors de la suppression de la personne:', error);
    }
}

// Trouver des personnes aimant les pizza, les trier par nom, limiter les résultats et masquer l'âge
async function queryChain() {
    try {
        const people = await Person.find({ favoriteFoods: 'Pizza' })
            .sort({ name: 1 })
            .limit(2)
            .select('-age')
            .exec();
        console.log('Résultats de la requête en chaîne :', people);
        return people;
    } catch (err) {
        console.error('Erreur lors de la requête en chaîne :', err);
    }
}


module.exports = {
    createPerson,
    findPersonByName,
    updateAgeByName,
    //deletePersonById,
    findOneByFood,
    queryChain
};
