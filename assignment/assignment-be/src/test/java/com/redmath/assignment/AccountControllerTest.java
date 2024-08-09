package com.redmath.assignment;

import com.redmath.assignment.account.AccountService;
import com.redmath.assignment.user.User;
import com.redmath.assignment.user.UserService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
class AccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Order(1)
    @Test
    void shouldCreateUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"test1@gmail.com\", \"password\": \"test1\", \"name\": \"test1\", \"dob\": \"1999-12-31\", \"address\": \"NorthBay\", \"createdAt\": \"2023-01-01T12:00:00\"}")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .with(SecurityMockMvcRequestPostProcessors.user("admin")
                                .authorities(new SimpleGrantedAuthority("ADMIN"))))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId", Matchers.notNullValue()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username", Matchers.is("test1@gmail.com")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is("test1")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId", Matchers.notNullValue()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber", Matchers.notNullValue()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance", Matchers.is(100)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.role", Matchers.is("USER")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.jwt", Matchers.notNullValue()));
    }

    @Order(2)
    @Test
    void shouldReturnAllAccounts() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/account")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(1)));
    }


    @Order(3)
    @Test
    void shouldReturnNotFoundAccountNumber() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/account/details/12345")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message", Matchers.is("Account not found with account number")));
    }

    @Order(4)
    @Test
    void shouldUpdateAccount() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/account/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"accountId\": 1, \"userId\": 1, \"name\": \"Abdul\", \"username\": \"abdul@gmail.com\", \"accountNumber\": \"1234512345\", \"balance\": 2000, \"address\": \"samanabad\", \"dob\": \"2023-01-01T12:00:00\" }")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .with(SecurityMockMvcRequestPostProcessors.user("admin@gmail.com")
                                .authorities(new SimpleGrantedAuthority("ADMIN"))))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message", Matchers.is("User updated.")));
    }


    @Order(5)
    @Test
    void shouldDeleteAccount() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/account/1")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .with(SecurityMockMvcRequestPostProcessors.user("admin")
                                .authorities(new SimpleGrantedAuthority("ADMIN"))))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message", Matchers.is("Account deleted successfully.")));
    }
}
