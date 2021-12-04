package com.codegym.entity.dto;

public class UserUpdateDTO {
    private Long id;
    private String fullName;
    private String address;
    private String phone;
    private String dob;

    public UserUpdateDTO() {
    }

    public UserUpdateDTO(Long id, String fullName, String address, String phone, String dob) {
        this.id = id;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.dob = dob;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }
}
