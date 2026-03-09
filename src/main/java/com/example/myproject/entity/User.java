package com.example.myproject.entity;

import jakarta.persistence.*;
import org.jspecify.annotations.Nullable;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @Column(unique = true, nullable= false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;



    public void setName(String name) {
        this.username= name;
    }

    public void setEmail(String email) {
        this.email= email;
    }

    public void setPassword(String password) {
        this.password= password;
    }

    public void setRole(Role user) {
        this.role= user;
    }

    public String getEmail() {
        return email;
    }

    public @Nullable String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }
}
