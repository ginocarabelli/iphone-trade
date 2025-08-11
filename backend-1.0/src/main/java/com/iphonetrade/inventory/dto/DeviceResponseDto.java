package com.iphonetrade.inventory.dto;

import com.iphonetrade.inventory.model.enums.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class DeviceResponseDto {
    private Long id;
    private String modelo;
    private String almacenamiento;
    private String color;
    private EstadoFisico estadoFisico;
    private Integer condicionBateria;
    private CondicionGeneral condicionGeneral;
    private BigDecimal precioSugerido;
    private LocalDate fechaIngreso;
    private LocalDate fechaSalida;
    private EstadoStock estadoStock;
    private Long creadoPor;
}
