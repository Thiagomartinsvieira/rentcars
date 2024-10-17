import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  name: string = "";
  email: string = "";
  message: string = "";

  constructor() {}

  submitForm() {
    if(this.name && this.email && this.message) {
      const userMessage = {
        name: this.name,
        email: this.email,
        message: this.message,
      }

      console.log("Form data:", userMessage);

      alert("Your Question has been sent successfully! We Will contact you shortly");

      this.name = "";
      this.email = "";
      this.message = "";
    } else {
      alert("Please, fill in all the fields of the form")
    }
  }
}
