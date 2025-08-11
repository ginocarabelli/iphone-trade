package com.iphonetrade.jwt.dto;

import com.iphonetrade.jwt.model.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequest {

    private String fullName;

    private String email;

    private Long phoneNumber;

    private String businessAddress;

    private String city;

    private LocalDate creationDate;

    private String password;

    private Role role;

}

