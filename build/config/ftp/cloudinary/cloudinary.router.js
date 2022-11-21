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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const multer_driver_1 = require("../multer/multer.driver");
/// ----------------------------------------------
//import config from "../../config.json";
const cloudinary_driver_1 = require("./cloudinary.driver");
//######################### rooutes ###################################
const rooutes = express_1.default.Router();
const DriverMul = new multer_driver_1.DriverMulter(/jpeg|jpg|png|gif/);
//readindex
rooutes.get("/render/", (_req, res) => {
    //res.send(req.params.img)
    res.render("index2.ejs");
});
//insert
rooutes.post("/insert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    DriverMul.insertImage(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.send(err);
        const uploader = (path) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, cloudinary_driver_1.uploads)(path, 'Images'); });
        const urls = [];
        const { path } = req.file;
        const newpath = yield uploader(path);
        urls.push(newpath);
        fs_1.default.unlinkSync(path);
        return res.status(200).json({
            messege: "imagen insertada correctamente",
            data: urls
        });
    }));
}));
exports.default = rooutes;
