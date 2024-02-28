package com.example.application.entities;

import java.util.HashSet;
import java.util.Set;

import dev.hilla.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

@Entity(name = "APPLICATION")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive(message = "Debe ingresar un número mayor a 0")
    @Max(value = 1000, message = "El código debe ser menor a 1000")
    private int code;

    @NotNull
    @NotBlank(message = "Debe completar el campo")
    @Pattern(regexp = "^[a-zñáéíóúA-ZÁÉÍÓÚÑ\s]+$", message = "El nombre debe contener solo caracteres")
    private String name;

    @ManyToMany(mappedBy = "applications", fetch = FetchType.LAZY)
    private Set<CustomUser> customUsers = new HashSet<CustomUser>();;

    public Application(int code, @NotNull String name, @Nullable Set<CustomUser> customUsers) {
        this.code = code;
        this.name = name;
        if (customUsers != null) {
            this.customUsers = customUsers;
        } else {
            this.customUsers = new HashSet<CustomUser>();
        }

    }

    public Application() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<CustomUser> getCustomUsers() {
        return customUsers;
    }

    public void setCustomUsers(Set<CustomUser> customUsers) {
        this.customUsers = customUsers;
    }
}
