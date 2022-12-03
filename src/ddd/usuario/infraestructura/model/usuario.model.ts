import { UsuarioValue } from '../../dominio/usuario.value';

export class UsuarioModel {

  dataDefault: Array<UsuarioValue> = [
    new UsuarioValue({ id: '454645666', name: "Carlos Guerrero Garcia" }),
    new UsuarioValue({ id: '123145647', name: "Carlos Garcia Guevara" }),
    new UsuarioValue({ id: '776546545', name: "Alonzo Hurtado" })
  ];

  async createUsuario(UserAdap: UsuarioValue) {
    this.dataDefault.push(UserAdap);
    return UserAdap.toJson();
  }

  async getUserById(UserAdap: UsuarioValue) {
    let result: Array<UsuarioValue> = this.dataDefault.filter((item: UsuarioValue) => {
      return item.id == UserAdap.id;
    })
    return result.map((item: UsuarioValue) => {
      return item.toJson();
    });
  }

  async getUsers() {
    return this.dataDefault.map((item: UsuarioValue) => {
      return item.toJson();
    });
  }

}