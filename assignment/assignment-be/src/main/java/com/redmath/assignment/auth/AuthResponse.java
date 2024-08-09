package com.redmath.assignment.auth;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private Long userId;
    private Long accountId;
    private String name;
    private String role;
    private String jwt;
}
