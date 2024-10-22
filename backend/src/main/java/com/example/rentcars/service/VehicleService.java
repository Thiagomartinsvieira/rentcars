package com.example.rentcars.service;

import com.example.rentcars.model.Vehicle;
import com.example.rentcars.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> findById(Long id) {
        return vehicleRepository.findById(id);
    }

    public Vehicle save(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
        Optional<Vehicle> existingVehicle = vehicleRepository.findById(id);

        if (existingVehicle.isPresent()) {
            Vehicle vehicle = existingVehicle.get();
            vehicle.setBrand(updatedVehicle.getBrand());
            vehicle.setModel(updatedVehicle.getModel());
            vehicle.setColor(updatedVehicle.getColor());
            vehicle.setPricePerDay(updatedVehicle.getPricePerDay());
            vehicle.setCategory(updatedVehicle.getCategory());
            vehicle.setAvailable(updatedVehicle.isAvailable());
            vehicle.setImageUrl(updatedVehicle.getImageUrl());
            return vehicleRepository.save(vehicle);
        } else {
            return null;
        }
    }

    public void deleteById(Long id) {
        vehicleRepository.deleteById(id);
    }
}
