"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverMulter = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
//######################### rooutes ###################################
class DriverMulter {
    constructor(filter = /\w*/, limit = 2000000) {
        // configuramos la ruta de carga del archivo y conque nombre se guardara
        this.storageftp = multer_1.default.diskStorage({
            destination: path_1.default.join(__dirname, "./fileArchiv"),
            filename: (_req, file, cb) => {
                cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname).toLowerCase());
            },
        });
        // configuracion de los filtros de extencion decada archivo
        this.Filercode = (_req, file, cb) => {
            const filetypes = filter;
            const mytype = filetypes.test(file.mimetype); //la extencion .typearchive
            const extname = filetypes.test(path_1.default.extname(file.originalname)); //la extencion .typearchive
            if (mytype && extname)
                cb(null, true);
            cb(null, false);
        };
        // configuracion del controlador master de Multier
        this.insertImage = (0, multer_1.default)({
            storage: this.storageftp,
            //dest: "ftp",
            limits: { fieldSize: limit },
            fileFilter: this.Filercode,
        }).single("photo");
    }
}
exports.DriverMulter = DriverMulter;
// const storageftp:multer.StorageEngine = multer.diskStorage({
//   destination: path.join(__dirname, "./fileArchiv"),
//   filename: (_req, file, cb) => {
//     cb(null, v4() + path.extname(file.originalname).toLowerCase());
//   },
// });
// const Filercode = (_req:IURequest, file:Express.Multer.File, cb:FileFilterCallback) => {
//     const filetypes:RegExp = /jpeg|jpg|png|gif/;
//     const mytype:boolean = filetypes.test(file.mimetype);                    //la extencion .typearchive
//     const extname:boolean = filetypes.test(path.extname(file.originalname)); //la extencion .typearchive
//     if (mytype && extname) return cb(null, true);
//     cb(null,false);
//   }
// const insertImage:any = multer({
//   storage: storageftp,
//   //dest: "ftp",
//   limits: { fieldSize: 2000000 },
//   fileFilter: Filercode,
// }).single("photo");
