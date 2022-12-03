import Validator from '../../../../config/complementos/validator';
import { UsuarioEntity } from "./usuario.entity";
// import { ExcersiseValue } from "../../excersise/dominio/excersi.value";
const objvalit = new Validator();

export class UsuarioValue implements UsuarioEntity {

  id: String;
  name: String;
  count?: Number;

  constructor({ id, name }: { id: String, name: String } = { id: '', name: '' }) {
    this.id = id;
    this.name = name;
    this.count = 0;
  }

  fromJson(json: any): UsuarioValue {
    let idus: String = objvalit.compruJson('_id', json, "").toString();
    let nameus: String = objvalit.compruJson('username', json, '');
    return new UsuarioValue({ id: idus, name: nameus });
  }

  toJson() {
    return {
      _id: this.id,
      username: this.name,
      count: this.count
    };
  }
}