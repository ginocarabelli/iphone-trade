package com.iphonetrade.inventory.repository;

import com.iphonetrade.inventory.model.DeviceModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeviceModelRepository extends JpaRepository<DeviceModel, Long> {
    Optional<DeviceModel> findByModelo(String modelo);
}
