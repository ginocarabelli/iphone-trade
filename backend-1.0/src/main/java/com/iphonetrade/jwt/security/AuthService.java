package com.iphonetrade.jwt.security;

import com.iphonetrade.jwt.dto.AuthResponse;
import com.iphonetrade.jwt.dto.LoginRequest;
import com.iphonetrade.jwt.dto.RegisterRequest;
import com.iphonetrade.jwt.model.Role;
import com.iphonetrade.jwt.model.User;
import com.iphonetrade.jwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(request.getRole())
                .phoneNumber(request.getPhoneNumber())
                .businessAddress(request.getBusinessAddress())
                .city(request.getCity())
                .creationDate(LocalDate.now())
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole());

        return new AuthResponse(jwtToken);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        var jwtToken = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole());

        return new AuthResponse(jwtToken);
    }
}

