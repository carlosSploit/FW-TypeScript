"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const DataConfig_1 = __importDefault(require("../../DataConfig"));
const uuid_1 = require("uuid");
const rooutes = express_1.default.Router();
//######################### rooutes ###################################
const storageftp = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../ftp"),
    filename: (_req, file, cb) => {
        cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname).toLowerCase());
    },
});
const Filercode = (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mytype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path_1.default.extname(file.originalname));
    if (mytype && extname)
        return cb(null, true);
    cb(null, false);
};
const insertImage = (0, multer_1.default)({
    storage: storageftp,
    //dest: "ftp",
    limits: { fieldSize: 2000000 },
    fileFilter: Filercode,
}).single("photo");
// ####################################################################
//readindex
rooutes.get("/render/", (_req, res) => {
    res.render("index3.ejs");
});
//insert
rooutes.post("/insert", (req, res) => {
    insertImage(req, res, (err) => {
        if (err)
            return res.send(err);
        //console.log(req.file);
        if (req.file)
            return res.send({ error: "Error al leer archivo" });
        let nameFile = req.file.filename;
        var jsonresp = {
            url: DataConfig_1.default.apires.hostFtp + "/gftp/" + nameFile,
        };
        res.json(jsonresp);
    });
});
exports.default = rooutes;
