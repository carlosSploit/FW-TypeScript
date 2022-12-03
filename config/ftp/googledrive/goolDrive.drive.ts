// Informacion cobre la creacion del codigo -> https://www.youtube.com/watch?v=1y0-IfRW114
import { drive_v3, google } from 'googleapis';
//import path from 'path';
import fs from 'fs';
import config from '../../key.json';
import { OAuth2Client } from 'google-auth-library';
// creacion de la ruta
// const express = require('express')
// const rooutes = express.Router()

const CLIENT_ID = config.googledrive.CLIENT_ID;
const CLIENT_SECRET = config.googledrive.CLIENT_SECRET;
const REDIRECT_URI = config.googledrive.REDIRECT_URI;
const REFRESH_TOKEN = config.googledrive.REFRESH_TOKEN;

const oauth2: OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive: drive_v3.Drive = google.drive({
    version: 'v3',
    auth: oauth2
});


const insertar = async (file: Express.Multer.File): Promise<any> => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: file.originalname,
                mimeType: file.mimetype,
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream(file.path)
            }
        });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

const delect = async (id: string): Promise<any> => {
    try {
        const response = await drive.files.delete({
            fileId: id
        });
        return response.data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

const generectUrlPublic = async (id: string): Promise<any> => {
    try {
        await drive.permissions.create({
            fileId: id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });
        const response = await drive.files.get({
            fileId: id,
            fields: 'webViewLink, webContentLink'
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export default {
    insertar: insertar,
    delect: delect,
    generectUrlPublic: generectUrlPublic
}