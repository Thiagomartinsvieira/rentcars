import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    const loginData = {
      email: this.email,
      password: this.password
    }

    try {
      const token = await this.authService.login(loginData);
      if(token) {
        console.log("Login successful, token:", token);
        this.router.navigate(["/dashboard"])
      }
    } catch (error) {
      console.error("Login failed", error)
      alert("An error occurred")

      this.email = "";
      this.password = "";
    }
  }
}
