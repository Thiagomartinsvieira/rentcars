import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string | null = null;
  firstName: string | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    console.log("Usuário innn Dashboard:", user);

    if (user && user.fullName) {
      this.userName = user.fullName;
      this.firstName = this.userName?.split(" ")[0];
    }
  }
}
