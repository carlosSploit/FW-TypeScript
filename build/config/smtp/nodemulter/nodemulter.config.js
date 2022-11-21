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
exports.CpanelMulterconfig = exports.GooogleMulterconfig = void 0;
const key_json_1 = __importDefault(require("../../key.json"));
const gmail_driver_1 = require("./gmail.driver");
const nodemailer_1 = __importDefault(require("nodemailer"));
const GooogleMulterconfig = () => __awaiter(void 0, void 0, void 0, function* () {
    let accesToken = yield (0, gmail_driver_1.tokengoogle)();
    let TramspotSMTP;
    let Options = {
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: key_json_1.default.gmailcredencial.USSER,
            clientId: key_json_1.default.gmailcredencial.CLIENT_ID,
            clientSecret: key_json_1.default.gmailcredencial.CLIENT_SECRET,
            refreshToken: key_json_1.default.gmailcredencial.REFRESH_TOKEN,
            accessToken: accesToken
        }
    };
    try {
        TramspotSMTP = nodemailer_1.default.createTransport(Options);
    }
    catch (error) {
        // si esque hay un error en capturar un nuevo token emprimira el error
        // este metodo evitara que la api se caiga al realizar este proceso
        console.log(error);
    }
    return TramspotSMTP;
});
exports.GooogleMulterconfig = GooogleMulterconfig;
const CpanelMulterconfig = () => __awaiter(void 0, void 0, void 0, function* () {
    let TramspotSMTP;
    let Options = {
        host: key_json_1.default.cpanelsmtp.HOST,
        port: parseInt(key_json_1.default.cpanelsmtp.PORT),
        logger: true,
        debug: true,
        secure: true,
        auth: {
            user: key_json_1.default.cpanelsmtp.USSER,
            pass: key_json_1.default.cpanelsmtp.PASS
        }
    };
    try {
        TramspotSMTP = nodemailer_1.default.createTransport(Options);
    }
    catch (error) {
        // si esque hay un error en capturar un nuevo token emprimira el error
        // este metodo evitara que la api se caiga al realizar este proceso
        console.log(error);
    }
    return TramspotSMTP;
});
exports.CpanelMulterconfig = CpanelMulterconfig;
