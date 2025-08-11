package com.iphonetrade.inventory.service.impl;

import com.iphonetrade.inventory.dto.*;
import com.iphonetrade.inventory.model.*;
import com.iphonetrade.inventory.model.enums.*;
import com.iphonetrade.inventory.repository.DeviceRepository;
import com.iphonetrade.inventory.service.DeviceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeviceServiceImpl implements DeviceService {

    private final DeviceRepository deviceRepository;

    @Override
    public DeviceResponseDto createDevice(DeviceRequestDto dto, Long userId) {
        Device device = Device.builder()
                .modelo(dto.getModelo())
                .almacenamiento(dto.getAlmacenamiento())
                .color(dto.getColor())
                .estadoFisico(dto.getEstadoFisico())
                .condicionBateria(dto.getCondicionBateria())
                .condicionGeneral(dto.getCondicionGeneral())
                .precioSugerido(dto.getPrecioSugerido())
                .fechaIngreso(LocalDate.now())
                .estadoStock(EstadoStock.DISPONIBLE)
                .creadoPor(userId)
                .build();

        return mapToDto(deviceRepository.save(device));
    }

    @Override
    public DeviceResponseDto getDeviceById(Long id) {
        return deviceRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new RuntimeException("Dispositivo no encontrado"));
    }

    @Override
    public List<DeviceResponseDto> getByUser(Long id) {
        return deviceRepository.findAllByCreadoPor(id)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public List<DeviceResponseDto> getAllDevices() {
        return deviceRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DeviceResponseDto> getAvailableDevices() {
        return deviceRepository.findByEstadoStock(EstadoStock.DISPONIBLE)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public DeviceResponseDto updateStockStatus(Long id, UpdateStockStatusDto dto) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dispositivo no encontrado"));

        device.setEstadoStock(dto.getNuevoEstado());

        if (dto.getNuevoEstado() == EstadoStock.VENDIDO) {
            device.setFechaSalida(LocalDate.now());
        }

        return mapToDto(deviceRepository.save(device));
    }

    @Override
    public DeviceResponseDto deleteDevice(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dispositivo no encontrado"));
        deviceRepository.delete(device);
        return mapToDto(device);
    }

    private DeviceResponseDto mapToDto(Device d) {
        return DeviceResponseDto.builder()
                .id(d.getId())
                .modelo(d.getModelo())
                .almacenamiento(d.getAlmacenamiento())
                .color(d.getColor())
                .estadoFisico(d.getEstadoFisico())
                .condicionBateria(d.getCondicionBateria())
                .condicionGeneral(d.getCondicionGeneral())
                .precioSugerido(d.getPrecioSugerido())
                .fechaIngreso(d.getFechaIngreso())
                .fechaSalida(d.getFechaSalida())
                .estadoStock(d.getEstadoStock())
                .build();
    }
}
