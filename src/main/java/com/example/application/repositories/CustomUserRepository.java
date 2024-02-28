package com.example.application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.application.entities.CustomUser;

public interface CustomUserRepository extends JpaRepository<CustomUser, Long>,
        JpaSpecificationExecutor<CustomUser> {

    CustomUser findByUsername(String username);
}
