import express, { Request, Response, Express } from 'express';
// configuracion del socket IO
// import { Server, Socket } from 'socket.io';
// import http from "http";
//------------------------------
import path from 'path';
/// rotas de app ---------------------------------
import tokeniser from '../config/tockenizer/router/routertoken';        // # JWT TOKENISER
import ftpmulter from '../config/ftp/multer/multer.router';             // # SERVIDOR DE ARCHIVOS LOCAL
import ftpgoogle from '../config/ftp/googledrive/goolDrive.router';     // # SERVIDOR DE ARCHIVOS GOOGLEDRIVE
import ftpclodyn from '../config/ftp/cloudinary/cloudinary.router';     // # SERVIDOR DE ARCHIVOS CLOUDINARY
import routers from './index.routers';
// socket -----------------------------------------
// import SocketIo from './index.socket';
/// configuraciones -------------------------------
import config from '../config/DataConfig';
import { middelware } from '../config/myddelwares';
// import { DefaultEventsMap } from 'socket.io/dist/typed-events';


//config ----------------------------------------------------------------------
const app: Express = express();
// const serverApp = http.createServer(app); // crea un nuevo servicio para el socket io
// const ioSocket = new Server(serverApp, { cors: { origin: "*" } }); // creando escucha de web socket
app.set('port', process.env.PORT || config.apires.portpru)
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
//mydellwares ------------------------------------------------------------------
/* 
si se desea utilizar mysql descomente la linea
app.use(middelware.configmysql)
por otro lado entre a la carpeta config/lib/myddelware.js y rescomente la linea
configmysql: mysqlconnet(mysql, dbopccion, config.bd.mysql.tipeOption),
*/
//app.use(middelware.configScanUsser); // captura quien hace la ip, el lenguaje y la aplicacion desde donde hacen la peticion
//app.use(middelware.configmysql);
app.use(middelware.configjson);
app.use(middelware.configresponse);
app.use(middelware.configcorsdev); //configuracion de los cors
//app.use(middelware.midellerror)

//rootas -----------------------------------------------------------------------
//**** roota principal o generica *****/
app.get('/', (_req: Request, res: Response) => {
    res.send('welcon to my apy')
});
//**** routers personalizados - ,verifyToken, */
app.use('/tokeniser', tokeniser);
app.use('/api', routers);
// ftp de archivos
app.use('/ftpgoogle', ftpgoogle); // subir archivos por medio de google drive (subir cualquier archivo)
app.use('/ftpclodyn', ftpclodyn); // subir archivos por medio de cloudinary (subir imagenes)
app.use('/ftpmulter', ftpmulter); // subir archivos por medio de multer
// controll de errores

// web socket --------------------------------------------------------------------
// # https://www.youtube.com/watch?v=mEr9lt5mG9A
// # https://www.youtube.com/watch?v=0wqteZNqruc
// # https://www.youtube.com/watch?v=C1_Rw_H7Q3A

// Server Socket-----------------------------------------------------------------
// ioSocket.on('connection', (socket:Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
//   SocketIo(socket)
// })

export default app;