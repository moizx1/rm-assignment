package com.redmath.assignment.transaction;

import com.redmath.assignment.account.Account;
import com.redmath.assignment.account.AccountRepository;
import com.redmath.assignment.user.User;
import com.redmath.assignment.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionsByAccountId(Long accountId) {
        return transactionRepository.findByAccountId(accountId);
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Transactional
    public void submitTransaction(TransactionRequest request) {
        if (request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Transaction amount must be greater than zero");
        }

        Account fromAccount = accountRepository.findById(request.getFromAccountId()).orElseThrow(() -> new IllegalArgumentException("Invalid from_account ID"));
        Account toAccount = accountRepository.findById(request.getToAccountId()).orElseThrow(() -> new IllegalArgumentException("Invalid to_account ID"));

        if (fromAccount.getBalance().compareTo(request.getAmount()) < 0) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        Optional<User> user = userRepository.findById(toAccount.getUserId());
        Optional<User> user1 = userRepository.findById(fromAccount.getUserId());

        Transaction debitTransaction = new Transaction();
        debitTransaction.setAccountId(request.getFromAccountId());
        debitTransaction.setToFromName(user.get().getName());
        debitTransaction.setDate(LocalDateTime.now());
        debitTransaction.setDescription(request.getDescription());
        debitTransaction.setAmount(request.getAmount());
        debitTransaction.setDbCrIndicator("DB");
        transactionRepository.save(debitTransaction);

        Transaction creditTransaction = new Transaction();
        creditTransaction.setAccountId(request.getToAccountId());
        creditTransaction.setToFromName(user1.get().getName());
        creditTransaction.setDate(LocalDateTime.now());
        creditTransaction.setDescription(request.getDescription());
        creditTransaction.setAmount(request.getAmount());
        creditTransaction.setDbCrIndicator("CR");
        transactionRepository.save(creditTransaction);

        fromAccount.setBalance(fromAccount.getBalance().subtract(request.getAmount()));
        toAccount.setBalance(toAccount.getBalance().add(request.getAmount()));

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}
