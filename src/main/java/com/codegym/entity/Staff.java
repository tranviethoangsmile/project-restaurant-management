package com.codegym.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "staffs")
@Accessors(chain = true)
public class Staff {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Column(name = "full_name",nullable = false)
    private String fullName;

    @Column(nullable = false)
    private Date dob;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String phone;

    private Boolean status = false;

    @Column(columnDefinition = "boolean default false")
    private boolean deleted;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
