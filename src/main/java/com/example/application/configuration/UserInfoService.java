package com.example.application.configuration;

import jakarta.annotation.Nonnull;
import jakarta.annotation.security.PermitAll;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import dev.hilla.BrowserCallable;

/**
 * Provides information about the current user.
 */
// tag::snippet[]
@BrowserCallable
public class UserInfoService {

    @PermitAll
    @Nonnull
    public UserInfo getUserInfo() {
        Authentication auth = SecurityContextHolder.getContext()
                .getAuthentication();

        final List<String> authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        System.out.println(authorities.toString());
        return new UserInfo(auth.getName(), authorities);
    }

}
// end::snippet[]
