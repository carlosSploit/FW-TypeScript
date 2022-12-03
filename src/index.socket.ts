import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Socket } from 'socket.io';
/// callbacks/ triggers --------------------------
import skgenerick from './sockets/generic.socket'
import skusuario from './sockets/usuarios.socket'
import sktipocurso from './sockets/tipocurso.socket'

// --------------------------------------------------------------------------------- SOCKET IO
const SocketIo = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  skgenerick(socket)
  skusuario(socket)
  sktipocurso(socket)
}

export default SocketIo
