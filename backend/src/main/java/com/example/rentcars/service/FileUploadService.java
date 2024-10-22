package com.example.rentcars.service;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileUploadService {

    private String uploadDir = "/path/to/absolute/uploads";

    @PostConstruct
    public void init() {
        System.out.println("upload path: " + uploadDir);
    }

    public String uploadFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalStateException("Failed to store empty file.");
        }

        Path path = Paths.get(uploadDir);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }

        String fileName = file.getOriginalFilename();
        Path filePath = path.resolve(fileName);

        if (Files.exists(filePath)) {
            throw new IllegalStateException("File already exists: " + fileName);
        }

        Files.copy(file.getInputStream(), filePath);

        return "/uploads/" + fileName;
    }
}
