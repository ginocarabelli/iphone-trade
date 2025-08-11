package com.iphonetrade.reports.service.impl;

import com.iphonetrade.reports.dto.ReportRequestDto;
import com.iphonetrade.reports.dto.SalesReportDto;
import com.iphonetrade.reports.exception.ReportGenerationException;
import com.iphonetrade.reports.repository.TransactionReportRepository;
import com.iphonetrade.reports.service.ReportService;
import com.iphonetrade.transaction.model.enums.TransactionType;
import com.iphonetrade.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final TransactionReportRepository transactionReportRepository;

    @Override
    public List<SalesReportDto> generateSalesReport(ReportRequestDto request) {
        try {
            return transactionReportRepository.getReportByType(
                    TransactionType.VENTA,
                    request.getDesde(),
                    request.getHasta(),
                    request.getTipoDispositivo(),
                    request.getUsuarioId()
            );
        } catch (Exception e) {
            throw new ReportGenerationException("Error al generar reporte de ventas desde la base de datos", e);
        }
    }

    @Override
    public List<SalesReportDto> generatePurchaseReport(ReportRequestDto request) {
        try {
            return transactionReportRepository.getReportByType(
                    TransactionType.COMPRA,
                    request.getDesde(),
                    request.getHasta(),
                    request.getTipoDispositivo(),
                    request.getUsuarioId()
            );

        } catch (Exception e) {
            throw new ReportGenerationException("Error al generar reporte de compras", e);
        }
    }

    @Override
    public List<SalesReportDto> generateExchangeReport(ReportRequestDto request) {
        try {
            return transactionReportRepository.getReportByType(
                    TransactionType.INTERCAMBIO,
                    request.getDesde(),
                    request.getHasta(),
                    request.getTipoDispositivo(),
                    request.getUsuarioId()
            );

        } catch (Exception e) {
            throw new ReportGenerationException("Error al generar reporte de intercambios", e);
        }
    }

    @Override
    public List<SalesReportDto> generateMixedReport(ReportRequestDto request) {
        try {
            return transactionReportRepository.getMixedReport(
                    request.getDesde(),
                    request.getHasta(),
                    request.getTipoDispositivo(),
                    request.getUsuarioId()
            );
        } catch (Exception e) {
            throw new ReportGenerationException("Error al generar reporte mixto", e);
        }
    }

}
