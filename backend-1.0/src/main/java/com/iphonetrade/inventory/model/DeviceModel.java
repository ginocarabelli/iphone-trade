package com.iphonetrade.inventory.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "device_models")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modelo;

    private String almacenamiento;

    @Column(name = "base_price_usd")
    private BigDecimal basePriceUsd;

}
