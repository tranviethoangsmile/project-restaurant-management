package com.codegym.repository;

import com.codegym.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Long> {
//    Optional<Staff> findByUsername(String username);

//    Boolean existsByUsername(String username);
}
