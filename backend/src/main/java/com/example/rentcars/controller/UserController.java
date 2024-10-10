package com.example.rentcars.controller;

import com.example.rentcars.dto.LoginRequest;
import com.example.rentcars.model.User;
import com.example.rentcars.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String token = userService.registerUser(user);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<String> token = userService.authenticate(loginRequest);

        if (token.isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("token", token.get());
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}