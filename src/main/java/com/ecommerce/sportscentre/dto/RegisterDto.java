package com.ecommerce.sportscentre.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterDto {
    @NotBlank
    @Size(min = 3, max = 100)
    private String username;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Size(min = 6, max = 100)
    private String password;
    public RegisterDto(){}

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
