/* 
    https://www.youtube.com/watch?v=uXtZVPwLuDs
*/
import template from "./templats/tample.controller";
import { GooogleMulterconfig } from './nodemulter.config';

const enviarmessege = async (to:string = "cavarithprueba2004@gmail.com",title:string ="Titulo por predeterminado" ,messege:string = "Mensaje de contenido default" ,_format:string = ""):Promise<void> => {

    // conexion de google correo
    const transport = await GooogleMulterconfig();
    let htmlstream = template.email_basic(title,messege);

    var mailOptions = {
        from : `Canvarith`,
        to : `${to}`,
        subject: "Enviando desde nodemailer",
        html: htmlstream
    }

    try {
        transport.sendMail(
            mailOptions,
            (error, info) => {
                if(error){
                    console.log(error);
                    return ;
                }else{
                    console.log("Email enviado.");
                    console.log(info);
                }
    
            }
        )   
    } catch (error) {
        console.log(error);
    }
}

export default enviarmessege;