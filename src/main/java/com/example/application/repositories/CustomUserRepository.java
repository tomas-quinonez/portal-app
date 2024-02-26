package com.example.application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.application.entities.CustomUser;

public interface CustomUserRepository extends JpaRepository<CustomUser, Long> {

    CustomUser findByUsername(String username);
}
