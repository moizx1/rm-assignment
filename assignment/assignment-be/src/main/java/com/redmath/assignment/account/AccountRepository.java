package com.redmath.assignment.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUserId(Long userId);
    Optional<Account> findByAccountNumber(String accountNumber);
    Page<Account> findAllByUserIdIsNotNull(Pageable pageable);
//    @Query(
//            "SELECT new com.redmath.assignment.account.AccountDto("
//                    + "a.accountId, u.userId, u.name, u.username, a.accountNumber, a.balance, "
//                    + "u.address, u.dob) "
//                    + "FROM Account a "
//                    + "JOIN User u ON a.userId = u.userId"
//    )
//    List<AccountDto> findAllAccountResponses();
}
