package com.iphonetrade.jwt.security;

import com.iphonetrade.jwt.model.Role;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    // Clave secreta (en producción debe estar en variables de entorno)
    private static final String SECRET_KEY = "TuClaveMuyLargaParaFirmarJWT1234567890!";

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    private final long jwtExpirationMs = 1000 * 60 * 60 * 24; // 24 horas
    public String generateToken(Long id, String email, Role role) {
        return Jwts.builder()
                .setId(id.toString())
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }


    public boolean isTokenValid(String token, String email) {
        final String username = extractUsername(token);
        return (username.equals(email) && !isTokenExpired(token));
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
