package com.iphonetrade.reports.service;

import com.iphonetrade.reports.dto.*;

import java.util.List;

public interface ReportService {
    List<SalesReportDto> generatePurchaseReport(ReportRequestDto request);

    List<SalesReportDto> generateExchangeReport(ReportRequestDto request);

    List<SalesReportDto> generateMixedReport(ReportRequestDto request);

    List<SalesReportDto> generateSalesReport(ReportRequestDto reportRequestDto);
}