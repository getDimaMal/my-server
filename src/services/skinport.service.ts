import { SKINPORT_CONFIG } from '../config';
import { IFetchableServiceInterface } from '../interfaces';
import { ItemModel } from '../models/item.model';
import HttpClient from '../utils/httpClient';


class SkinportService extends HttpClient implements IFetchableServiceInterface<ItemModel> {
  constructor() {
    super(SKINPORT_CONFIG.API_URL);
  }

  public async fetchItems() {
    const response = await this.get<ItemModel[]>('/', {
      params: {
        app_id: SKINPORT_CONFIG.APP_ID,
        currency: SKINPORT_CONFIG.CURRENCY,
      },
    });
    return response.data;
  }
}

export default SkinportService;