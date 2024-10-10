import { NextFunction, Request, Response } from 'express';
import { BuyItemDto, CreateUserDto, UpdateUserDto, UserParams } from '../dtos/user.dto';
import UserService from '../services/user.service';
import redisClient from '../utils/redis';


export class UsersController {

  constructor(private service: UserService) {}

  public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.service.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  public async getUserById(req: Request<UserParams>, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const user = await this.service.getUserById(id);

      if (!user) res.status(404).send('User not found');
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  public async createUser(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.service.createUser(req.body);
      res.status(201).send('User created successfully');
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(req: Request<UserParams, {}, UpdateUserDto>, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { balance } = req.body;
    try {
      await this.service.updateUserBalance(id, { balance });
      res.send('User updated successfully');
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request<UserParams>, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      await this.service.deleteUser(id);
      res.send('User deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  public async buyItem(req: Request<{}, {}, BuyItemDto>, res: Response, next: NextFunction): Promise<void> {
    const { userId, itemId, price } = req.body;
    try {
      const user = await this.service.getUserById(userId);
      if (!user) {
        res.status(404).send('User not found');
        return;
      }

      if (user.balance < price) {
        res.status(400).send('Insufficient balance');
        return;
      }

      await this.service.updateUserBalance(userId, { balance: user.balance - price });
      await redisClient.set(`user:${userId}:purchase:${itemId}`, JSON.stringify({ itemId, price, date: new Date() }));

      res.send('Item purchased successfully');
    } catch (error) {
      next(error);
    }
  }

  public async getUserPurchases(req: Request<UserParams>, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const keys = await redisClient.keys(`user:${id}:purchase:*`);
      if (keys.length === 0) {
        res.status(404).send('No purchases found for this user');
        return;
      }

      const purchases = await Promise.all(keys.map((key) => redisClient.get(key)));
      const parsedPurchases = purchases.map((purchase) => purchase && JSON.parse(purchase));

      res.json(parsedPurchases);
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;