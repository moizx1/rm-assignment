package com.redmath.assignment.account;

import com.redmath.assignment.transaction.TransactionRepository;
import com.redmath.assignment.user.User;
import com.redmath.assignment.user.UserRepository;
import com.redmath.assignment.user.UserRequest;
import com.redmath.assignment.utility.AccountNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    private static final long INITIAL_DEPOSIT = 100;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    public List<UpdateAccountDto> getAccounts() {
        return accountRepository.findAllAccountResponses();
    }

    public AccountDetailsResponse getAccountDetails(String accountNumber) {
        Optional<Account> account = accountRepository.findByAccountNumber(accountNumber);
        if (account.isPresent() && account.get().getUserId() != null) {
            Optional<User> user = userRepository.findById(account.get().getUserId());
            return new AccountDetailsResponse(user.get().getName(), user.get().getUserId(), account.get().getBalance());
        } else {
            return null;
        }
    }

    public Account createAccount(UserRequest userRequest, User user) {
        final String randomAccountNumber = AccountNumberUtil.generateRandomAccount();
        final Account account = new Account();
        account.setUserId(user.getUserId());
        account.setAccountNumber(randomAccountNumber);
        account.setBalance(BigDecimal.valueOf(INITIAL_DEPOSIT));
        account.setCreatedAt(userRequest.getCreatedAt());
        return accountRepository.save(account);
    }

    @Transactional
    public String updateAccount(UpdateAccountDto updateAccountDto) {
        Optional<User> findUser = userRepository.findById(updateAccountDto.getUserId());
        if (findUser.isEmpty()) {
            return "User not found";
        }
        User user = findUser.get();
        user.setName(updateAccountDto.getName());
        user.setUsername(updateAccountDto.getUsername());
        user.setDob(updateAccountDto.getDob());
        user.setAddress(updateAccountDto.getAddress());
        userRepository.save(user);
        return "User updated.";
    }

    public void deleteByAccountId(Long accountId) {
        Account account = accountRepository.findByUserId(accountId);
        userRepository.deleteById(account.getUserId());
    }

}
