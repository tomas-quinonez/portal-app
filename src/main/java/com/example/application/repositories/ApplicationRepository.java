package com.example.application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.application.entities.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long>,
        JpaSpecificationExecutor<Application> {
}
