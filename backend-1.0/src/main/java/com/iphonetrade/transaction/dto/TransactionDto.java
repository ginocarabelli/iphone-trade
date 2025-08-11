package com.iphonetrade.transaction.dto;

import com.iphonetrade.transaction.model.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDto {
    private Long id;
    private TransactionType tipo;
    private String formaPago;
    private LocalDate fecha;
    private List<TransactionDeviceDto> dispositivos;
    private Double total;
    private Long usuarioId;
}
