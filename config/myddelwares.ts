// si se desea utilizar mysql desabilita esto
import mysql from 'mysql';
import mysqlconnet from 'express-myconnection';
import config from './DataConfig';
import express, { Request,Response } from 'express';
import morgan from 'morgan';
import cors from "cors";
import {errormidelware} from "./error/midellerror";
// configuraciones
// si se desea utilizar mysql desabilita esto
const dbopccion:string = config.bd.mysql[config.bd.mysql.tipeOption]

const cors_product = (req:Request , callback:any)=>{
    let whitelist:any = config.apires.control_access.origin
    let methodssuport:any = config.apires.control_access.methods
    // comprueba si el dominio es compatible
    let corsOptions:any = (whitelist.indexOf(req.header('Origin')) !== -1)? { origin: true } : { origin: false }
    // comprueba si el methodo esta permitido
    let corsOptions2:any = (methodssuport.indexOf(req.method) !== -1)? { origin: true } : { origin: false }
    //console.log(req.header('Origin'))
    callback(null, {origin: (corsOptions.origin && corsOptions2.origin)})
};

const cors_dev = (_req:Request , callback:any)=>{
    let corsOptions = { origin: true };
    //console.log(req.header('Origin'))
    callback(null, corsOptions)
};

const ScamUsserFunction = (req:Request, _res:Response , next) => {
    let messege = `#############################################################\nip de consulta : ${req.headers["x-forwarded-for"]}\nlenguaje       : ${req.headers["accept-language"]} \nsofware usado  : ${req.headers["user-agent"]} \n#############################################################`;
    console.log(messege);
    next();
}

export const middelware = {
    configScanUsser: ScamUsserFunction,
    configmysql: mysqlconnet(mysql, dbopccion, config.bd.mysql.tipeOption),
    configjson : express.json(), // para que las respuestas se den en json
    configresponse : morgan("dev"), // ayuda a ver las peticiones en log de lo que se envia al servidor
    configcorsdev: cors(cors_dev),
    configcorsprov :  cors(cors_product),
    midellerror : errormidelware
}