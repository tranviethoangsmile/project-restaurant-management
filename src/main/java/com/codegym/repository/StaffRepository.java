package com.codegym.repository;

import com.codegym.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
//    Optional<Staff> findByUsername(String username);

//    Boolean existsByUsername(String username);
}
