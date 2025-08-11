package com.iphonetrade.inventory.dto;

import com.iphonetrade.inventory.model.enums.EstadoStock;
import lombok.*;

@Data
public class UpdateStockStatusDto {
    private EstadoStock nuevoEstado;
}
