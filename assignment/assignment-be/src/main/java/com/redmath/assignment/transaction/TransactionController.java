package com.redmath.assignment.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;


    @GetMapping
    public List<Transaction> getAllTransactions(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                                @RequestParam(name = "size", defaultValue = "1000") Integer size) {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<?> getTransactionsByAccountId(@PathVariable Long accountId, @RequestParam(name = "page", defaultValue = "0") Integer page,
                                                        @RequestParam(name = "size", defaultValue = "1000") Integer size) {
        try {
            List<Transaction> transactions = transactionService.getTransactionsByAccountId(accountId);
            return ResponseEntity.ok(transactions);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to update account. Please try again. " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> performTransaction(@Validated @RequestBody TransactionRequest request) {
        try {
            transactionService.submitTransaction(request);
            return ResponseEntity.ok("Transaction successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
