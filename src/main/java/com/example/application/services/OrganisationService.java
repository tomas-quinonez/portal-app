package com.example.application.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.application.entities.Organisation;
import com.example.application.repositories.OrganisationRepository;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;
import jakarta.annotation.security.RolesAllowed;

@BrowserCallable
@RolesAllowed({ "ROLE_ADMIN" })
public class OrganisationService
        extends CrudRepositoryService<Organisation, Long, OrganisationRepository> {

    @Autowired
    private OrganisationRepository organisationRepository;

    public List<Organisation> findAll() {
        return this.organisationRepository.findAll();
    }
}
