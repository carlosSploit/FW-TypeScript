import _express, { Request, Response, Router } from 'express';
import { UsuarioUseCase } from '../ddd/usuario/aplicacion/usuario.usecase';
// import { UsuarioValue } from '../ddd/usuario/dominio/usuario.value';
import { UsuarioModel } from '../ddd/usuario/infraestructura/model/usuario.model';
//import {Exercis} from '../negocio/Exercis.negocio';
const router = Router();
const modeluser: UsuarioModel = new UsuarioModel();

router.post('/', async (req: Request, res: Response) => {
    let username = req.body.username;
    let id = req.body._id;
    let result = await new UsuarioUseCase(modeluser).createUsuario({ id, username });
    res.json({
        stade: 200,
        messege: 'succes',
        data: result
    });
});

router.get('/', async (_req: Request, res: Response) => {
    let result = await new UsuarioUseCase(modeluser).getUsers();
    res.json({
        stade: 200,
        messege: 'succes',
        data: result
    });
});

router.get('/:id_ususer', async (_req: Request, res: Response) => {
    let Idusuario = _req.params.id_ususer;
    let result = await new UsuarioUseCase(modeluser).getUserToId({ id: Idusuario });
    res.json({
        stade: 200,
        messege: 'succes',
        data: result
    });
});

export default router;