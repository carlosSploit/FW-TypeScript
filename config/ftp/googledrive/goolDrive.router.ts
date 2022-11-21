// creacion de la ruta
import express, { Request,Response } from 'express';
import { IURequest } from '../../varInterface';
import { DriverMulter } from '../multer/multer.driver';
import googledrive from './goolDrive.drive';

const DriverMul = new DriverMulter();
const rooutes = express.Router();

//readindex
rooutes.get("/render", (_req:Request, res:Response) => {
    //res.send(req.params.img)
    res.render("index.ejs");
});

//insertar
rooutes.post('/uploud', async (req:IURequest, res:Response) => {
  DriverMul.insertImage(req, res, async (err) => {
        if (err) return res.send(err);
        const files = req.file;
        const resultFile = await googledrive.insertar(files);
        const resultUrl = await googledrive.generectUrlPublic(resultFile.id);
        return res.status(200).json({
            messege: "imagen insertada correctamente",
            data:[{
              url : resultUrl.webContentLink,
              id : resultFile.id
            }]
        });
      });
});

// read
// rooutes.get('/read/:id', async (req, res) => {
//     const result = await googledrive.generectUrlPublic(req.params.id);
//     return res.send(result);
// });

//delect
rooutes.get('/delect/:id', async (req:IURequest, res:Response) => {
    await googledrive.delect(req.params.id);
    return res.send("Eliminado correctamente");
});

export default rooutes;