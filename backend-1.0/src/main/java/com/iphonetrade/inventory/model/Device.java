package com.iphonetrade.inventory.model;

import com.iphonetrade.inventory.dto.DeviceResponseDto;
import com.iphonetrade.inventory.model.enums.CondicionGeneral;
import com.iphonetrade.inventory.model.enums.EstadoFisico;
import com.iphonetrade.inventory.model.enums.EstadoStock;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "devices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modelo;
    private String almacenamiento;
    private String color;

    @Enumerated(EnumType.STRING)
    private EstadoFisico estadoFisico;

    @Column(name = "condicion_bateria")
    private Integer condicionBateria;

    @Enumerated(EnumType.STRING)
    private CondicionGeneral condicionGeneral;

    @Column(name = "precio_sugerido")
    private BigDecimal precioSugerido;

    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;

    @Column(name = "fecha_salida")
    private LocalDate fechaSalida;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_stock")
    private EstadoStock estadoStock;

    @Column(name = "creado_por")
    private Long creadoPor; // ID del usuario que lo registró

    public static Device toEntity(DeviceResponseDto dto) {
        if (dto == null) {
            return null;
        }

        return Device.builder()
                .id(dto.getId())
                .modelo(dto.getModelo())
                .almacenamiento(dto.getAlmacenamiento())
                .color(dto.getColor())
                .estadoFisico(dto.getEstadoFisico())
                .condicionBateria(dto.getCondicionBateria())
                .condicionGeneral(dto.getCondicionGeneral())
                .precioSugerido(dto.getPrecioSugerido())
                .fechaIngreso(dto.getFechaIngreso() != null ? dto.getFechaIngreso() : LocalDate.now())
                .fechaSalida(dto.getFechaSalida())
                .estadoStock(dto.getEstadoStock())
                .creadoPor(dto.getCreadoPor())
                .build();
    }
}
