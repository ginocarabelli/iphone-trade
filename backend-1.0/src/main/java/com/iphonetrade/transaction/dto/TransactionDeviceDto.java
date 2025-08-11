package com.iphonetrade.transaction.dto;

import com.iphonetrade.inventory.dto.DeviceResponseDto;
import com.iphonetrade.inventory.model.Device;
import com.iphonetrade.transaction.model.enums.TipoMovimiento;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDeviceDto {
    private DeviceResponseDto dispositivo;
    private TipoMovimiento tipoMovimiento;
    private Double valorUnitario;
}
