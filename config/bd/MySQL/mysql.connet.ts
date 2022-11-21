// conection de mysql
import {DriverMysql} from './mysql.driver';
import config from '../../DataConfig';
import { Connection, MysqlError, PoolConnection } from 'mysql';

export class DbSingleConnetMySql{

    MysqlConnet;
    dbopccion;

    constructor(){
        this.dbopccion = config.bd.mysql[config.bd.mysql.tipeOption];
        this.MysqlConnet = new DriverMysql(this.dbopccion, config.bd.mysql.tipeOption);
    }

    // Mesta la consulta basica - con la conexxion por medio de un callback
    async single_query(query:string, parameter, messege:string = ""){
        // se crea una promesa, apuntando a la cnexxion - en cual botara el error y la connection
        let result = await new Promise(async (resol, reject) => await this.MysqlConnet.getSigleQuery((err: MysqlError, connection:PoolConnection|Connection)=>{
            if (err) return reject(err) // en caso que de un error de conexion
            // -- Inicio de consulta
            connection.query(query, parameter, (err, rows) => {
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
        return messege;
    }
}