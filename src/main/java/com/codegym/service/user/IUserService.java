package com.codegym.service.user;

import com.codegym.entity.User;
import com.codegym.entity.dto.UserDTO;
import com.codegym.service.IGeneralService;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface IUserService extends IGeneralService<User>, UserDetailsService {
    Optional<User> findByUsername(String username);

    UserDTO findUserDTOByUsername(String username);

}
