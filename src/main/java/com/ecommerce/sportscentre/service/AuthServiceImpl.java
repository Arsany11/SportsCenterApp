package com.ecommerce.sportscentre.service;

import com.ecommerce.sportscentre.dto.RegisterDto;
import com.ecommerce.sportscentre.entity.User;
import com.ecommerce.sportscentre.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void register(RegisterDto registerDto) {

        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new RuntimeException("Username already exist");
        }

        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new RuntimeException("Email already exist");
        }

        String passwordHash = passwordEncoder.encode(registerDto.getPassword());
        User user = new User(
                registerDto.getUsername(),
                registerDto.getEmail(),
                passwordHash
        );
        userRepository.save(user);

    }
}
