import axios, { AxiosInstance } from 'axios';
import { APP_CONFIG } from "@/src/config/appConfig";

class ApiService {
  private fetcher: AxiosInstance;
  private api_base_url: string;

  constructor() {
    this.api_base_url = APP_CONFIG.API_BASE_URL;
    this.fetcher = axios.create();
  }

  getMerchantsList = (payload?: string) => {
    return this.fetcher.get(`${this.api_base_url}/merchants`,payload ? { params: { status: payload } } : {});
  };

  getStats = (payload?: string) => {
    return this.fetcher.get(`${this.api_base_url}/stats`, payload ? { params: { filter: payload } } : {});
  };
}

export default ApiService;