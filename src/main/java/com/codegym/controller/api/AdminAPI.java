package com.codegym.controller.api;

import com.codegym.entity.Role;
import com.codegym.entity.User;
import com.codegym.entity.dto.UserDTO;
import com.codegym.security.payload.response.MessageResponse;
import com.codegym.service.role.IRoleService;
import com.codegym.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminAPI {

    @Autowired
    IUserService userService;

    @Autowired
    IRoleService roleService;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) throws ParseException {
        Optional<User> userOptional = userService.findByUsername(userDTO.getUsername());

        if (userService.existsByUsername(userDTO.getUsername()) ) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        User user = new User(userDTO.getUsername(),
							 encoder.encode(userDTO.getPassword()));
        String strRole = userDTO.getRole();

        switch (strRole) {
            case "admin":
                Role adminRole = roleService.findByName("ROLE_ADMIN");
                user.setRole(adminRole);
                break;
            default :
                Role userRole = roleService.findByName("ROLE_USER");
                user.setRole(userRole);
        }

        userService.save(user);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }
}
