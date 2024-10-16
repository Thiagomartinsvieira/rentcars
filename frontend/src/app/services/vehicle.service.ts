import axios from 'axios';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})

export class VehicleService {
  private apiUrl = environment.apiUrl;

  constructor() {
    console.log("API URL: ", environment.apiUrl);
  }

  async getVehicles(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/vehicles`);
      return response.data;
    } catch (error) {
      console.log("Error fetching vehicles", error)
      throw error;
    }
  }

}


const service = new VehicleService();
