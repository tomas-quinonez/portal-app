package com.example.application.services;

import com.example.application.entities.Application;
import com.example.application.entities.CustomUser;
import com.example.application.entities.CustomUserDto;
import com.example.application.entities.Organisation;
import com.example.application.repositories.ApplicationRepository;
import com.example.application.repositories.CustomUserRepository;
import com.example.application.repositories.OrganisationRepository;

import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.filter.Filter;
import jakarta.annotation.security.RolesAllowed;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@BrowserCallable
@RolesAllowed({ "ROLE_ADMIN" })
public class CustomUserDtoCrudService implements CrudService<CustomUserDto, Long> {

    private final CustomUserRepository customUserRepository;
    private final OrganisationRepository organisationRepository;
    private final ApplicationRepository applicationRepository;

    public CustomUserDtoCrudService(CustomUserRepository customUserRepository,
            OrganisationRepository organisationRepository,
            ApplicationRepository applicationRepository) {
        this.customUserRepository = customUserRepository;
        this.organisationRepository = organisationRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    @Nonnull
    @RolesAllowed({ "ROLE_ADMIN" })
    public List<@Nonnull CustomUserDto> list(Pageable pageable, @Nullable Filter filter) {
        Page<CustomUser> products = customUserRepository.findAll(pageable);
        return products.stream().map(CustomUserDto::fromEntity).toList();
    }

    @Override
    public @Nullable CustomUserDto save(CustomUserDto value) {
        CustomUser customUser = value.id() != null && value.id() > 0
                ? customUserRepository.getReferenceById(value.id())
                : new CustomUser();
        customUser.setName(value.name());
        customUser.setUsername(value.username());
        //customUser.setPassword();
        customUser.setLastname(value.lastname());
        customUser.setDni(value.dni());
        customUser.setAddress(value.address());
        customUser.setPhone(value.phone());
        customUser.setEmail(value.email());
        customUser.setRole(value.role());
        customUser.setUser_type(value.user_type());
        customUser.setEnabled(true);
        customUser.setOrganisation(null);

        Optional<Organisation> org = this.organisationRepository.findByName(value.orgName());
        if (org.isPresent()) {
            customUser.setOrganisation(org.get());
        }

        // Si el usuario tiene rol admin, asignar todas las apps
        if (value.role().name().equalsIgnoreCase("admin")) {
            List<Application> applications = this.applicationRepository.findAll();
            customUser.setApplications(new HashSet<>(applications));
        }

        return CustomUserDto.fromEntity(customUserRepository.save(customUser));
    }

    @Override
    public void delete(Long id) {
        customUserRepository.deleteById(id);
    }
}
