package com.example.application.services;

import com.example.application.entities.Application;
import com.example.application.repositories.ApplicationRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

@BrowserCallable
@AnonymousAllowed
public class ApplicationService
       extends CrudRepositoryService<Application, Long, ApplicationRepository> {
}
