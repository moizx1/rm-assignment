package com.redmath.assignment.account;

import com.redmath.assignment.transaction.TransactionRepository;
import com.redmath.assignment.user.User;
import com.redmath.assignment.user.UserRepository;
import com.redmath.assignment.user.UserRequest;
import com.redmath.assignment.utility.AccountNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccountService {

    private static final long INITIAL_DEPOSIT = 100;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    public List<AccountDto> getAccounts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Account> accountPage = accountRepository.findAllByUserIdIsNotNull(pageable);
        List<Account> accounts = accountPage.getContent();

        return accounts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private AccountDto convertToDto(Account account) {
        Optional<User> userOptional = userRepository.findById(account.getUserId());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new AccountDto(
                    account.getAccountId(),
                    user.getUserId(),
                    user.getName(),
                    user.getUsername(),
                    account.getAccountNumber(),
                    account.getBalance(),
                    user.getAddress(),
                    user.getDob()
            );
        }
        return null; // Handle cases where the user is not found
    }

    public AccountDto getAccountById(Long accountId) {
        Optional<Account> account = accountRepository.findById(accountId);
        if (account.isPresent() && account.get().getUserId() != null) {
            Optional<User> user = userRepository.findById(account.get().getUserId());
            if (user.isPresent()) {
                AccountDto accountDto = new AccountDto();
                accountDto.setAccountId(accountId);
                accountDto.setAccountNumber(account.get().getAccountNumber());
                accountDto.setName(user.get().getName());
                accountDto.setUserId(user.get().getUserId());
                accountDto.setBalance(account.get().getBalance());
                accountDto.setUsername(user.get().getUsername());
                accountDto.setAddress(user.get().getAddress());
                accountDto.setDob(user.get().getDob());
                return accountDto;
            }
        }
        return null;
    }

    public AccountDetailsResponse getAccountDetails(String accountNumber) {
        Optional<Account> account = accountRepository.findByAccountNumber(accountNumber);
        if (account.isPresent() && account.get().getUserId() != null) {
            Optional<User> user = userRepository.findById(account.get().getUserId());
            if (user.isPresent()) {
                return new AccountDetailsResponse(user.get().getName(), user.get().getUserId(), account.get().getBalance());
            }
        }
        return null;
    }

    public BigDecimal getBalance(Long accountId) {
        Optional<Account> account = accountRepository.findById(accountId);
        return account.isPresent() && account.get().getUserId() != null ? account.get().getBalance() : null;
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
    public String updateAccount(Long userId, AccountDto updateAccountDto) {
        Optional<User> findUser = userRepository.findById(userId);
        if (findUser.isEmpty()) {
            return null;
        }
        User user = findUser.get();
        user.setName(updateAccountDto.getName());
        user.setUsername(updateAccountDto.getUsername());
        user.setDob(updateAccountDto.getDob());
        user.setAddress(updateAccountDto.getAddress());
        userRepository.save(user);
        return "User updated.";
    }

    public void deleteByAccountId(Long userId) {
        Account account = accountRepository.findByUserId(userId);
        if (account != null) {
            userRepository.deleteById(account.getUserId());
        }
    }

}
