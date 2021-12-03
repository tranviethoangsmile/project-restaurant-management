package com.codegym.controller.api;

import com.codegym.entity.Category;
import com.codegym.entity.User;
import com.codegym.entity.dto.UserDTO;
import com.codegym.entity.dto.UserUpdateDTO;
import com.codegym.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserAPI {
    @Autowired
    IUserService userService;

    @PostMapping
    public ResponseEntity<User> create(@RequestBody UserDTO userDTO) throws ParseException {
        return new ResponseEntity<>(userService.create(userDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public Iterable<User> getList() {

        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserUpdateDTO> findUserById(@PathVariable Long id) {
//        Optional<User> user = userService.findById(id);
//        if (!user.isPresent()) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }else {
//            return new ResponseEntity<>(user.get(),HttpStatus.OK);
//        }
        UserUpdateDTO userUpdateDTO = userService.userDTOById(id);
        return new ResponseEntity<>(userUpdateDTO,HttpStatus.OK);

    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<User> updateCategory(@PathVariable("id")Long id,@RequestBody UserUpdateDTO userDTO) throws ParseException {
        User user = userService.update(id, userDTO);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }
}
