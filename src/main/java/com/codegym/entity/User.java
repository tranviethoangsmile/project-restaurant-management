package com.codegym.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.Table;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fullName;
    private String userName;
    private String passWord;
    private Date dob;
    private String address;
    private String phone;
    private String status;
    private String role;
    @JsonIgnore
    @OneToMany (targetEntity = Order.class,fetch = FetchType.EAGER)
    private Set<Order> orders;
}
