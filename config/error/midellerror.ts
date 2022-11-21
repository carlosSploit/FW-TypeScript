import { ErrorRequestHandler, Request, Response } from "express";

export const errormidelware = (error:ErrorRequestHandler ,_req:Request ,res:Response ,_next:void ) => {
    res.status(400).json({
        status:'error',
        name: error.name
        //message : error.message,
        //path: error.path
    });
}