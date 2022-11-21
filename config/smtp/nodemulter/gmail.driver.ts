import {google} from "googleapis";
import config from '../../key.json';

export const tokengoogle = async () =>{
    const oAunt = new google.auth.OAuth2(config.gmailcredencial.CLIENT_ID,
        config.gmailcredencial.CLIENT_SECRET,
        config.gmailcredencial.REDIRECT_URI);
    oAunt.setCredentials({refresh_token:config.gmailcredencial.REFRESH_TOKEN});
    const token = await oAunt.getAccessToken();
    return token.token;
}
