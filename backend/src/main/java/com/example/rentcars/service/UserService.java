package com.example.rentcars.service;

import com.example.rentcars.dto.LoginRequest;
import com.example.rentcars.model.User;
import com.example.rentcars.repository.UserRepository;
import com.example.rentcars.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            throw new RuntimeException("User already exists");
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User registeredUser = userRepository.save(user);
            return jwtUtil.generateToken(user.getEmail());
        }
    }

    public Optional<User> authenticate(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return Optional.of(user);
        }

        return Optional.empty();
    }

    public String generateToken(User user) {
        return jwtUtil.generateToken(user.getEmail());
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
