import axios, { AxiosResponse } from 'axios';
import Bike, { BikeResponse } from '@/interface/Bike';

const baseUrl = 'https://628e3492a339dfef87a9a999.mockapi.io/bikes/';

class BikeApi {
  post = async (data: unknown = {}) => {
    try {
      const request: AxiosResponse<Bike> = await axios.post(baseUrl, data);
      return request.data;
    } catch (e) {
      console.error(e);
    }
  };

  get = async (id: number) => {
    try {
      const request: AxiosResponse<Bike> = await axios.get(`baseUrl}${id}/`);
      return request.data;
    } catch (e) {
      console.error(e);
    }
  };
  
  getAll = async () => {
    try {
      const { data }: AxiosResponse<BikeResponse> = await axios.get(baseUrl);
      return data.bikes;
    } catch (e) {
      console.error(e);
    }
  };

  put = async (id: string, data: unknown) => {
    try {
      await axios.put(`${baseUrl}${id}/`, data);
    } catch (e) {
      console.error(e);
    }
  };

  delete = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}${id}/`);
    } catch (e) {
      console.error(e);
    }
  };
}

export default new BikeApi();
