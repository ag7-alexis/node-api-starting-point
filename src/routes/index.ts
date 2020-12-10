import pubs from './pubs';
import barathons from './barathons';

export default (app: any): void => {
    app.use('/pubs', pubs);
    app.use('/barathons', barathons);
};