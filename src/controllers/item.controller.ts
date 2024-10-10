import { NextFunction, Request, Response } from 'express';
import { IFetchableServiceInterface } from '../interfaces';
import { ItemModel } from '../models/item.model';
import redisClient from '../utils/redis';


class ItemController {
  constructor(private service: IFetchableServiceInterface<ItemModel>) {}

  public async fetchItems(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cachedItems = await redisClient.get('items');
      if (cachedItems) {
        res.json(JSON.parse(cachedItems));
        return;
      }

      const items = await this.service.fetchItems();
      const result = items
        .filter(({ min_price }) => Boolean(min_price))
        .map(({ market_hash_name, min_price, suggested_price }) => ({ market_hash_name, min_price, suggested_price }));

      await redisClient.set('items', JSON.stringify(result), { EX: 3600 });

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default ItemController;