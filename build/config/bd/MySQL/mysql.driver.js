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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverMysql = void 0;
const mysql_1 = __importDefault(require("mysql"));
class DriverMysql {
    constructor(dbConfig, strategy = 'single') {
        this.poolConnection = null;
        this.mySQL = mysql_1.default;
        this.dbConfig = dbConfig;
        this._strategy = strategy;
    }
    handleDisconnect() {
        this.connection = this.mySQL.createConnection(this.dbConfig);
        this.connection.connect(function (err) {
            if (err) {
                console.log('error when connecting to db:', err);
                setTimeout(this.handleDisconnect, 2000);
            }
        });
        this.connection.on('error', function (err) {
            console.log('db error', err);
            if (err.code === 'PROTOCOLconnection_LOST') {
                this.handleDisconnect();
            }
            else {
                throw err;
            }
        });
    }
    createConnetion() {
        // Configuring strategies
        switch (this._strategy) {
            case 'single':
                // Creating single connection instance
                this.connection = this.mySQL.createConnection(this.dbConfig);
                this.handleDisconnect();
                break;
            case 'pool':
                // Creating pool instance
                this.pool = this.mySQL.createPool(this.dbConfig);
                break;
            case 'request':
                // Nothing at this point do be done
                break;
            default:
                throw new Error('Not supported connection strategy!');
        }
    }
    connetion() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resol, rejec) => {
                switch (this._strategy) {
                    case 'single':
                        // getConnection will return singleton connection
                        resol({ cnn: this.connection, type: 'single' });
                        break;
                    case 'pool':
                        // Returning cached connection from a pool, caching is on request level
                        if (this.poolConnection)
                            resol({ cnn: this.poolConnection, type: 'pool' });
                        // Getting connection from a pool
                        this.pool.getConnection(function (err, connection) {
                            if (err) {
                                rejec(err);
                                console.log(err);
                            }
                            ;
                            resol({ cnn: connection, type: 'pool' });
                        });
                        break;
                    case 'request':
                        // Returning cached connection, caching is on request level
                        if (this._requestConnection)
                            resol({ cnn: this._requestConnection, type: 'request' });
                        // Creating new connection
                        var connection = this.mySQL.createConnection(this.dbConfig);
                        connection.connect(function (err) {
                            if (err) {
                                rejec(err);
                                console.log(err);
                            }
                            ;
                            resol({ cnn: connection, type: 'request' });
                        });
                        break;
                }
            }).catch((err) => setImmediate(() => { console.log(err.message); })); // si da un error de promesa
        });
    }
    desconnetion() {
        // Ending request connection if available
        if (this._requestConnection)
            this._requestConnection.end();
        // Releasing pool connection if available
        if (this.poolConnection)
            this.poolConnection.release();
    }
    getSigleQuery(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            // Se crea la connexion a la base de datos mySql
            this.createConnetion();
            // rescatar la conexion existente
            let dataConnection = yield this.connetion();
            // si se dio como respuesta la conexion
            if (Object.keys(dataConnection).indexOf('cnn') != -1) {
                if (dataConnection.type == "pool")
                    this.poolConnection = dataConnection.cnn;
                else
                    this._requestConnection = dataConnection.cnn;
            }
            yield callback(null, dataConnection.cnn);
            //this.desconnetion(); 
        });
    }
}
exports.DriverMysql = DriverMysql;
// let mySQL,
//     _dbConfig,
//     _connection, // This is used as a singleton in a single connection strategy
//     _pool; // Pool singleton
// /**
//  * Handling connection disconnects, as defined here: https://github.com/felixge/node-mysql
//  */
// function handleDisconnect() {
//     _connection = mySQL.createConnection(_dbConfig);
//     _connection.connect(function (err) {
//         if (err) {
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 2000);
//         }
//     });
//     _connection.on('error', function (err) {
//         console.log('db error', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             handleDisconnect();
//         } else {
//             throw err;
//         }
//     });
// }
// /**
//  * Returns middleware that will handle mysql db connections
//  *
//  * @param {Object} dbConfig - object with mysql db options
//  * @param {String} or undefined strategy - default is single strategy
//  * @return {Function}
//  * @api public
//  */
// export default function (dbConfig, strategy:string) {
//     // validaciones
//     if (null == dbConfig) throw new Error('Missing dbConfig module param!');
//     if (null == strategy) strategy = 'single';
//     // Setting _mysql module ref
//     _mysql = mysql;
//     // Setting _dbConfig ref
//     _dbConfig = dbConfig;
//     // Configuring strategies
//     switch (strategy) {
//         case 'single':
//             // Creating single connection instance
//             _connection = _mysql.createConnection(dbConfig);
//             handleDisconnect();
//             break;
//         case 'pool':
//             // Creating pool instance
//             _pool = _mysql.createPool(dbConfig);
//             break;
//         case 'request':
//             // Nothing at this point do be done
//             break;
//         default:
//             throw new Error('Not supported connection strategy!');
//     }
//     return function (req, res, next) {
//         var poolConnection,
//             requestConnection;
//         switch (strategy) {
//             case 'single':
//                 // getConnection will return singleton connection
//                 req.getConnection = function (callback) {
//                     callback(null, _connection);
//                 }
//                 break;
//             case 'pool':
//                 // getConnection handled by mysql pool
//                 req.getConnection = function (callback) {
//                     // Returning cached connection from a pool, caching is on request level
//                     if (poolConnection) return callback(null, poolConnection);
//                     // Getting connection from a pool
//                     _pool.getConnection(function (err, connection) {
//                         if (err) return callback(err);
//                         poolConnection = connection;
//                         callback(null, poolConnection);
//                     });
//                 }
//                 break;
//             case 'request':
//                 // getConnection creates new connection per request
//                 req.getConnection = function (callback) {
//                     // Returning cached connection, caching is on request level
//                     if (requestConnection) return callback(null, requestConnection);
//                     // Creating new connection
//                     var connection = _mysql.createConnection(dbConfig);
//                     connection.connect(function (err) {
//                         if (err) return callback(err);
//                         requestConnection = connection;
//                         callback(null, requestConnection);
//                     });
//                 }
//                 break;
//         }
//         var end = res.end;
//         res.end = function (data, encoding) {
//             // Ending request connection if available
//             if (requestConnection) requestConnection.end();
//             // Releasing pool connection if available
//             if (poolConnection) poolConnection.release();
//             res.end = end;
//             res.end(data, encoding);
//         }
//         next();
//     }
// }
