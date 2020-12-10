import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import initDatabase from './db/index';
import bodyParser from 'body-parser';
import logger from './middlewares/loggers';
import cors from './middlewares/cors';

const startServer = async (): Promise<void> => {
    dotenv.config();

    const app = express();

    app.use(cors);
    app.use(logger);

    app.use(bodyParser.json());

    await initDatabase();
    routes(app);

    app.listen(process.env.PORT, () => {
        console.log(`server port ${process.env.PORT}`);
    });
};
startServer();


