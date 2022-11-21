"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// creacion de la ruta
const express_1 = __importDefault(require("express"));
const multer_driver_1 = require("../multer/multer.driver");
const goolDrive_drive_1 = __importDefault(require("./goolDrive.drive"));
const DriverMul = new multer_driver_1.DriverMulter();
const rooutes = express_1.default.Router();
//readindex
rooutes.get("/render", (_req, res) => {
    //res.send(req.params.img)
    res.render("index.ejs");
});
//insertar
rooutes.post('/uploud', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    DriverMul.insertImage(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.send(err);
        const files = req.file;
        const resultFile = yield goolDrive_drive_1.default.insertar(files);
        const resultUrl = yield goolDrive_drive_1.default.generectUrlPublic(resultFile.id);
        return res.status(200).json({
            messege: "imagen insertada correctamente",
            data: [{
                    url: resultUrl.webContentLink,
                    id: resultFile.id
                }]
        });
    }));
}));
// read
// rooutes.get('/read/:id', async (req, res) => {
//     const result = await googledrive.generectUrlPublic(req.params.id);
//     return res.send(result);
// });
//delect
rooutes.get('/delect/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield goolDrive_drive_1.default.delect(req.params.id);
    return res.send("Eliminado correctamente");
}));
exports.default = rooutes;
