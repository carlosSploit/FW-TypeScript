import express from 'express';
import verifyToken from '../config/tockenizer/tokenizer';
// ------------------------------------------------------------- routas
import generico from './routes/generic.router';
import usuario from './routes/usuario.router';
//######################### rooutes ###################################
const rooutes = express.Router();
// configuracion de rutas
rooutes.use('/genetic', verifyToken, generico);
rooutes.use('/usuario', usuario);

export default rooutes;