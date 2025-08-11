package com.iphonetrade.jwt.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Table(name = "users")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;
    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone_number")
    private Long phoneNumber;

    @Column(name = "business_address")
    private String businessAddress;

    private String city;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Enumerated(EnumType.STRING)
    private Role role;
}
