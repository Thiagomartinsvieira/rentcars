import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginOptionsComponent } from './pages/login-options/login-options.component';
import { AuthGuard } from './core/guards/auth.guard';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { RentalsComponent } from './pages/rentals/rentals.component';
import { AdminVehiclesComponent } from './pages/admin-vehicles/admin-vehicles.component';
import { VehicleDetailComponent } from './pages/vehicle-detail/vehicle-detail.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "vehicles", component: VehiclesComponent},
  {path: "rentals", component: RentalsComponent, canActivate: [AuthGuard]},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "admin/vehicles", component: AdminVehiclesComponent, canActivate: [AuthGuard]},
  {path: "login-options", component: LoginOptionsComponent},
  {path: "vehicles/:id", component: VehicleDetailComponent},
  {path: "**", redirectTo: "", pathMatch: "full"}
];
