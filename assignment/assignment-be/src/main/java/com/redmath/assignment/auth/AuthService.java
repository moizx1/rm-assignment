package com.redmath.assignment.auth;

import com.redmath.assignment.account.Account;
import com.redmath.assignment.account.AccountRepository;
import com.redmath.assignment.config.ApiSecurityConfiguration;
import com.redmath.assignment.user.User;
import com.redmath.assignment.user.UserRepository;
import com.redmath.assignment.user.UserResponse;
import com.redmath.assignment.utility.AESUtil;
import com.redmath.assignment.utility.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ApiSecurityConfiguration apiSecurityConfiguration;

    @Value("${aes.secret.key}")
    private String secretKey;

    public ResponseEntity<?> authenticate(AuthRequest authRequest) throws Exception {
        String decryptedPassword = AESUtil.decryptPassword(authRequest.getPassword(), secretKey);
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), decryptedPassword)
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Username or Password");
        }
        UserResponse response = new UserResponse();
        Optional<User> user = userRepository.findByUsername(authRequest.getUsername());
        if(user.get().getRoles().equals("USER")) {
            Account account = accountRepository.findByUserId(user.get().getUserId());
            response.setUserId(user.get().getUserId());
            response.setName(user.get().getName());
            response.setAccountId(account.getAccountId());
        }
        else {
            response.setUserId(user.get().getUserId());
            response.setName(user.get().getName());
        }
        response.setRole(user.get().getRoles());

        String jwt = jwtUtil.generateToken(user.get().getUsername());
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("authorization", "Bearer " + jwt);
        return ResponseEntity.ok().header("Authorization", "Bearer "+jwt).body(response);
    }
}
