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
exports.tokengoogle = void 0;
const googleapis_1 = require("googleapis");
const key_json_1 = __importDefault(require("../../key.json"));
const tokengoogle = () => __awaiter(void 0, void 0, void 0, function* () {
    const oAunt = new googleapis_1.google.auth.OAuth2(key_json_1.default.gmailcredencial.CLIENT_ID, key_json_1.default.gmailcredencial.CLIENT_SECRET, key_json_1.default.gmailcredencial.REDIRECT_URI);
    oAunt.setCredentials({ refresh_token: key_json_1.default.gmailcredencial.REFRESH_TOKEN });
    const token = yield oAunt.getAccessToken();
    return token.token;
});
exports.tokengoogle = tokengoogle;
