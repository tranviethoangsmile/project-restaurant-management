package com.codegym.repository;

import com.codegym.entity.User;
import com.codegym.entity.dto.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <User, Long> {
    Optional<User> findByUsername(String username);

    @Query("SELECT NEW com.codegym.entity.dto.UserDTO (u.id, u.username) FROM User u WHERE u.username = ?1")
    UserDTO findUserDTOByUsername(String username);

}
