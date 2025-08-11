package com.iphonetrade.transaction.mapper;

import com.iphonetrade.inventory.dto.DeviceResponseDto;
import com.iphonetrade.inventory.model.Device;
import com.iphonetrade.transaction.dto.TransactionDto;
import com.iphonetrade.transaction.dto.TransactionDeviceDto;
import com.iphonetrade.transaction.model.Transaction;
import com.iphonetrade.transaction.model.TransactionDevice;

import java.util.List;
import java.util.stream.Collectors;

public class TransactionMapper {

    public static TransactionDto toDto(Transaction entity) {
        if (entity == null) return null;

        List<TransactionDeviceDto> dispositivosDto = null;
        if (entity.getDispositivos() != null) {
            dispositivosDto = entity.getDispositivos().stream()
                    .map(TransactionMapper::toDeviceDto)
                    .collect(Collectors.toList());
        }

        return TransactionDto.builder()
                .id(entity.getId())
                .tipo(entity.getTipo())
                .formaPago(entity.getFormaPago())
                .fecha(entity.getFecha())
                .dispositivos(dispositivosDto)
                .total(entity.getTotal())
                .usuarioId(entity.getUsuario().getId())
                .build();
    }

    private static TransactionDeviceDto toDeviceDto(TransactionDevice entity) {
        if (entity == null) return null;

        return TransactionDeviceDto.builder()
                .dispositivo(toDeviceResponseDto(entity.getDispositivo()))
                .tipoMovimiento(entity.getTipoMovimiento())
                .valorUnitario(entity.getValorUnitario()) // si existe este campo
                .build();
    }

    private static DeviceResponseDto toDeviceResponseDto(Device device) {
        if (device == null) return null;

        return DeviceResponseDto.builder()
                .id(device.getId())
                .modelo(device.getModelo())
                .almacenamiento(device.getAlmacenamiento())
                .color(device.getColor())
                .estadoFisico(device.getEstadoFisico())
                .condicionBateria(device.getCondicionBateria())
                .condicionGeneral(device.getCondicionGeneral())
                .precioSugerido(device.getPrecioSugerido())
                .fechaIngreso(device.getFechaIngreso())
                .fechaSalida(device.getFechaSalida())
                .estadoStock(device.getEstadoStock())
                .creadoPor(device.getCreadoPor())
                .build();
    }

}
