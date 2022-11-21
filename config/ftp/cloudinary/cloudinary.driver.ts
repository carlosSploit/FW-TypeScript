import cloud, { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import config from '../../key.json';

cloud.v2.config({
    cloud_name: config.cloudinary.CLOUND_NAME,
    api_key: config.cloudinary.API_KEY,
    api_secret: config.cloudinary.API_SECRET
});

export const uploads = (file,_folder): Promise<any> =>{
    let opccion:cloud.UploadApiOptions = {folder: _folder};
    return new Promise(resolve =>{
        cloud.v2.uploader.upload(file,opccion, (_err:UploadApiErrorResponse, callback: UploadApiResponse)=>{
            resolve({
                url: callback.url,
                id: callback.public_id
            });
        })
    })
}