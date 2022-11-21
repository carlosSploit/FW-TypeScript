import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../DataConfig';

const rooutes = express.Router();

//**** atentificacion *****/
rooutes.use('/', (_req: Request, res: Response) => {
    const user = config.apidatkey
    jwt.sign({user}, 'secretkey', (_err:any, token) => {
        res.json({
            token
        });
    });
});

export default rooutes;