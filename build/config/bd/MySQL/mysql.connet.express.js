"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbconeccion = void 0;
class dbconeccion {
    // Mesta la consulta basica - con la conexxion por medio de un callback
    single_query(req, _res, query, parameter, messege = "") {
        return __awaiter(this, void 0, void 0, function* () {
            // se crea una promesa, apuntando a la cnexxion - en cual botara el error y la connection
            let result = yield new Promise((resol, reject) => __awaiter(this, void 0, void 0, function* () {
                return yield req.getConnection((err, connection) => {
                    if (err)
                        return reject(err); // en caso que de un error de conexion
                    // -- Inicio de consulta
                    connection.query(query, parameter, (err, rows) => {
                        if (err)
                            return reject(err);
                        if (messege === "")
                            resol(rows);
                        resol(messege);
                    });
                    // -- Fin - Inicio de consulta
                });
            })).catch((err) => setImmediate(() => { console.log(err.message); })); // si da un error de promesa;
            // Si no se envia un mensaje , inprime el resultado
            if (messege === "")
                return result;
            //  si se envia el mensaje, lo retorna
            console.log('\x1b[32m', messege);
            return messege;
        });
    }
}
exports.dbconeccion = dbconeccion;
