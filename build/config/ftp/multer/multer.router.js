"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const DataConfig_1 = __importDefault(require("../../DataConfig"));
const multer_driver_1 = require("./multer.driver");
const rooutes = express_1.default.Router();
const DriverMul = new multer_driver_1.DriverMulter(/jpeg|jpg|png|gif/);
//readindex
rooutes.get("/render/", (_req, res) => {
    res.render("index3.ejs");
});
// vizualizar archivo
rooutes.get("/view/:namefile", (req, res) => {
    const ruta = __dirname + String.fromCharCode(92) + "fileArchiv" + String.fromCharCode(92) + req.params.namefile;
    res.sendFile(path_1.default.join(ruta));
});
//insert
rooutes.post("/uploud", (req, res) => {
    DriverMul.insertImage(req, res, (err) => {
        if (err)
            return res.send(err);
        //console.log(req.file);
        if (!(req.file))
            return res.send({ error: "Error al leer archivo" });
        let nameFile = req.file.filename;
        var jsonresp = {
            url: DataConfig_1.default.apires.hostFtp + "/ftpmulter/view/" + nameFile,
        };
        res.json(jsonresp);
    });
});
exports.default = rooutes;
