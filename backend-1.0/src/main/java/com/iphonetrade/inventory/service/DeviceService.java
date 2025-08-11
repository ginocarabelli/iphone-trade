package com.iphonetrade.inventory.service;

import com.iphonetrade.inventory.dto.*;

import java.util.List;

public interface DeviceService {

    DeviceResponseDto createDevice(DeviceRequestDto dto, Long userId);

    DeviceResponseDto getDeviceById(Long id);

    List<DeviceResponseDto> getByUser(Long id);

    List<DeviceResponseDto> getAllDevices();

    List<DeviceResponseDto> getAvailableDevices();

    DeviceResponseDto updateStockStatus(Long id, UpdateStockStatusDto dto);

    DeviceResponseDto deleteDevice(Long id);
}
