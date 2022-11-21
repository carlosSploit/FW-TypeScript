import { Response } from 'express';
import _jwt, { Jwt,decode, JwtPayload } from 'jsonwebtoken' ;
import { IURequest } from '../varInterface';
// archivo de configuracion
import config from '../DataConfig';
//import { _Keydataapi } from '../file.d.ts/config';

// verificacion del token
export default function verifyToken(req:IURequest ,res:Response ,_next:any): any {

    if(!req.headers.authorization)return res.status(403).send({message: 'No tienes autorizacion'});
    const tokenext:String =  req.headers['authorization']
    if (tokenext == undefined) return res.status(403).send({message: 'No presenta el token'});
    //## Extraccion de la api Key
    const listDateToken:string[] = tokenext.split(" ");
    const token:string = listDateToken[listDateToken.length-1]
    // si no me bota nada, botaria una cadena null
    const payload:Jwt|null|string|JwtPayload = decode(token, { complete: true });
    if (payload == null) return res.status(403).send({message: 'No tienes autorizacion'});
    //## Extraccion de la api key
    let _dataKey:string[] = Object.keys(payload.payload.user);
    let dataKeyDeconde = payload.payload.user;
    try {
        let comprobe:boolean = _dataKey.reduce((obj:boolean, item:string)=>{
            obj = obj && (dataKeyDeconde[item] == config.apidatkey[item]);
            return  obj ;
        },true);
        if (!comprobe) return res.status(403).send({message: 'El toquen es invalido'});
    } catch (error) {
        
    }
    req.token = token;
    _next()
 }
 //app.use()