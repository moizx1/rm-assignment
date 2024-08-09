package com.redmath.assignment.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class UserDataService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User findByUserName(String username) {
        return jdbcTemplate.queryForObject("select * from users where username = ?", User.class, username);
    }
}
