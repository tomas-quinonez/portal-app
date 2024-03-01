package com.example.application.entities;

import com.example.application.entities.CustomUser.UserType;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import com.example.application.entities.CustomUser.Role;

public record CustomUserDto(
        Long id,
        @NotBlank(message = "Debe completar el campo") @Pattern(regexp = "^[a-zñáéíóúA-ZÁÉÍÓÚÑ\s]+$", message = "El nombre debe contener solo caracteres") String name,
        @Column(unique = true) @NotBlank(message = "Debe completar el campo") String username,
        //@NotBlank(message = "Debe completar el campo") @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,20}$", message = "La contraseña debe contener entre 8 y 20 caracteres, al menos 1 dígito, 1 letra en minúscula, 1 letra en mayúscula y no debe contener espacios") 
        String password,
        @NotBlank(message = "Debe completar el campo") @Pattern(regexp = "^[a-zñáéíóúA-ZÁÉÍÓÚÑ\s]+$", message = "El apellido debe contener solo caracteres") String lastname,
        @NotBlank(message = "Debe completar el campo") @Pattern(regexp = "^[0-9]*$", message = "El DNI solo puede contener dígitos") String dni,
        String address,
        @NotBlank(message = "Debe completar el campo") @Pattern(regexp = "^[0-9]*$", message = "El telefono solo puede contener dígitos") String phone,
        @NotBlank(message = "Debe completar el campo") @Email(message = "Por favor ingrese un correo electrónico válido") String email,
        Role role,
        UserType user_type,
        String orgName,
        Organisation organisation) {

    public static CustomUserDto fromEntity(CustomUser customUser) {
        return new CustomUserDto(customUser.getId(), customUser.getName(),
                customUser.getUsername(), customUser.getPassword(), customUser.getLastname(), customUser.getDni(),
                customUser.getAddress(),
                customUser.getPhone(), customUser.getEmail(), customUser.getRole(), customUser.getUser_type(),
                customUser.getOrganisation() != null ? customUser.getOrganisation().getName() : "",
                customUser.getOrganisation() != null ? customUser.getOrganisation() : null);
    }
}
