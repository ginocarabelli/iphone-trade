package com.iphonetrade.inventory.dto;

import com.iphonetrade.inventory.model.enums.*;

import lombok.*;

import java.math.BigDecimal;

@Data
public class DeviceRequestDto {
    private String modelo;
    private String almacenamiento;
    private String color;
    private EstadoFisico estadoFisico;
    private Integer condicionBateria;
    private CondicionGeneral condicionGeneral;
    private BigDecimal precioSugerido;
}
