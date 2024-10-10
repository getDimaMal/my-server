import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }
}

export default HttpClient;