"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// configuracion del socket IO
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
//------------------------------
const path_1 = __importDefault(require("path"));
// si se desea utilizar mysql desabilita esto
const tokenizer_1 = __importDefault(require("./config/tockenizer/tokenizer"));
/// rotas de app ---------------------------------
const routertoken_1 = __importDefault(require("./config/tockenizer/router/routertoken")); // # JWT TOKENISER
const multer_router_1 = __importDefault(require("./config/ftp/multer/multer.router")); // # SERVIDOR DE ARCHIVOS LOCAL
const goolDrive_router_1 = __importDefault(require("./config/ftp/googledrive/goolDrive.router")); // # SERVIDOR DE ARCHIVOS GOOGLEDRIVE
const cloudinary_router_1 = __importDefault(require("./config/ftp/cloudinary/cloudinary.router")); // # SERVIDOR DE ARCHIVOS CLOUDINARY
const generic_1 = __importDefault(require("./src/routes/generic"));
/// configuraciones -------------------------------
const DataConfig_1 = __importDefault(require("./config/DataConfig"));
const myddelwares_1 = require("./config/myddelwares");
//config ----------------------------------------------------------------------
const app = (0, express_1.default)();
const serverApp = http_1.default.createServer(app);
app.set('port', process.env.PORT || DataConfig_1.default.apires.portpru);
app.set("views", path_1.default.join(__dirname, "src/views"));
app.set("view engine", "ejs");
//mydellwares ------------------------------------------------------------------
/*
si se desea utilizar mysql descomente la linea
app.use(middelware.configmysql)
por otro lado entre a la carpeta config/lib/myddelware.js y rescomente la linea
configmysql: mysqlconnet(mysql, dbopccion, config.bd.mysql.tipeOption),
*/
app.use(myddelwares_1.middelware.configScanUsser); // captura quien hace la ip, el lenguaje y la aplicacion desde donde hacen la peticion
//app.use(middelware.configmysql);
app.use(myddelwares_1.middelware.configjson);
app.use(myddelwares_1.middelware.configresponse);
app.use(myddelwares_1.middelware.configcorsdev); //configuracion de los cors
//app.use(middelware.midellerror)
//rootas -----------------------------------------------------------------------
//**** roota principal o gemerica *****/
app.get('/', (_req, res) => {
    res.send('welcon to my apy');
});
//**** routers personalizados - ,verifyToken, */
app.use('/tokeniser', routertoken_1.default);
app.use('/genetic', tokenizer_1.default, generic_1.default);
// ftp de archivos
app.use('/ftpgoogle', goolDrive_router_1.default); // subir archivos
app.use('/ftpclodyn', cloudinary_router_1.default); // subir archivos
app.use('/ftpmulter', multer_router_1.default); // subir archivos
// controll de errores
//resever runnig----------------------------------------------------------------
serverApp.listen(app.get('port'), () => {
    console.log("servidor se encuentra corriendo por el puerto: ", app.get('port'));
});
// web socket
// # https://www.youtube.com/watch?v=mEr9lt5mG9A
// # https://www.youtube.com/watch?v=0wqteZNqruc
let ioSocket = new socket_io_1.Server(serverApp);
ioSocket.on('connection', (socket) => {
    console.log("Usuario Conectado");
    socket.on('conectado', () => {
        console.log("Usuario Conectado");
    });
});
