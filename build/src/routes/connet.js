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
const mysql_connet_1 = require("../../config/bd/MySQL/mysql.connet");
const rooutes = express_1.default.Router();
const connetion = new mysql_connet_1.DbSingleConnetMySql();
//######################### rooutes ###################################
//listar
rooutes.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield connetion.single_query("SELECT * FROM `participante` WHERE 1", []);
    return res.send(data);
}));
exports.default = rooutes;
