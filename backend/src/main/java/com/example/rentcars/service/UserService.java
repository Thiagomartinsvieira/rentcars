package com.example.rentcars.service;

import com.example.rentcars.dto.LoginRequest;
import com.example.rentcars.model.User;
import com.example.rentcars.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null ) {
            throw new RuntimeException("User already exists");
        } else  {

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        }
    }

    public Optional<User> authenticate(LoginRequest loginRequest) {

        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(loginRequest.getEmail()));

        if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            return user;
        }

        return Optional.empty();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
