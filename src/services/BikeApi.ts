import { AxiosResponse } from 'axios';
import apiAxiosInstance from '@/services/ApiAxiosInstance';
import Bike, { BikeResponse } from '@/interface/Bike';

const urlArgument = 'bikes';
const setupUrl = (...args: Array<string|number>) => {
  return `/${urlArgument}/${args.reduce((previous, next) => `${previous}/${next}/`, '')}`;
};

export const postBike = async (data: unknown = {}) => {
  try {
    const request: AxiosResponse<Bike> = await apiAxiosInstance.post(setupUrl(), data);
    return request.data;
  } catch (e) {
    console.error(e);
  }
};

export const getBike = async (id: number) => {
  try {
    const request: AxiosResponse<Bike> = await apiAxiosInstance.get(setupUrl(id));
    return request.data;
  } catch (e) {
    console.error(e);
  }
};

export const getAllBike = async () => {
  try {
    const { data }: AxiosResponse<BikeResponse> = await apiAxiosInstance.get(setupUrl());
    return data.bikes;
  } catch (e) {
    console.error(e);
  }
};

export const putBike = async (id: string, data: unknown) => {
  try {
    await apiAxiosInstance.put(setupUrl(id), data);
  } catch (e) {
    console.error(e);
  }
};

export const deleteBike = async (id: string) => {
  try {
    await apiAxiosInstance.delete(setupUrl(id));
  } catch (e) {
    console.error(e);
  }
};
