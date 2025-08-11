package com.iphonetrade.transaction.model;

import com.iphonetrade.inventory.model.Device;
import com.iphonetrade.jwt.model.User;
import com.iphonetrade.transaction.model.enums.TransactionType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TransactionType tipo;

    private LocalDate fecha;

    private double total;

    private String formaPago;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User usuario;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "transaction_id")
    private List<TransactionDevice> dispositivos;
}
