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
/*
    https://www.youtube.com/watch?v=uXtZVPwLuDs
*/
const tample_controller_1 = __importDefault(require("./templats/tample.controller"));
const nodemulter_config_1 = require("./nodemulter.config");
const enviarmessege = (to = "cavarithprueba2004@gmail.com", title = "Titulo por predeterminado", messege = "Mensaje de contenido default", _format = "") => __awaiter(void 0, void 0, void 0, function* () {
    // conexion de google correo
    const transport = yield (0, nodemulter_config_1.GooogleMulterconfig)();
    let htmlstream = tample_controller_1.default.email_basic(title, messege);
    var mailOptions = {
        from: `Canvarith`,
        to: `${to}`,
        subject: "Enviando desde nodemailer",
        html: htmlstream
    };
    try {
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return;
            }
            else {
                console.log("Email enviado.");
                console.log(info);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = enviarmessege;
