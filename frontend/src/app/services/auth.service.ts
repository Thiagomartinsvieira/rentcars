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
      const response = await axios.post(`${this.apiUrl}/users/register`, userData)
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
      const user = response.data?.user

      if (token && user) {
        this.setToken(token);
        this.setUser(user);

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

  private setUser(user: any): void {
    console.log('Salvando usuário no localStorage:', user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem("user");
    console.log("Recuperando usuário do localStorage:", user); 
    return user ? JSON.parse(user) : null;
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
    localStorage.removeItem("user")
  }
}
