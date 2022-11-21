import config from '../../key.json';
import { tokengoogle } from './gmail.driver';
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const GooogleMulterconfig = async ():Promise<Transporter<SMTPTransport.SentMessageInfo>> =>{
    let accesToken: string = await tokengoogle();
    let TramspotSMTP:Transporter<SMTPTransport.SentMessageInfo>;
    let Options:SMTPTransport.Options = {
        service: "gmail",
        auth: {
            type : "OAuth2",
            user : config.gmailcredencial.USSER,
            clientId: config.gmailcredencial.CLIENT_ID,
            clientSecret: config.gmailcredencial.CLIENT_SECRET,
            refreshToken: config.gmailcredencial.REFRESH_TOKEN,
            accessToken: accesToken
        }
    };

    try {
        TramspotSMTP = nodemailer.createTransport(Options);
    } catch (error) {
        // si esque hay un error en capturar un nuevo token emprimira el error
        // este metodo evitara que la api se caiga al realizar este proceso
        console.log(error);
    }

    return TramspotSMTP;
}

export const CpanelMulterconfig = async ():Promise<Transporter<SMTPTransport.SentMessageInfo>> =>{
    let TramspotSMTP:Transporter<SMTPTransport.SentMessageInfo>;
    let Options:SMTPTransport.Options = {
        host: config.cpanelsmtp.HOST,
        port: parseInt(config.cpanelsmtp.PORT),
        logger: true,
        debug: true,
        secure: true,
        auth:{
            user: config.cpanelsmtp.USSER,
            pass: config.cpanelsmtp.PASS
        }
    };

    try {
        TramspotSMTP = nodemailer.createTransport(Options);
    } catch (error) {
        // si esque hay un error en capturar un nuevo token emprimira el error
        // este metodo evitara que la api se caiga al realizar este proceso
        console.log(error);
    }

    return TramspotSMTP;
}