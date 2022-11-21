// templates
import contentbasic from './basic.html';

const email_basic = (nombre:string ="default",messeg:string = "Contenido de messege generico"):string => {
    let content = contentbasic;
    content = content.replace("&nombre&",nombre);
    content = content.replace("&messeg&",messeg)
    return content;
}

export default {
    email_basic: email_basic
};