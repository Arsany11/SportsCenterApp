package com.ecommerce.sportscentre.controller;

import com.ecommerce.sportscentre.dto.RegisterDto;
import com.ecommerce.sportscentre.dto.UserInfoDto;
import com.ecommerce.sportscentre.entity.User;
import com.ecommerce.sportscentre.model.JwtRequest;
import com.ecommerce.sportscentre.model.JwtResponse;
import com.ecommerce.sportscentre.repository.UserRepository;
import com.ecommerce.sportscentre.security.JwtHelper;
import com.ecommerce.sportscentre.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager manager;
    private final UserDetailsService userDetailsService;
    private final JwtHelper jwtHelper;
    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager manager, UserDetailsService userDetailsService, JwtHelper jwtHelper, AuthService authService, UserRepository userRepository) {
        this.manager = manager;
        this.userDetailsService = userDetailsService;
        this.jwtHelper = jwtHelper;
        this.authService = authService;
        this.userRepository = userRepository;
    }
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request){
        this.authenticated(request.getUsername(),request.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtHelper.generateToken(userDetails);
        JwtResponse response = JwtResponse.builder()
                .username(request.getUsername())
                .token(token)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(
            @Valid @RequestBody RegisterDto registerDto ){
        authService.register(registerDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/user")
    public ResponseEntity<UserInfoDto> getUserDetails(@RequestHeader("Authorization") String tokenHeader){
        String token = extractTokenFromHeader(tokenHeader);
        if(token != null){
            String username = jwtHelper.getUserNameFromToken(token);

            User user = userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));

            UserInfoDto userInfo = new UserInfoDto(
                    user.getUsername(),
                    user.getEmail()
            );
            return ResponseEntity.ok(userInfo);
        }else {
            return ResponseEntity.badRequest().build();
        }
    }
    private String extractTokenFromHeader(String tokenHeader){
       if(tokenHeader != null && tokenHeader.startsWith("Bearer ")){
           return tokenHeader.substring(7); // remove "Bearer " prefix
       }return null;
    }

    private void authenticated(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,password);
        try {
            manager.authenticate(authenticationToken);
        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
