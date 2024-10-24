import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  vehicles: any[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles()
  }

  async loadVehicles(): Promise<void> {
    try {
      this.vehicles = await this.vehicleService.getVehicles();
      console.log("Vehicles: ", this.vehicles)
    } catch (error) {
      console.error("Error loading vehicles: ", error);
    }
  }
}
