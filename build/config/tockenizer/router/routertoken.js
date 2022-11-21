"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DataConfig_1 = __importDefault(require("../../DataConfig"));
const rooutes = express_1.default.Router();
//**** atentificacion *****/
rooutes.use('/', (_req, res) => {
    const user = DataConfig_1.default.apidatkey;
    jsonwebtoken_1.default.sign({ user }, 'secretkey', (_err, token) => {
        res.json({
            token
        });
    });
});
exports.default = rooutes;
