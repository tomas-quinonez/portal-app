package com.example.application.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.application.entities.Application;
import com.example.application.entities.CustomUser;
import com.example.application.repositories.ApplicationRepository;
import com.example.application.repositories.CustomUserRepository;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@BrowserCallable
@RolesAllowed({ "ROLE_ADMIN" })
public class ApplicationService
        extends CrudRepositoryService<Application, Long, ApplicationRepository> {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private CustomUserRepository customUserRepository;

    @PersistenceContext
    EntityManager entityManager;

    public List<Application> findAll() {
        return this.applicationRepository.findAll();
    }

    public Application findByName(String name) {
        return this.applicationRepository.findByName(name);
    }

    public Set<CustomUser> addCustomUserToApplication(String appName, String username) {
        Application application = this.applicationRepository.findByName(appName);
        CustomUser customUser = customUserRepository.findByUsername(username);

        try {
            if (application != null && customUser != null) {
                boolean result = customUser.addApp(application);
                if (result) {
                    applicationRepository.save(application);
                    customUserRepository.save(customUser);
                    return application.getCustomUsers();
                }
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    public Set<CustomUser> removeCustomUserFromApplication(String appName, String username) {
        Application application = this.applicationRepository.findByName(appName);
        CustomUser customUser = customUserRepository.findByUsername(username);

        try {
            if (application != null && customUser != null) {
                boolean result = customUser.removeApp(application);
                if (result) {
                    applicationRepository.save(application);
                    customUserRepository.save(customUser);
                    return application.getCustomUsers();
                }
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

}
