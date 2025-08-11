package com.iphonetrade.reports.controller;

import com.iphonetrade.jwt.security.AuthService;
import com.iphonetrade.reports.dto.ReportRequestDto;
import com.iphonetrade.reports.dto.SalesReportDto;
import com.iphonetrade.reports.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reportes")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;
    private final AuthService jwtService;

    @GetMapping("/ventas")
    public List<SalesReportDto> getSalesReport(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
            @RequestParam(required = false) String tipoDispositivo,
            @RequestParam Long usuarioId
    ) {
        validarToken(authHeader);
        return reportService.generateSalesReport(new ReportRequestDto(desde, hasta, tipoDispositivo, usuarioId));
    }

    @GetMapping("/compras")
    public List<SalesReportDto> getPurchaseReport(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
            @RequestParam(required = false) String tipoDispositivo,
            @RequestParam Long usuarioId
    ) {
        validarToken(authHeader);
        return reportService.generatePurchaseReport(new ReportRequestDto(desde, hasta, tipoDispositivo, usuarioId));
    }

    @GetMapping("/intercambios")
    public List<SalesReportDto> getExchangeReport(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
            @RequestParam(required = false) String tipoDispositivo,
            @RequestParam Long usuarioId
    ) {
        validarToken(authHeader);
        return reportService.generateExchangeReport(new ReportRequestDto(desde, hasta, tipoDispositivo, usuarioId));
    }

    @GetMapping("/mixto")
    public List<SalesReportDto> getMixedReport(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
            @RequestParam(required = false) String tipoDispositivo,
            @RequestParam Long usuarioId
    ) {
        validarToken(authHeader);
        return reportService.generateMixedReport(new ReportRequestDto(desde, hasta, tipoDispositivo, usuarioId));
    }

    private void validarToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token no proporcionado o mal formado");
        }

        String token = authHeader.substring(7); // quitar "Bearer "
        if (!jwtService.isTokenValid(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token inválido o expirado");
        }
    }
}
