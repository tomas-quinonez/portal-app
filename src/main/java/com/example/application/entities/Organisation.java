package com.example.application.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

@Entity
public class Organisation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive(message = "Debe ingresar un número mayor a 0")
    @Max(value = 1000, message = "El código debe ser menor a 1000")
    @Column(unique = true)
    private int code;

    @NotBlank(message = "Debe completar el campo")
    @Pattern(regexp = "^[a-zñáéíóúA-ZÁÉÍÓÚÑ\s]+$", message = "El nombre debe contener solo caracteres")
    private String name;

    @NotBlank(message = "Debe completar el campo")
    private String address;

    @NotBlank(message = "Debe completar el campo")
    @Pattern(regexp = "^[0-9]*$", message = "El telefono solo puede contener dígitos")
    private String phone;

    @NotBlank(message = "Debe completar el campo")
    @Email(message = "Por favor ingrese un correo electrónico válido")
    private String email;
    
    public Organisation(
            @Positive(message = "Debe ingresar un número mayor a 0") @Max(value = 1000, message = "El código debe ser menor a 1000") int code,
            @NotBlank(message = "Debe completar el campo") @Pattern(regexp = "^[a-zñáéíóúA-ZÁÉÍÓÚÑ ]+$", message = "El nombre debe contener solo caracteres") String name,
            @NotBlank(message = "Debe completar el campo") String address,
            @NotBlank(message = "Debe completar el campo") @Pattern(regexp = "^[0-9]*$", message = "El telefono solo puede contener dígitos") String phone,
            @NotBlank(message = "Debe completar el campo") @Email(message = "Por favor ingrese un correo electrónico válido") String email) {
        this.code = code;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }

    public Organisation() {

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
    
}
