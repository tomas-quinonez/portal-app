package com.example.application.services;

import com.example.application.entities.Organisation;
import com.example.application.repositories.OrganisationRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

@BrowserCallable
@AnonymousAllowed
public class OrganisationService
       extends CrudRepositoryService<Organisation, Long, OrganisationRepository> {
}
