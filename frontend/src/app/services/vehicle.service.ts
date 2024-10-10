import axios from 'axios';
import { environment } from '../../environments/environment';

export class ApiService {
  constructor() {
    console.log("API URL: ", environment.apiUrl);
  }

  getData() {
    return axios.get(`${environment.apiUrl}/api`)
      .then(response => {
        console.log("Data fetched:", response.data);
        return response.data;
      })
      .catch(error => console.error("Error fetching data: ", error));
  }
}

const service = new ApiService();
service.getData();
