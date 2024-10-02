package com.example.rentcars.service;

import com.example.rentcars.model.Vehicle;
import com.example.rentcars.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    public Vehicle save(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }
}
