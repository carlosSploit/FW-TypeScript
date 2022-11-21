import express, { Request, Response } from "express";
import path from "path";
import config from "../../DataConfig";
import { IURequest } from "../../varInterface";
import { DriverMulter } from "./multer.driver";

const rooutes = express.Router();
const DriverMul = new DriverMulter(/jpeg|jpg|png|gif/);

//readindex
rooutes.get("/render/", (_req:Request, res:Response) => {
    res.render("index3.ejs");
});

// vizualizar archivo
rooutes.get("/view/:namefile",(req: Request, res:Response)=>{
    const ruta = __dirname + String.fromCharCode(92) + "fileArchiv" + String.fromCharCode(92)+ req.params.namefile;
    res.sendFile(path.join(ruta));
});

//insert
rooutes.post("/uploud", (req:IURequest, res: Response) => {
    DriverMul.insertImage(req, res, (err):any => {
        if (err) return res.send(err);
        //console.log(req.file);
        if (!(req.file)) return res.send({error: "Error al leer archivo"})
        let nameFile:string = req.file.filename;
        var jsonresp = {
        url: config.apires.hostFtp + "/ftpmulter/view/" + nameFile,
        };
        res.json(jsonresp);
    });
});

export default rooutes;