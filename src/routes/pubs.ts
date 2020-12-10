import { Router, Request, Response } from 'express';
import getModel from '../db/models';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    const modelPub = getModel('pub');
    const pubs = await modelPub.find({});
    res.json(pubs);
});


router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const modelPub = getModel('pub');
        const pub = await modelPub.findById(`${req.params.id}`);

        if (!pub) {
            throw new Error('erreur');
        }

        res.json(pub);
    } catch (error) {
        res.status(404);
        res.json({ error: true, message: `pub with id -> ${req.params.id} not found` });
    }
});

export default router;