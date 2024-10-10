import { Router } from 'express';
import ItemController from './controllers/item.controller';
import UserController from './controllers/user.controller';
import SkinportService from './services/skinport.service';
import UserService from './services/user.service';
import { AppDataSource } from './utils/db';


const router = Router();

const itemsController = new ItemController(new SkinportService());
const usersController = new UserController(new UserService(AppDataSource));

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.get('/items', itemsController.fetchItems.bind(itemsController));

router.get('/users', usersController.getAllUsers.bind(usersController));
router.get('/users/:id', usersController.getUserById.bind(usersController));
router.post('/users', usersController.createUser.bind(usersController));
router.put('/users/:id', usersController.updateUser.bind(usersController));
router.delete('/users/:id', usersController.deleteUser.bind(usersController));

router.get('/users/:id/purchases', usersController.getUserPurchases.bind(usersController));
router.post('/buy', usersController.buyItem.bind(usersController));

export default router;