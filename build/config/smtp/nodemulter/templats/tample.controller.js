"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// templates
const basic_html_1 = __importDefault(require("./basic.html"));
const email_basic = (nombre = "default", messeg = "Contenido de messege generico") => {
    let content = basic_html_1.default;
    content = content.replace("&nombre&", nombre);
    content = content.replace("&messeg&", messeg);
    return content;
};
exports.default = {
    email_basic: email_basic
};
