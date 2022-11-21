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
const mongoose_1 = __importDefault(require("mongoose"));
const DataConfig_1 = __importDefault(require("../../DataConfig"));
//const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI = `mongodb+srv://${DataConfig_1.default.bd.mongo.NAME}:${DataConfig_1.default.bd.mongo.PASSWORD}@cluster0.90jlnx3.mongodb.net/${DataConfig_1.default.bd.mongo.DATA_BASE}?retryWrites=true&w=majority`;
const Connetion = () => __awaiter(void 0, void 0, void 0, function* () {
    // validation
    if (!(MONGO_URI))
        return console.log("No se coloco la ruta de conexion");
    // ----------
    try {
        let obtions = { useNewUrlParser: true, useUnifiedTopology: true };
        yield mongoose_1.default.connect(MONGO_URI, obtions);
        console.log("Mongodb Connectado");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
exports.default = Connetion;
