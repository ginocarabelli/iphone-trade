package com.iphonetrade.inventory.repository;

import com.iphonetrade.inventory.model.Device;
import com.iphonetrade.inventory.model.enums.CondicionGeneral;
import com.iphonetrade.inventory.model.enums.EstadoFisico;
import com.iphonetrade.inventory.model.enums.EstadoStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, Long> {

    List<Device> findByEstadoStock(EstadoStock estadoStock);

    List<Device> findAllByCreadoPor(Long id);

    Optional<Device> findByModeloAndAlmacenamientoAndColorAndEstadoFisicoAndCondicionGeneral(String modelo, String almacenamiento, String color, EstadoFisico estadoFisico, CondicionGeneral condicionGeneral);
}
