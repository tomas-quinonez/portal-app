package com.example.application.entities;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity(name = "CUSTOM_USER")
public class CustomUser {

    public enum UserType {
        INTERNO, EXTERNO
    };

    public enum Role {
        user, admin
    };

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @NotBlank(message = "Debe completar el campo")
    @Pattern(regexp = "^[a-zñáéíóúA-ZÁÉÍÓÚÑ\s]+$", message = "El nombre debe contener solo caracteres")
    private String name;

    @Column(unique = true)
    @NotBlank(message = "Debe completar el campo")
    private String username;

    @NotBlank(message = "Debe completar el campo")
    @Pattern(regexp = "^[a-zñáéíóúA-ZÁÉÍÓÚÑ\s]+$", message = "El nombre debe contener solo caracteres")
    private String lastname;

    @NotBlank(message = "Debe completar el campo")
    @Pattern(regexp = "^[0-9]*$", message = "El DNI solo puede contener dígitos")
    private String dni;

    private String address;

    @NotBlank(message = "Debe completar el campo")
    @Pattern(regexp = "^[0-9]*$", message = "El telefono solo puede contener dígitos")
    private String phone;

    @NotBlank(message = "Debe completar el campo")
    @Email(message = "Por favor ingrese un correo electrónico válido")
    private String email;

    @Enumerated(EnumType.STRING)
    private UserType user_type;

    @ManyToOne
    @JoinColumn(name = "organisation", referencedColumnName = "id")
    private Organisation organisation;

    //@NotBlank(message = "Debe completar el campo")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean enabled;

    @JsonIgnore
    @ManyToMany(cascade = { CascadeType.PERSIST }, fetch = FetchType.EAGER)
    @JoinTable(name = "has_app", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "app_id"))
    private Set<Application> applications = new HashSet<Application>();

    public CustomUser(String name, String username, String lastname, String dni, String address, String phone,
            String email, UserType user_type, Organisation organisation, @Nullable String password, Role role, boolean enabled) {
        this.name = name;
        this.username = username;
        this.lastname = lastname;
        this.dni = dni;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.user_type = user_type;
        this.organisation = organisation;
        this.password = password;
        this.role = role;
        this.enabled = enabled;
        this.applications = new HashSet<Application>();
    }

    public CustomUser() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Organisation getOrganisation() {
        return organisation;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    public UserType getUser_type() {
        return user_type;
    }

    public void setUser_type(UserType user_type) {
        this.user_type = user_type;
    }

    public Set<Application> getApplications() {
        return applications;
    }

    public void setApplications(Set<Application> applications) {
        this.applications = applications;
    }

    public boolean addApp(Application application) {
        return application.getCustomUsers().add(this) && this.applications.add(application);
    }

    public boolean removeApp(Application application) {
        return application.getCustomUsers().remove(this) && this.applications.remove(application);
    }
}
