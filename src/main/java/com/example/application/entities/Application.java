package com.example.application.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive(message = "Debe ingresar un número mayor a 0")
    @Max(value = 1000, message = "El código debe ser menor a 1000")
    private int code;

    @NotBlank(message = "Debe completar el campo")
    @Pattern(regexp = "^[a-zñáéíóúA-ZÁÉÍÓÚÑ\s]+$", message = "El nombre debe contener solo caracteres")
    private String name;

    public Application(int code, String name) {
        this.code = code;
        this.name = name;
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
}
