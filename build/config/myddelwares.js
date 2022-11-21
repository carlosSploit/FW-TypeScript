"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middelware = void 0;
// si se desea utilizar mysql desabilita esto
const mysql_1 = __importDefault(require("mysql"));
const express_myconnection_1 = __importDefault(require("express-myconnection"));
const DataConfig_1 = __importDefault(require("./DataConfig"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const midellerror_1 = require("./error/midellerror");
// configuraciones
// si se desea utilizar mysql desabilita esto
const dbopccion = DataConfig_1.default.bd.mysql[DataConfig_1.default.bd.mysql.tipeOption];
const cors_product = (req, callback) => {
    let whitelist = DataConfig_1.default.apires.control_access.origin;
    let methodssuport = DataConfig_1.default.apires.control_access.methods;
    // comprueba si el dominio es compatible
    let corsOptions = (whitelist.indexOf(req.header('Origin')) !== -1) ? { origin: true } : { origin: false };
    // comprueba si el methodo esta permitido
    let corsOptions2 = (methodssuport.indexOf(req.method) !== -1) ? { origin: true } : { origin: false };
    //console.log(req.header('Origin'))
    callback(null, { origin: (corsOptions.origin && corsOptions2.origin) });
};
const cors_dev = (_req, callback) => {
    let corsOptions = { origin: true };
    //console.log(req.header('Origin'))
    callback(null, corsOptions);
};
const ScamUsserFunction = (req, _res, next) => {
    let messege = `#############################################################\nip de consulta : ${req.headers["x-forwarded-for"]}\nlenguaje       : ${req.headers["accept-language"]} \nsofware usado  : ${req.headers["user-agent"]} \n#############################################################`;
    console.log(messege);
    next();
};
exports.middelware = {
    configScanUsser: ScamUsserFunction,
    configmysql: (0, express_myconnection_1.default)(mysql_1.default, dbopccion, DataConfig_1.default.bd.mysql.tipeOption),
    configjson: express_1.default.json(),
    configresponse: (0, morgan_1.default)("dev"),
    configcorsdev: (0, cors_1.default)(cors_dev),
    configcorsprov: (0, cors_1.default)(cors_product),
    midellerror: midellerror_1.errormidelware
};
