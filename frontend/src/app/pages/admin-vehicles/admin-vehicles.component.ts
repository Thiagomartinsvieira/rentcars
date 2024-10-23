import { Component, OnInit, model } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-vehicles.component.html',
  styleUrl: './admin-vehicles.component.scss'
})
export class AdminVehiclesComponent implements OnInit {
  vehicles: any[] = []; 
  newVehicle = {brand: "", model: "", color: "", category: "",  pricePerDay: "", imageUrl: "", available: false};
  editingVehicleId: number | null = null;

  constructor(private vehicleService: VehicleService) {}
  ngOnInit(): void {
    this.loadVehicles();
  }

  async loadVehicles() {
    try {
      this.vehicles = await this.vehicleService.getVehicles();
      console.log("Vehicles: ", this.vehicles);
    } catch (error) {
      console.log("Error to load vehicles", error)
    }
  }

  async addVehicle() {
    try {
      if (this.editingVehicleId) {
        await this.vehicleService.updateVehicle(this.editingVehicleId, this.newVehicle);
        this.editingVehicleId = null;
      } else {
        await this.vehicleService.registerVehicle(this.newVehicle);
      } 
      this.loadVehicles();
      this.newVehicle =  {brand: "", model: "", color: "", category: "",  pricePerDay: "", imageUrl: "", available: false};

    } catch (error) {
      console.log("Error to add new or edit vehicle")
    }
  }

  editVehicle(id: number) {
    const vehicle = this.vehicles.find(v => v.id === id);
    if(vehicle) {
      this.editingVehicleId = id;
      this.newVehicle = {...vehicle}
    }
  }

  async deleteVehicle(id: number) {
    try {
      await this.vehicleService.deleteVehicle(id);
      this.loadVehicles();
    } catch (error) {
      console.log("Error to delete vehicle", error)
    }
  }

}
