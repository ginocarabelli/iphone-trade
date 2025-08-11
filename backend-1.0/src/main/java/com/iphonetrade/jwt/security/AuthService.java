package com.iphonetrade.jwt.security;

import com.iphonetrade.jwt.dto.AuthResponse;
import com.iphonetrade.jwt.dto.LoginRequest;
import com.iphonetrade.jwt.dto.RegisterRequest;
import com.iphonetrade.jwt.model.Role;
import com.iphonetrade.jwt.model.User;
import com.iphonetrade.jwt.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Value("${jwt.secret}")
    private String secretKey;

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
                .role(Role.ADMIN)
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

    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey.getBytes())
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenExpired(Claims claims) {
        Date expiration = claims.getExpiration();
        return expiration.before(new Date());
    }
}

