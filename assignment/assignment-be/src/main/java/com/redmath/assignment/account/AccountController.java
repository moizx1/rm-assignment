package com.redmath.assignment.account;

import com.redmath.assignment.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<List<AccountDto>> getAccounts(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                                        @RequestParam(name = "size", defaultValue = "1000") Integer size) {
        final List<AccountDto> accountResponses = accountService.getAccounts(page, size);
        return ResponseEntity.ok(accountResponses);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<?> getAccount(@PathVariable Long accountId) {
        AccountDto accountDto = accountService.getAccountById(accountId);
        if (accountDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Account not found with account id"));
        } else {
            return ResponseEntity.ok(accountDto);
        }
    }

    @GetMapping("/{accountNumber}/details")
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<?> getAccountDetails(@PathVariable String accountNumber) {
        AccountDetailsResponse accountDetailsResponse = accountService.getAccountDetails(accountNumber);
        if (accountDetailsResponse == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Account not found with account number"));
        } else {
            return ResponseEntity.ok(accountDetailsResponse);
        }
    }

    @GetMapping("/{accountId}/balance")
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<?> getBalance(@PathVariable Long accountId){
        BigDecimal balance = accountService.getBalance(accountId);
        if (balance == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Account not found with account id"));
        } else {
            return ResponseEntity.ok(Map.of("balance", balance));
        }
    }

    @PatchMapping("/{userId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> updateAccount(@PathVariable Long userId, @RequestBody AccountDto updateAccountDto) {
        try {
            String response = accountService.updateAccount(userId, updateAccountDto);
            if (response==null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found."));
            }
            return ResponseEntity.ok(Map.of("message", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to update account. Please try again. " + e.getMessage()));
        }
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> deleteAccount(@PathVariable Long userId) {
        try {
            accountService.deleteByAccountId(userId);
            return ResponseEntity.ok(Map.of("message", "Account deleted successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message",  "Failed to delete account. Please try again. " + e.getMessage()));
        }
    }

}
