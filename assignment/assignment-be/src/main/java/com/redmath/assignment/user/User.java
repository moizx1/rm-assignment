package com.redmath.assignment.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    private String username;

    private String password;

    private String name;

    private Date dob;

    private String address;

    private String roles;

    public Date getDob() {
        return dob != null ? new Date(dob.getTime()) : null;
    }

    public void setDob(Date dob) {
        this.dob = dob != null ? new Date(dob.getTime()) : null;
    }
}
