package com.codegym.repository;

import com.codegym.entity.Staff;
import com.codegym.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {
//    Optional<Staff> findByUsername(String username);

//    Boolean existsByUsername(String username);
}
