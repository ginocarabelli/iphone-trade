package com.iphonetrade.jwt.service;

import com.iphonetrade.jwt.dto.UserResponse;
import com.iphonetrade.jwt.model.User;
import com.iphonetrade.jwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setBusinessAddress(user.getBusinessAddress());
        response.setCity(user.getCity());
        response.setCreationDate(user.getCreationDate());
        response.setRole(user.getRole());

        return response;
    }

    public User getUserModelById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return user;
    }
}
