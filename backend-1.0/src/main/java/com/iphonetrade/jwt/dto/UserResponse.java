package com.iphonetrade.jwt.dto;

import com.iphonetrade.jwt.model.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserResponse {
    private Long id;
    private String fullName;
    private String email;
    private Long phoneNumber;
    private String businessAddress;
    private String city;
    private LocalDate creationDate;
    private Role role;
}
