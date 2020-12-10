// src/db/index.ts
import mongoose, { Connection } from 'mongoose';

// on export la base de données (qu'on va initialiser dans la fonction en dessous)
// c'est elle qui, une fois initialisé, nous intéresse
export let database: Connection;

// on return une promesse, car le tout étant basé sur des évenements
// nous n'avons aucune garantie du moment ou ils seront détectés.
export default async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            if (!process.env.MONGO_URL) {
                reject('Database configuration error');
            }

            database = mongoose.connection;

            // evenement lancer lorsque mongoose lance le processus de connexion
            database.on('connection', () => {
                console.log('Connection...');
            });

            // evenement lancer une fois la connexion établie avec notre BDD
            // on utilise once pour ne pas polluer notre serveur avec un écouter inutile
            // une fois l'évenement détecté une fois.
            database.once('open', () => {
                console.log('Connected !');
                resolve();
            });

            // si une erreur survient, on coupe tout
            database.on('error', (error: any) => {
                mongoose.disconnect();
                console.log(error);
                process.exit(1);
            });

            // https://mongoosejs.com/docs/connections.html
            mongoose
                .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .catch((error: any) => {
                    reject(error);
                });

        } catch (err) {
            reject(err);
        }
    });
};