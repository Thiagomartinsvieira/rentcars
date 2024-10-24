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


  async registerVehicle(vehicleData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/vehicles`, vehicleData)
      return response.data;
    } catch (error) {
      console.log("Error registering vehicle", error);
      throw error;
    } 
  }

  async updateVehicle(id: number, vehicleData: any): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}/vehicles/${id}`, vehicleData)
      return response.data;
    } catch (error) {
      console.log("Error updating vehicle", error)
      throw error;
    }
  }

  async deleteVehicle(id: number): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/vehicles/${id}`);
      return response.data;
    } catch (error) {
      console.log("Error delete vehicle")
      throw error;
    }
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

  async getVehicleById(id: String): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/vehicles/${id}`)
      return response.data;
    } catch (error) {
      console.log("Error fetching vehicle by ID", error)
      throw error;
    }
  } 
}
