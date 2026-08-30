package com.ecommerce.sportscentre.controller;

import com.ecommerce.sportscentre.model.JwtRequest;
import com.ecommerce.sportscentre.model.JwtResponse;
import com.ecommerce.sportscentre.security.JwtHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager manager;
    private final UserDetailsService userDetailsService;
    private final JwtHelper jwtHelper;

    public AuthController(AuthenticationManager manager, UserDetailsService userDetailsService, JwtHelper jwtHelper) {
        this.manager = manager;
        this.userDetailsService = userDetailsService;
        this.jwtHelper = jwtHelper;
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

    private void authenticated(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,password);
        try {
            manager.authenticate(authenticationToken);
        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
