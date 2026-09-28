package com.ecommerce.sportscentre.entity;

import jakarta.persistence.*;

@Entity
@Table(name ="Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "UserName", nullable = false,unique = true)
    private String username;
    @Column(name = "Email" ,nullable = false ,unique = true)
    private String email;
    @Column(name = "PasswordHash" ,nullable = false)
    private String passwordHash;

    public User(){
    }

    public User(String username, String email, String passwordHash) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }
    public int getId(){
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setUserName(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

}
