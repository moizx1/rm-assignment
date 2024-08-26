package com.redmath.assignment.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{accountId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getTransactionsByAccountId(@PathVariable Long accountId, @RequestParam(name = "page", defaultValue = "0") Integer page,
                                                        @RequestParam(name = "size", defaultValue = "1000") Integer size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Transaction> transactions = transactionService.getTransactionsByAccountId(accountId, pageable);
            return ResponseEntity.ok(transactions);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to retrieve transactions. Please try again. " + e.getMessage()));
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<?> performTransaction(@Validated @RequestBody TransactionRequest request) {
        try {
            transactionService.submitTransaction(request);
            return ResponseEntity.ok("Transaction successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
