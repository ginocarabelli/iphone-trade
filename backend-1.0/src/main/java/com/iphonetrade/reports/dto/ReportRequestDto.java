package com.iphonetrade.reports.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportRequestDto {
    private LocalDate desde;
    private LocalDate hasta;
    private String tipoDispositivo;
    private Long usuarioId;
}
