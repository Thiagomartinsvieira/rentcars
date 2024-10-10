import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fullName: String = "";
  email: String = "";
  password: String = "";
  confirmPassword: String = "";
  passwordMismatch: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}



  async register() {

    if(this.password !== this.confirmPassword){
      this.passwordMismatch = true;
      return;
    }

    const registerData  = {
      fullName: this.fullName,
      email: this.email,
      password: this.password
    }



    try {
      const response = await this.authService.register(registerData);
      console.log("Registration successful", response)
      this.router.navigate(["/dashboard"])

    } catch (error) {
      console.error("Login failed", error)
      alert("Registration failed. Please try again")

      this.fullName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    }
  }

}
