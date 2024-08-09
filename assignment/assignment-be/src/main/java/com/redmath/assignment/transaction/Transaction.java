package com.redmath.assignment.transaction;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long transactionId;

    //    @Column(name = "account_id", nullable = false)
    private Long accountId;

    //    @Column(name = "to_from_name", nullable = true)
    private String toFromName;

    //    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime date;

    //    @Column(name = "description")
    private String description;

    //    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    //    @Column(name = "db_cr_indicator", nullable = false)
    private String dbCrIndicator; // 'C' for credit, 'D' for debit

}

