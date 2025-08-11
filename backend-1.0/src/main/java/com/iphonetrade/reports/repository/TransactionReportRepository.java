package com.iphonetrade.reports.repository;

import com.iphonetrade.reports.dto.SalesReportDto;
import com.iphonetrade.transaction.model.Transaction;
import com.iphonetrade.transaction.model.enums.TransactionType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TransactionReportRepository extends Repository<Transaction, Long> {

    @Query("""
    SELECT new com.iphonetrade.reports.dto.SalesReportDto(
        t.fecha,
        COUNT(DISTINCT td),
        SUM(td.valorUnitario)
    )
    FROM Transaction t
    JOIN t.dispositivos td
    WHERE t.tipo = :tipo
    AND t.usuario.id = :usuarioId
    AND t.fecha BETWEEN :desde AND :hasta
    AND (:tipoDispositivo IS NULL OR td.dispositivo.modelo = :tipoDispositivo)
    GROUP BY t.fecha
    ORDER BY t.fecha
""")
    List<SalesReportDto> getReportByType(
            @Param("tipo") TransactionType tipo,
            @Param("desde") LocalDate desde,
            @Param("hasta") LocalDate hasta,
            @Param("tipoDispositivo") String tipoDispositivo,
            @Param("usuarioId") Long usuarioId
    );

    @Query("""
    SELECT new com.iphonetrade.reports.dto.SalesReportDto(
        t.fecha,
        COUNT(DISTINCT td),
        SUM(td.valorUnitario)
    )
    FROM Transaction t
    JOIN t.dispositivos td
    WHERE t.usuario.id = :usuarioId
    AND t.fecha BETWEEN :desde AND :hasta
    AND (:tipoDispositivo IS NULL OR td.dispositivo.modelo = :tipoDispositivo)
    GROUP BY t.fecha
    ORDER BY t.fecha
""")
    List<SalesReportDto> getMixedReport(
            @Param("desde") LocalDate desde,
            @Param("hasta") LocalDate hasta,
            @Param("tipoDispositivo") String tipoDispositivo,
            @Param("usuarioId") Long usuarioId
    );

}
