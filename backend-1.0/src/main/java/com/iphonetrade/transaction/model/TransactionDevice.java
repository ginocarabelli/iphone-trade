package com.iphonetrade.transaction.model;


import com.iphonetrade.inventory.model.Device;
import com.iphonetrade.transaction.model.enums.TipoMovimiento;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id")
    private Device dispositivo;

    @Enumerated(EnumType.STRING)
    private TipoMovimiento tipoMovimiento;

    @Column(name = "valor_unitario")
    private Double valorUnitario;

}