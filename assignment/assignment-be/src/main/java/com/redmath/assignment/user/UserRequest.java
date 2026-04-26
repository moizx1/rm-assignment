package com.redmath.assignment.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserRequest {
    private String username;
    private String password;
    private String name;
    private Date dob;
    private String address;
    private LocalDateTime createdAt;

    public Date getDob() {
        return dob != null ? new Date(dob.getTime()) : null;
    }

    public void setDob(Date dob) {
        this.dob = dob != null ? new Date(dob.getTime()) : null;
    }

}
