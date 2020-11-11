import { Router } from 'express';
import multer from 'multer';

import UsersController from './controllers/UsersController';
import OrphanagesController from './controllers/OrphanagesController';
import AcceptedOrphanagesController from './controllers/AcceptedOrphanagesController';
import SessionsController from './controllers/SessionController';
import SendForgotPasswordEmailController from './controllers/SendForgotPasswordEmailController';
import ResetPasswordController from './controllers/ResetPasswordController';
import ApproveOrphanageController from './controllers/ApproveOrphanageController';

import ensureAuthenticated from './middlewares/ensureAuthenticated';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

//routes.get('/users', UsersController.index);
//routes.get('/users', ensureAuthenticated, UsersController.show);
routes.post('/users', UsersController.create);

routes.get('/orphanages/accepted', AcceptedOrphanagesController.index);
routes.get('/orphanages/accepted/:id', AcceptedOrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

routes.get('/orphanages', ensureAuthenticated, OrphanagesController.index);
routes.get('/orphanages/:id', ensureAuthenticated, OrphanagesController.show);
routes.put('/orphanages/:id', ensureAuthenticated, upload.array('images'), OrphanagesController.update);
routes.delete('/orphanages/:id', ensureAuthenticated, OrphanagesController.delete);
routes.patch('/orphanages/:id', ensureAuthenticated, ApproveOrphanageController.update);

routes.post('/sessions', SessionsController.create);

routes.post('/password/forgot', SendForgotPasswordEmailController.create);
routes.post('/password/reset', ResetPasswordController.create);

export default routes;