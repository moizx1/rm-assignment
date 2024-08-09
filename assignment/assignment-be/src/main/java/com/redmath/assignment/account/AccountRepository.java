package com.redmath.assignment.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUserId(Long userId);
    Optional<Account> findByAccountNumber(String accountNumber);
    @Query(
            "SELECT new com.redmath.assignment.account.UpdateAccountDto("
                    + "a.accountId, u.userId, u.name, u.username, a.accountNumber, a.balance, "
                    + "u.address, u.dob) "
                    + "FROM Account a "
                    + "JOIN User u ON a.userId = u.userId"
    )
    List<UpdateAccountDto> findAllAccountResponses();
}
