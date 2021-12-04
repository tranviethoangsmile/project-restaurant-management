package com.codegym.entity.dto;

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

    private UserDTO userDTO;

    private RoleDTO roleDTO;
}
