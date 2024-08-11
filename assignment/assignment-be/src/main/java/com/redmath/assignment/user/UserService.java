package com.redmath.assignment.user;

import com.redmath.assignment.account.Account;
import com.redmath.assignment.account.AccountService;
import com.redmath.assignment.utility.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountService accountService;

    @Transactional
    public ResponseEntity<?> createUser(UserRequest userRequest) {
        try {
            if (userRepository.findByUsername(userRequest.getUsername()).isPresent()) {
                log.debug("User already exists");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "User already exists"));
            }
            User user = new User();
            user.setUsername(userRequest.getUsername());
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            user.setName(userRequest.getName());
            user.setDob(userRequest.getDob());
            user.setAddress(userRequest.getAddress());
            user.setRoles("USER");
            User result = userRepository.save(user);
            Account accountResponse = accountService.createAccount(userRequest, result);

            UserResponse response = new UserResponse();
            response.setUserId(result.getUserId());
            response.setName(result.getName());
            response.setAccountId(accountResponse.getAccountId());
            response.setRole(result.getRoles());

            String jwt = jwtUtil.generateToken(result.getUsername());
            return ResponseEntity.status(HttpStatus.CREATED).header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt).body(response);
        } catch (Exception e) {
            log.error("Error creating user: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.get();
    }

}
