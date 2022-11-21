"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploads = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const key_json_1 = __importDefault(require("../../key.json"));
cloudinary_1.default.v2.config({
    cloud_name: key_json_1.default.cloudinary.CLOUND_NAME,
    api_key: key_json_1.default.cloudinary.API_KEY,
    api_secret: key_json_1.default.cloudinary.API_SECRET
});
const uploads = (file, _folder) => {
    let opccion = { folder: _folder };
    return new Promise(resolve => {
        cloudinary_1.default.v2.uploader.upload(file, opccion, (_err, callback) => {
            resolve({
                url: callback.url,
                id: callback.public_id
            });
        });
    });
};
exports.uploads = uploads;
