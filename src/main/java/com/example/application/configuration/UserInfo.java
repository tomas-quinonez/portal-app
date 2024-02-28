package com.example.application.configuration;

import java.util.Collection;
import java.util.Collections;

import dev.hilla.Nonnull;

/**
 * User information used in client-side authentication and authorization.
 * To be saved in browsers’ LocalStorage for offline support.
 */
// tag::snippet[]
public class UserInfo {

    @Nonnull
    private String name;
    @Nonnull
    private Collection<@Nonnull String> authorities;

    public UserInfo(String name, Collection<String> authorities) {
        this.name = name;
        this.authorities = Collections.unmodifiableCollection(authorities);
    }

    public String getName() {
        return name;
    }

    public Collection<String> getAuthorities() {
        return authorities;
    }

}
// end::snippet[]
