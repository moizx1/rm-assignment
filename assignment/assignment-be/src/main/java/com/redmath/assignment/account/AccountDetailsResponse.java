package com.redmath.assignment.account;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AccountDetailsResponse {
    private String name;
    private Long toAccountId;
    private BigDecimal balance;

    public AccountDetailsResponse(String name, Long toAccountId, BigDecimal balance) {
        this.name = name;
        this.toAccountId = toAccountId;
        this.balance = balance;
    }
}
