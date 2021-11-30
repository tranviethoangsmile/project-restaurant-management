package com.codegym.service.user;

import com.codegym.entity.Role;
import com.codegym.entity.User;
import com.codegym.entity.dto.UserDTO;
import com.codegym.entity.dto.UserUpdateDTO;
import com.codegym.repository.UserRepository;
import com.codegym.service.role.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;


@Service
public class UserService implements IUserService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    IRoleService roleService;

    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void remove(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public User create(UserDTO userDTO) throws ParseException {
        User user = new User();
        user.setFullName(userDTO.getFullName());
        user.setUsername(userDTO.getUsername());
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setAddress(userDTO.getAddress());
        user.setPhone(userDTO.getPhone());

        Date date = new SimpleDateFormat("dd/MM/yyyy").parse(userDTO.getDob());
        user.setDob(date);

        Role role = roleService.findByName("ROLE_USER");
        user.setRole(role);
        user.setStatus(true);
        return userRepository.save(user);
    }

    @Override
    public User update(Long id, UserUpdateDTO userDTO) throws ParseException {
        Optional<User> user = userRepository.findById(id);

        if(user.isPresent()) {

            if (userDTO.getFullName() != null && !user.get().getFullName().equals(userDTO.getFullName())) {
                user.get().setFullName(userDTO.getFullName());
            }

            if (userDTO.getAddress() != null && !user.get().getAddress().equals(userDTO.getAddress())) {
                user.get().setAddress(userDTO.getAddress());
            }

            if (userDTO.getPhone() != null && !user.get().getPhone().equals(userDTO.getPhone())) {
                user.get().setPhone(userDTO.getPhone());
            }

            Date date = new SimpleDateFormat("dd/MM/yyyy").parse(userDTO.getDob());
            if (date != null && !user.get().getDob().equals(date)) {
                user.get().setDob(date);
            }

            return userRepository.save(user.get());
        }

        return null;
    }

    @Override
    public UserUpdateDTO userDTOById(Long id) {

        Optional<User> user = userRepository.findById(id);
        UserUpdateDTO userUpdateDTO = new UserUpdateDTO();

        if (user.isPresent()) {
            userUpdateDTO.setId(id);
            userUpdateDTO.setFullName(user.get().getFullName());
            userUpdateDTO.setAddress(user.get().getAddress());
            userUpdateDTO.setPhone(user.get().getPhone());
            userUpdateDTO.setDob(user.get().getDob().toInstant().toString());

            return userUpdateDTO;
        }

        return null;
    }


}
