package com.redmath.assignment.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long userId;
    private String username;
    private String name;
    private Long accountId;
    private String accountNumber;
    private BigDecimal balance;
    private String role;
    private String jwt;
}
