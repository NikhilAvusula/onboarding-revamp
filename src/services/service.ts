import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { APP_CONFIG } from "@/src/config/appConfig";

class ApiService {
  private fetcher: any;
  private api_base_url: string;

  constructor() {
    this.api_base_url = APP_CONFIG.API_BASE_URL;
    this.fetcher = axios.create();
    
    // Add interceptor to handle object payload
    this.fetcher.interceptors.request.use((req: any) => {
      if (!(req.data instanceof FormData)) {
        if (!req.headers || !req.headers["Content-Type"]) {
          req.headers = req.headers || {};
          req.headers["Content-Type"] = "application/json";
        }
      }
      req.headers["X-Requested-With"] = "XMLHttpRequest";
      return req;
    });
  }

  getMerchantsList = () => {
    return this.fetcher.get(`${this.api_base_url}get_merchants_data`);
  };

  getStats = () => {
    return this.fetcher.get(`${this.api_base_url}get_stats_data`);
  };
}

export default ApiService;