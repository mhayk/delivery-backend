import { Router } from 'express';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { FindAllWithoutEndDateController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDelivaryman';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController';
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const deliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllWithoutEndDateController()
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController()

routes.post("/client/", createClientController.handle);

routes.post('/client/authenticate', authenticateClientController.handle);
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle);

routes.post('/deliveryman', createDeliverymanController.handle);

routes.post('/delivery', ensureAuthenticateClient, deliveryController.handle);

routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle);

routes.put('/delivery/updateDeliveryman/:id', ensureAuthenticateDeliveryman, updateDeliverymanController.handler);

routes.get('/client/deliveries', ensureAuthenticateClient, findAllDeliveriesController.handle);

export { routes };