package com.ecommerce.sportscentre.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtHelper {
    public static final long JWT_TOKEN_VALIDITY = 5 *60* 60;
    private String secret = "q7Kx9V2mR8pL4sT6nY3wF1cD0hJ5uG9zA2bN6vQ8xE4rM7kP3sW1yL5tC9dH2fZ8";

    // retrive username
    public String getUserNameFromToken(String token){
        return getClaimFromToken(token, Claims::getSubject);
    }
    // retrieve expiration date
     public Date getExpirationDateFromToken(String token){
        return getClaimFromToken(token,Claims::getExpiration);
    }

    private <T> T getClaimFromToken(String token, Function<Claims,T>claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        SecretKey hmacKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),"HmacSHA256");
        return Jwts.parser()
                .verifyWith(hmacKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    // check it token expired
    private Boolean isTokenExpired(String token){
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    // generate token
    public String generateToken(UserDetails userDetails){
        Map<String,Object> claims = new HashMap<>();
        return generateToken(claims,userDetails.getUsername());
    }

    private String generateToken(Map<String, Object> claims, String subject) {
        SecretKey hmacKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),
                "HmacSHA512");
        return Jwts.builder()
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY*1000))
                .signWith(hmacKey)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = getUserNameFromToken(token);
        return (username.equals(userDetails.getUsername())&& !isTokenExpired(token));
    }
}
