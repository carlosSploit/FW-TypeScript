"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
// archivo de configuracion
const DataConfig_1 = __importDefault(require("../DataConfig"));
//import { _Keydataapi } from '../file.d.ts/config';
// verificacion del token
function verifyToken(req, res, _next) {
    if (!req.headers.authorization)
        return res.status(403).send({ message: 'No tienes autorizacion' });
    const tokenext = req.headers['authorization'];
    if (tokenext == undefined)
        return res.status(403).send({ message: 'No presenta el token' });
    //## Extraccion de la api Key
    const listDateToken = tokenext.split(" ");
    const token = listDateToken[listDateToken.length - 1];
    // si no me bota nada, botaria una cadena null
    const payload = (0, jsonwebtoken_1.decode)(token, { complete: true });
    if (payload == null)
        return res.status(403).send({ message: 'No tienes autorizacion' });
    //## Extraccion de la api key
    let _dataKey = Object.keys(payload.payload.user);
    let dataKeyDeconde = payload.payload.user;
    try {
        let comprobe = _dataKey.reduce((obj, item) => {
            obj = obj && (dataKeyDeconde[item] == DataConfig_1.default.apidatkey[item]);
            return obj;
        }, true);
        if (!comprobe)
            return res.status(403).send({ message: 'El toquen es invalido' });
    }
    catch (error) {
    }
    req.token = token;
    _next();
}
exports.default = verifyToken;
//app.use()
