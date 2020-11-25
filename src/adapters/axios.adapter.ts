import axios, { AxiosInstance } from 'axios';

export abstract class AxiosAdapter {
  private readonly httpService: AxiosInstance;

  public constructor(baseURL: string) {
    this.httpService = axios.create({
      baseURL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus: () => true,
    });
  }

  public async httpGet(url: string) {
    return this.httpService.get(url);
  }
}
