package com.iphonetrade.inventory.controller;

import com.iphonetrade.inventory.dto.*;
import com.iphonetrade.inventory.service.DeviceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devices")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DeviceController {

    private final DeviceService deviceService;

    /**
     * Crear un nuevo dispositivo (alta en stock)
     */
    @PostMapping
    public ResponseEntity<DeviceResponseDto> createDevice(
            @RequestBody DeviceRequestDto dto,
            @RequestHeader("X-User-Id") Long userId // Simula autenticación
    ) {
        DeviceResponseDto created = deviceService.createDevice(dto, userId);
        return ResponseEntity.ok(created);
    }

    /**
     * Obtener todos los dispositivos
     */
    @GetMapping
    public ResponseEntity<List<DeviceResponseDto>> getAllDevices() {
        return ResponseEntity.ok(deviceService.getAllDevices());
    }

    /**
     * Obtener un dispositivo por su ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<DeviceResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(deviceService.getDeviceById(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<DeviceResponseDto>> getByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(deviceService.getByUser(id));
    }

    /**
     * Actualizar el estado del stock de un dispositivo
     */
    @PatchMapping("/{id}/stock")
    public ResponseEntity<DeviceResponseDto> updateStockStatus(
            @PathVariable Long id,
            @RequestBody UpdateStockStatusDto dto
    ) {
        return ResponseEntity.ok(deviceService.updateStockStatus(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.noContent().build();
    }

}
