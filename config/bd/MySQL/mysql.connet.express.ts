// conection de mysql
//import config from '../../DataConfig';
import { Connection, MysqlError, PoolConnection } from 'mysql';
import { Response } from 'express';
import { IURequest } from '../../varInterface';

export class dbconeccion{
    
    // Mesta la consulta basica - con la conexxion por medio de un callback
    async single_query(req:IURequest,_res:Response, query:string, parameter, messege:string = ""){
        // se crea una promesa, apuntando a la cnexxion - en cual botara el error y la connection
        let result = await new Promise(async (resol, reject) => await req.getConnection((err:MysqlError, connection: PoolConnection|Connection|any)=>{
            if (err) return reject(err) // en caso que de un error de conexion
            // -- Inicio de consulta
            connection.query(query, parameter, (err: any, rows: unknown) => {
                if (err) return reject(err);
                if (messege === "") resol(rows);
                resol(messege);
            })
            // -- Fin - Inicio de consulta
        })).catch((err) => setImmediate(() => { console.log(err.message);})); // si da un error de promesa;
        // Si no se envia un mensaje , inprime el resultado
        if (messege === "") return result
        //  si se envia el mensaje, lo retorna
        console.log('\x1b[32m',messege)
        return messege
    }
}