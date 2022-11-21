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
// Informacion cobre la creacion del codigo -> https://www.youtube.com/watch?v=1y0-IfRW114
const googleapis_1 = require("googleapis");
//import path from 'path';
const fs_1 = __importDefault(require("fs"));
const key_json_1 = __importDefault(require("../../key.json"));
// creacion de la ruta
// const express = require('express')
// const rooutes = express.Router()
const CLIENT_ID = key_json_1.default.googledrive.CLIENT_ID;
const CLIENT_SECRET = key_json_1.default.googledrive.CLIENT_SECRET;
const REDIRECT_URI = key_json_1.default.googledrive.REDIRECT_URI;
const REFRESH_TOKEN = key_json_1.default.googledrive.REFRESH_TOKEN;
const oauth2 = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = googleapis_1.google.drive({
    version: 'v3',
    auth: oauth2
});
const insertar = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield drive.files.create({
            requestBody: {
                name: file.originalname,
                mimeType: file.mimetype,
            },
            media: {
                mimeType: file.mimetype,
                body: fs_1.default.createReadStream(file.path)
            }
        });
        //console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
});
const delect = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield drive.files.delete({
            fileId: id
        });
        return response.data;
    }
    catch (error) {
        console.log(error.message);
        return error.message;
    }
});
const generectUrlPublic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield drive.permissions.create({
            fileId: id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });
        const response = yield drive.files.get({
            fileId: id,
            fields: 'webViewLink, webContentLink'
        });
        return response.data;
    }
    catch (error) {
        return error.message;
    }
});
exports.default = {
    insertar: insertar,
    delect: delect,
    generectUrlPublic: generectUrlPublic
};
