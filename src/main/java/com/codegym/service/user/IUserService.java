package com.codegym.service.user;

import com.codegym.entity.User;
import com.codegym.entity.dto.UserDTO;
import com.codegym.service.IGeneralService;

import java.text.ParseException;
import java.util.Optional;

public interface IUserService extends IGeneralService<User> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    User create(UserDTO userDTO) throws ParseException;

    User update(UserDTO userDTO);
}
