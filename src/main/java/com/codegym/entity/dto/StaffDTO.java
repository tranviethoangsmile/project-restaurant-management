package com.codegym.entity.dto;

import com.codegym.entity.Role;
import com.codegym.entity.Staff;
import com.codegym.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaffDTO {

    private String username;
    private String password;
    private String fullName;
    private String address;
    private String phone;
    private Date dob;

    private Role role;

    public User toUser() {
        return new User()
                .setId(0L)
                .setUsername(username)
                .setPassword(password)
                .setRole(role);
    }

    public Staff toStaff(User user) {
        return new Staff()
                .setUser(user)
                .setFullName(fullName)
                .setAddress(address)
                .setPhone(phone)
                .setDob(dob);
    }

}
