// src/db/schemas/pub.ts
import { Schema } from 'mongoose';
import { ICustomSchema } from '../../types/database';
import Comment from './comment';

// nous n'exportons pas un schémas, mais un ICustomSchema
// notre surcouche custom au schema mongoose
// cela est utile pour l'initalisation des modèles, car il porte
// l'information 'collection' en plus
const pubSchema: ICustomSchema = {
    collection: 'pubs',
    definition: new Schema({
        name: { type: String, required: true }, // les types définis ici sont des types Mongoose, ils n'ont rien à voir avec TS
        description: { type: String, required: false },
        latlng: {
            lat: { type: String, required: true },
            lng: { type: String, required: true }
        },
        comments: { type: [Comment], required: false }
    })
};

export default pubSchema;