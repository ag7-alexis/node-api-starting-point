// src/db/schemas/barathon.ts
import { Schema } from 'mongoose';
import { ICustomSchema } from '../../types/database';
import Comment from './comment';

const barathonSchema: ICustomSchema = {
    collection: 'barathons',
    definition: new Schema({
        name: { type: String, required: true },
        author: { type: String, required: true }, // sur le long terme, créer une collection d'user pourrait être sympa
        checkpoints: { type: [String], required: true },
        comments: { type: [Comment], required: false }
    })
};

export default barathonSchema;