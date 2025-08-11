package com.iphonetrade.reports.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesReportDto {
    private LocalDate fecha;
    private Long cantidad;
    private Double montoTotal;
}
