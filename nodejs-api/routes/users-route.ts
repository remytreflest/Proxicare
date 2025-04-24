import { faker, ro } from '@faker-js/faker';
import insertUser from '../src/queries/users/insert';
import getAllUsers from '../src/queries/users/get';
const express = require('express');
const router = express.Router();
const pool = require('../src/db'); // Assure-toi que pool est bien configuré pour ta connexion PostgreSQL

// Route pour ajouter un utilisateur avec des informations aléatoires
router.get('/add-random-user', async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  try {
    // Générer des données aléatoires
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const role = 'patient'; // Exemple de rôle
    const createdAt = new Date();

    // Insérer l'utilisateur dans la base de données
    const result = await insertUser(firstName, lastName, email, role, createdAt);

    // Retourner l'utilisateur ajouté
    res.status(201).json(result);
  } catch (error) {
    console.error('Error inserting random user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour afficher tous les utilisateurs
router.get('/get-users', async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
