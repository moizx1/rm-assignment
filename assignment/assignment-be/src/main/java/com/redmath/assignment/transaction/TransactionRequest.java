package com.redmath.assignment.transaction;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TransactionRequest {
    private Long toAccountId;
    private Long fromAccountId;
    private BigDecimal amount;
    private String description;
}
