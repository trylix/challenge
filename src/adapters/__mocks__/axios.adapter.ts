import axios from 'axios';

export class AxiosAdapter {
  public async httpGet(url: string) {
    return axios.get(url, {
      validateStatus: () => true,
    });
  }
}
