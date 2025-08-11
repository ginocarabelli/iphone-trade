package com.iphonetrade.transaction.service.impl;

import com.iphonetrade.inventory.model.Device;
import com.iphonetrade.inventory.model.enums.EstadoStock;
import com.iphonetrade.inventory.repository.DeviceRepository;
import com.iphonetrade.jwt.model.User;
import com.iphonetrade.jwt.repository.UserRepository;
import com.iphonetrade.jwt.service.UserService;
import com.iphonetrade.transaction.dto.TransactionDeviceDto;
import com.iphonetrade.transaction.dto.TransactionDto;
import com.iphonetrade.transaction.mapper.TransactionMapper;
import com.iphonetrade.transaction.model.Transaction;
import com.iphonetrade.transaction.model.TransactionDevice;
import com.iphonetrade.transaction.model.enums.TipoMovimiento;
import com.iphonetrade.transaction.repository.TransactionRepository;
import com.iphonetrade.transaction.service.TransactionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.stream.Collectors;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository repository;
    private final DeviceRepository deviceRepository;
    private final UserService userService;

    public TransactionDto save(TransactionDto dto) {
        List<TransactionDevice> dispositivos = dto.getDispositivos().stream().map(tdDto -> {
            Device finalDevice;

            if (tdDto.getDispositivo().getId() != null) {
                // Buscar por ID
                finalDevice = deviceRepository.findById(tdDto.getDispositivo().getId())
                        .orElseThrow(() -> new RuntimeException("Dispositivo no encontrado con ID " + tdDto.getDispositivo().getId()));
            } else {
                // Buscar por atributos
                Device temp = Device.toEntity(tdDto.getDispositivo());
                finalDevice = deviceRepository
                        .findByModeloAndAlmacenamientoAndColorAndEstadoFisicoAndCondicionGeneral(
                                temp.getModelo(), temp.getAlmacenamiento(), temp.getColor(), temp.getEstadoFisico(), temp.getCondicionGeneral()
                        )
                        .orElseGet(() -> deviceRepository.save(temp));
            }

            // Si es una salida, marcar como fuera de stock
            if (tdDto.getTipoMovimiento().equals(TipoMovimiento.SALIDA)) {
                finalDevice.setEstadoStock(EstadoStock.VENDIDO); // o "FUERA_STOCK", según lo que uses
                finalDevice.setFechaSalida(LocalDate.now());
                finalDevice = deviceRepository.save(finalDevice); // guardar el cambio
            }

            return TransactionDevice.builder()
                    .dispositivo(finalDevice)
                    .tipoMovimiento(tdDto.getTipoMovimiento())
                    .valorUnitario(tdDto.getValorUnitario())
                    .build();
        }).toList();

        User userTransaction = userService.getUserModelById(dto.getUsuarioId());

        Transaction transaction = Transaction.builder()
                .tipo(dto.getTipo())
                .fecha(dto.getFecha() != null ? dto.getFecha() : LocalDate.now())
                .formaPago(dto.getFormaPago())
                .total(dto.getTotal())
                .dispositivos(dispositivos)
                .usuario(userTransaction)
                .build();

        return TransactionMapper.toDto(repository.save(transaction));
    }



    @Override
    public List<TransactionDto> findAll() {
        return repository.findAll()
                .stream()
                .map(TransactionMapper::toDto)
                .toList();
    }

    @Override
    public TransactionDto findById(Long id) {
        return TransactionMapper.toDto(repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Transaction not found")));
    }

    @Override
    public TransactionDto update(Long id, TransactionDto dto) {
        User userTransaction = userService.getUserModelById(dto.getUsuarioId());

        Transaction transaction = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Transaction not found"));
        transaction.setTipo(dto.getTipo());
        transaction.setFormaPago(dto.getFormaPago());
        transaction.setDispositivos(mapDispositivos(dto.getDispositivos()));
        transaction.setTotal(dto.getDispositivos().stream().mapToDouble(TransactionDeviceDto::getValorUnitario).sum());
        transaction.setUsuario(userTransaction);
        Transaction updated = repository.save(transaction);
        return TransactionMapper.toDto(updated);
    }

    @Override
    public TransactionDto delete(Long id) {
        Transaction persisted = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found"));

        TransactionDto dto = TransactionMapper.toDto(persisted); // 👈 lo convertís ANTES de borrar

        List<Device> dispositivosParaEliminar = new ArrayList<>();

        for (TransactionDevice td : persisted.getDispositivos()) {
            if (td.getTipoMovimiento() == TipoMovimiento.SALIDA) {
                Device dispositivo = td.getDispositivo();
                dispositivo.setEstadoStock(EstadoStock.DISPONIBLE);
                dispositivo.setFechaSalida(null);
                deviceRepository.save(dispositivo);
            } else if (td.getTipoMovimiento() == TipoMovimiento.ENTRADA) {
                dispositivosParaEliminar.add(td.getDispositivo());
            }
        }

        repository.delete(persisted); // 👈 recién después lo eliminás

        for (Device dispositivo : dispositivosParaEliminar) {
            deviceRepository.delete(dispositivo);
        }

        return dto;
    }

    private List<TransactionDevice> mapDispositivos(List<TransactionDeviceDto> dtoList) {
        return dtoList.stream().map(dto -> TransactionDevice.builder()
                .dispositivo(Device.toEntity(dto.getDispositivo()))
                .tipoMovimiento(dto.getTipoMovimiento())
                .valorUnitario(dto.getValorUnitario())
                .build()).collect(Collectors.toList());
    }
}
