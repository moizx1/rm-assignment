package com.redmath.assignment.user;

import com.redmath.assignment.account.Account;
import com.redmath.assignment.account.AccountService;
import com.redmath.assignment.utility.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public ResponseEntity<?> createUser(UserRequest userRequest) {
        try {
            if (userRepository.findByUsername(userRequest.getUsername()) != null) {
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
            response.setUsername(result.getUsername());
            response.setName(result.getName());
            response.setAccountId(accountResponse.getAccountId());
            response.setAccountNumber(accountResponse.getAccountNumber());
            response.setBalance(accountResponse.getBalance());
            response.setRole(result.getRoles());
            response.setJwt(jwtUtil.generateToken(result.getUsername()));

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("Error creating user: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message",  e.getMessage()));
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public User updateUser(Long id, User userDetails) throws RuntimeException {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with id: " + id);
        }
        User user = optionalUser.get();
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setName(userDetails.getName());
        user.setDob(userDetails.getDob());
        user.setRoles(userDetails.getRoles());
        return userRepository.save(user);
    }

}
