package com.example.application.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.application.entities.Organisation;


public interface OrganisationRepository extends JpaRepository<Organisation, Long>,
        JpaSpecificationExecutor<Organisation> {

    public Optional<Organisation> findByName(String name);
}
