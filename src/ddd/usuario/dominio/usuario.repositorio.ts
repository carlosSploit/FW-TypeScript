//import { UsuarioEntity } from "./usuario.entity";
import { UsuarioValue } from "./usuario.value";

export interface UsuarioRepositorio{      
  createUsuario(UserAdap: UsuarioValue):Promise<any>;
  getUserById (UserAdap: UsuarioValue):Promise<any>;
  getUsers ():Promise<any>;
}