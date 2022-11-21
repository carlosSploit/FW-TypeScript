"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errormidelware = void 0;
const errormidelware = (error, _req, res, _next) => {
    res.status(400).json({
        status: 'error',
        name: error.name
        //message : error.message,
        //path: error.path
    });
};
exports.errormidelware = errormidelware;
