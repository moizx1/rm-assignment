package com.redmath.assignment.account;

import com.redmath.assignment.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UpdateAccountDto>> getAccounts() {
        final List<UpdateAccountDto> accountResponses = accountService.getAccounts();
        return ResponseEntity.ok(accountResponses);
    }

    @GetMapping("/details/{accountNumber}")
    public ResponseEntity<?> getAccountDetails(@PathVariable String accountNumber) {
        AccountDetailsResponse account = accountService.getAccountDetails(accountNumber);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Account not found with account number"));
        } else {
            return ResponseEntity.ok(account);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAccount(@RequestBody UpdateAccountDto updateAccountDto) {
        try {
            String response = accountService.updateAccount(updateAccountDto);
            if (response.equals("User not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", response));
            }
            return ResponseEntity.ok(Map.of("message", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to update account. Please try again. " + e.getMessage()));
        }
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long accountId) {
        try {
            accountService.deleteByAccountId(accountId);
            return ResponseEntity.ok(Map.of("message", "Account deleted successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message",  "Failed to delete account. Please try again. " + e.getMessage()));
        }
    }

}
