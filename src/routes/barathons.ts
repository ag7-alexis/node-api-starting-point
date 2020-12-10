import mongoos from 'mongoose';

import { Router, Request, Response } from 'express';
import getModel from '../db/models';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    const modelBarathon = getModel('barathon');

    const barathons = await modelBarathon.find({});
    res.json(barathons);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const modelBarathon = getModel('barathon');
        const barathon = await modelBarathon.findById(`${req.params.id}`);

        if (!barathon) {
            throw new Error('erreur');
        }

        res.json(barathon);
    } catch (error) {
        res.status(404);
        res.json({ error: true, message: `barathon with id -> ${req.params.id} not found` });
    }
});


router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const modelBarathon = getModel('barathon');
        await modelBarathon.validate(req.body);
        const newBarathon = new modelBarathon(req.body);
        const insertedBarathon = await newBarathon.save(newBarathon);
        res.json(insertedBarathon);
    } catch (error) {
        console.log(error);
        if (error instanceof mongoos.Error.ValidationError) {
            res.status(400);
            res.json({ error: true, message: "Bad Request" });
        } else {
            res.status(500);
            res.json({ error: true, message: "Server Error" });
        }
    }

});

export default router;