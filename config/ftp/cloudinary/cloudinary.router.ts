import express, { Request, Response } from "express";
import fs from "fs";
import { IURequest } from "../../varInterface";
import { DriverMulter } from "../multer/multer.driver";
/// ----------------------------------------------
//import config from "../../config.json";
import { uploads } from "./cloudinary.driver";

//######################### rooutes ###################################

const rooutes = express.Router();
const DriverMul = new DriverMulter(/jpeg|jpg|png|gif/);

//readindex
rooutes.get("/render/", (_req:Request, res:Response) => {
  //res.send(req.params.img)
  res.render("index2.ejs");
});

//insert
rooutes.post("/insert", async (req:IURequest, res:Response) => {
  DriverMul.insertImage(req, res, async (err) => {
    if (err) return res.send(err);
    const uploader = async (path) => await uploads(path,'Images');
    const urls = [];
    const {path} = req.file;
    const newpath = await uploader(path);
    urls.push(newpath)
    fs.unlinkSync(path)
    return res.status(200).json({
        messege: "imagen insertada correctamente",
        data:urls
    });
  });
});

export default rooutes;