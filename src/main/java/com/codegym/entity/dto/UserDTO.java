package com.codegym.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String username;
    private String password;
    private String fullName;
    private String address;
    private String phone;
    private String dob;

    public UserDTO(String fullName, String address, String phone, String dob) {
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.dob = dob;
    }
}
