import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor() { }

  async register(userData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, userData)
      return response.data;
    } catch (error) {
      console.log("Error registering user", error);
      throw error;
    }
  }

  async login(loginData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/users/login`, loginData);
      // console.log("Backend response:", response.data);
      const token = response.data?.token;
      if (token) {
        this.setToken(token);
        // console.log("Login successful, token:", token);
      }
      return token;
    } catch (error) {
      console.error('Error during login', error);
      throw error;
    }
  }


  private setToken(token: string): void {
    localStorage.setItem("authToken", token)
  }

  getToken(): string | null {
    return localStorage.getItem('authToken')
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token
  }

  logout(): void {
    localStorage.removeItem("authToken")
  }


}
