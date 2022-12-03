import { UsuarioRepositorio } from "../dominio/usuario.repositorio";
import { UsuarioValue } from "../dominio/usuario.value";

export class UsuarioUseCase {
  modelUsuario: UsuarioRepositorio;

  constructor(interfamodel: UsuarioRepositorio) {
    this.modelUsuario = interfamodel;
  }

  async createUsuario({ id, username }: { id: String, username: String }) {
    let result = await this.modelUsuario.createUsuario(new UsuarioValue().fromJson({ "_id": id, "username": username }));
    return { status: 200, result };
  }

  async getUsers() {
    let result = await this.modelUsuario.getUsers();
    return { status: 200, result };
  }

  async getUserToId({ id }: { id: String }) {
    let result = await this.modelUsuario.getUserById(new UsuarioValue().fromJson({ "_id": id }));
    return { status: 200, result };
  }

}