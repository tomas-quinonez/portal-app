package com.example.application.services;

import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.application.entities.Application;
import com.example.application.entities.CustomUser;
import com.example.application.repositories.CustomUserRepository;
import com.vaadin.flow.server.VaadinRequest;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;

@BrowserCallable
@RolesAllowed({ "ROLE_ADMIN" })
public class CustomUserService
        extends CrudRepositoryService<CustomUser, Long, CustomUserRepository> {

    @Autowired
    private CustomUserRepository customUserRepository;

    public List<CustomUser> findAll() {
        return this.customUserRepository.findAll();
    }

    @PermitAll
    public Set<Application> getAppsByUsername() {
        String username = VaadinRequest.getCurrent().getUserPrincipal().getName();
        CustomUser customUser = this.customUserRepository.findByUsername(username);
        return customUser.getApplications();
    }

    public boolean setPasswordById(String username, String password) {
        CustomUser customUser = this.customUserRepository.findByUsername(username);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        customUser.setPassword(encoder.encode(password));
        this.customUserRepository.save(customUser);
        return true;

    }
}
