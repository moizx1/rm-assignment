package com.redmath.assignment.auth;

import com.redmath.assignment.account.Account;
import com.redmath.assignment.account.AccountRepository;
import com.redmath.assignment.user.User;
import com.redmath.assignment.user.UserRepository;
import com.redmath.assignment.user.UserResponse;
import com.redmath.assignment.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> authenticate(AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Username or Password");
        }
        UserResponse response = new UserResponse();
        User user = userRepository.findByUsername(authRequest.getUsername());
        if(user.getRoles().equals("USER")) {
            Account account = accountRepository.findByUserId(user.getUserId());
            response.setUserId(user.getUserId());
            response.setUsername(user.getUsername());
            response.setName(user.getName());
            response.setAccountId(account.getAccountId());
            response.setAccountNumber(account.getAccountNumber());
            response.setBalance(account.getBalance());
        }
        else {
            response.setUserId(user.getUserId());
            response.setUsername(user.getUsername());
            response.setName(user.getName());
        }
        response.setRole(user.getRoles());
        response.setJwt(jwtUtil.generateToken(user.getUsername()));


        return ResponseEntity.ok(response);
    }
}
