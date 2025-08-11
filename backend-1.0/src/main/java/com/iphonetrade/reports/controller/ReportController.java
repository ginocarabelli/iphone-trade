package com.iphonetrade.reports.controller;

import com.iphonetrade.reports.dto.ReportRequestDto;
import com.iphonetrade.reports.dto.SalesReportDto;
import com.iphonetrade.reports.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reportes")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/ventas")
    public List<SalesReportDto> getSalesReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
            @RequestParam(required = false) String tipoDispositivo,
            @RequestParam Long usuarioId
    ) {
        return reportService.generateSalesReport(new ReportRequestDto(desde, hasta, tipoDispositivo, usuarioId));
    }

    @GetMapping("/compras")
    public List<SalesReportDto> getPurchaseReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
            @RequestParam(required = false) String tipoDispositivo,
            @RequestParam Long usuarioId
    ) {
        return reportService.generatePurchaseReport(new ReportRequestDto(desde, hasta, tipoDispositivo, usuarioId));
    }

    @GetMapping("/intercambios")
    public List<SalesReportDto> getExchangeReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
            @RequestParam(required = false) String tipoDispositivo,
            @RequestParam Long usuarioId
    ) {
        return reportService.generateExchangeReport(new ReportRequestDto(desde, hasta, tipoDispositivo, usuarioId));
    }

    @GetMapping("/mixto")
    public List<SalesReportDto> getMixedReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
            @RequestParam(required = false) String tipoDispositivo,
            @RequestParam Long usuarioId
    ) {
        return reportService.generateMixedReport(new ReportRequestDto(desde, hasta, tipoDispositivo, usuarioId));
    }
}
