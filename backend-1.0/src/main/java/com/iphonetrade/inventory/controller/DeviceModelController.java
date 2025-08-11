package com.iphonetrade.inventory.controller;

import com.iphonetrade.inventory.model.DeviceModel;
import com.iphonetrade.inventory.service.impl.DeviceModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/modelos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DeviceModelController {

    private final DeviceModelService modelService;

    @GetMapping("/{nombre}/precio-base")
    public ResponseEntity<BigDecimal> getBasePrice(@PathVariable String nombre) {
        BigDecimal basePrice = modelService.getBasePrice(nombre);
        return ResponseEntity.ok(basePrice);
    }

    @GetMapping
    public ResponseEntity<List<DeviceModel>> getAll() {
        return ResponseEntity.ok(modelService.getAllModels());
    }
}
