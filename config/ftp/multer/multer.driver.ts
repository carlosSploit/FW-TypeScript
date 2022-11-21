import multer, { FileFilterCallback } from "multer";
import path from "path";
import { v4 } from "uuid";
import { IURequest } from "../../varInterface";
//######################### rooutes ###################################

export class DriverMulter{
    storageftp:multer.StorageEngine;
    Filercode:any;
    insertImage:any;

    constructor(filter:RegExp = /\w*/, limit:number = 2000000){
        // configuramos la ruta de carga del archivo y conque nombre se guardara
        this.storageftp = multer.diskStorage({
            destination: path.join(__dirname, "./fileArchiv"),
            filename: (_req, file, cb) => {
              cb(null, v4() + path.extname(file.originalname).toLowerCase());
            },
        });

        // configuracion de los filtros de extencion decada archivo
        this.Filercode = (_req:IURequest, file:Express.Multer.File, cb:FileFilterCallback) => {
            const filetypes:RegExp = filter;
            const mytype:boolean = filetypes.test(file.mimetype);                    //la extencion .typearchive
            const extname:boolean = filetypes.test(path.extname(file.originalname)); //la extencion .typearchive
            if (mytype && extname) cb(null, true);
            cb(null,false);
        }

        // configuracion del controlador master de Multier
        this.insertImage = multer({
            storage: this.storageftp,
            //dest: "ftp",
            limits: { fieldSize: limit },
            fileFilter: this.Filercode,
        }).single("photo");
    }
}

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