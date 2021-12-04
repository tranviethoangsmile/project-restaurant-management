package com.codegym.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name",nullable = false)
    private String fullName;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z", timezone = "Asis/Ho_Chi_Minh")
    private Date dob;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String phone;

    @Column(columnDefinition = "boolean default false")
    private Boolean status;

    @Column(columnDefinition = "boolean default false")
    private boolean deleted;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
