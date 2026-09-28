package com.ecommerce.sportscentre.dto;

public class UserInfoDto {
    private String username;
    private String email;

    public UserInfoDto(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }


    public String getUsername() {
        return username;
    }
}
