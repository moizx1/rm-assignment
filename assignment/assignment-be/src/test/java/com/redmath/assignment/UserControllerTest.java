package com.redmath.assignment;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Order(3)
    @Test
    void shouldReturnAllUsers() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(1)));

    }

    @Order(2)
    @Test
    void shouldReturnUserById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId", Matchers.is(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username", Matchers.is("test1@gmail.com")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.password", Matchers.notNullValue()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is("test1")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.dob", Matchers.notNullValue()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.address", Matchers.is("NorthBay")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.roles", Matchers.is("USER")));
    }

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


    @Order(4)
    @Test
//    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void shouldUpdateUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/user/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"username\": \"updatedUser@gmail.com\", \"password\": \"newPassword\", \"name\": \"Updated Name\", \"dob\": \"2000-01-01\", \"roles\": \"USER\" }")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .with(SecurityMockMvcRequestPostProcessors.user("admin@gmail.com")
                                .authorities(new SimpleGrantedAuthority("ROLE_ADMIN"))))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId", Matchers.is(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username", Matchers.is("updatedUser@gmail.com")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is("Updated Name")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.dob", Matchers.is("2000-01-01T00:00:00.000+00:00")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.roles", Matchers.is("USER")));
    }

    @Order(5)
    @Test
    void shouldReturnNotFoundForNonExistingUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/user/-99")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
