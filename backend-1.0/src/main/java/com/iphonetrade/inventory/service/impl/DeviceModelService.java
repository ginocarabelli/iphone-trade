package com.iphonetrade.inventory.service.impl;

import com.iphonetrade.inventory.model.DeviceModel;
import com.iphonetrade.inventory.repository.DeviceModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DeviceModelService {

    private final DeviceModelRepository repository;

    public BigDecimal getBasePrice(String modelo) {
        return repository.findByModelo(modelo)
                .map(DeviceModel::getBasePriceUsd)
                .orElse(BigDecimal.valueOf(400)); // fallback default
    }

    public List<DeviceModel> getAllModels() {
        return repository.findAll();
    }
}
