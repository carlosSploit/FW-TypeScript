import express, { Request, Response } from 'express';
const rooutes = express.Router();
//######################### rooutes ###################################
//listar
rooutes.get('/', async (_req:Request , res:Response ) => {
    return res.send({messege: "esta gente es generica"})
})

export default rooutes;