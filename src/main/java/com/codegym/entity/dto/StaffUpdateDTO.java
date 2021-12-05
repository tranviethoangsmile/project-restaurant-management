package com.codegym.entity.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

public class StaffUpdateDTO {
    private Long id;
    private String fullName;
    private String address;
    private String phone;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z", timezone = "Asis/Ho_Chi_Minh")
    private Date dob;

    public StaffUpdateDTO() {
    }

    public StaffUpdateDTO(Long id, String fullName, String address, String phone, Date dob) {
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

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }
}
