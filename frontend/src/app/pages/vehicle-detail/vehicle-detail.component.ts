import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit {
  vehicle: any;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get("id");
    this.loadvehicles(vehicleId);
  }

  async loadvehicles(id: String | null): Promise<void> {
   if(id) {
    try {
      this.vehicle = await this.vehicleService.getVehicleById(id);
    } catch (error) {
      console.error("Error loading vehicle")
    }
   }
  }

  rentVehicle(vehicleId: number): void {
    console.log(`Rent vehicle with ID: ${vehicleId}`)
  }
}
