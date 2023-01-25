import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000';
  constructor() {
    axios.defaults.baseURL = this.baseUrl;
  }
  public get(url: string, options?: any) {
    return axios.get(url, options);
  }
  public post(url: string, data: any, options?: any) {
    return axios.post(url, data, options);
  }
  public put(url: string, data: any, options?: any) {
    return axios.put(url, data, options);
  }
  public patch(url: string, data: any, options?: any) {
    return axios.patch(url, data, options);
  }
  public delete(url: string, options?: any) {
    return axios.delete(url, options);
  }
}
