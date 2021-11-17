package com.codegym.controller.api;

import com.codegym.entity.User;
import com.codegym.entity.dto.UserDTO;
import com.codegym.security.payload.response.MessageResponse;
import com.codegym.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) throws ParseException {
        Optional<User> userOptional = userService.findByUsername(userDTO.getUsername());

        if (userService.existsByUsername(userDTO.getUsername()) ) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

                userService.save(user);

                return new ResponseEntity<>(HttpStatus.CREATED);

    }
}
