package com.redmath.assignment.account;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@SuppressWarnings("checkstyle:ParameterNumber")
public class UpdateAccountDto {

    private Long accountId;
    private Long userId;
    private String name;
    private String username;
    private String accountNumber;
    private BigDecimal balance;
    private String address;
    private Date dob;

    public UpdateAccountDto(Long accountId, Long userId, String name, String username, String accountNumber, BigDecimal balance, String address,
                            Date dob) {
        this.accountId = accountId;
        this.userId = userId;
        this.name = name;
        this.username = username;
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.address = address;
        this.dob = dob != null ? new Date(dob.getTime()) : null;
    }

    public Date getDob() {
        return dob != null ? new Date(dob.getTime()) : null;
    }

    public void setDob(Date dob) {
        this.dob = dob != null ? new Date(dob.getTime()) : null;
    }
}
