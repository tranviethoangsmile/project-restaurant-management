package com.codegym.controller.api;

import com.codegym.entity.Staff;
import com.codegym.entity.dto.StaffDTO;
import com.codegym.entity.dto.UserUpdateDTO;
import com.codegym.service.staff.IStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/user")
public class StaffAPI {
    @Autowired
    IStaffService staffService;

    @PostMapping
    public ResponseEntity<Staff> create(@RequestBody StaffDTO staffDTO) throws ParseException {
        return new ResponseEntity<>(staffService.create(staffDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public Iterable<Staff> getList() {

        return staffService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserUpdateDTO> findUserById(@PathVariable Long id) {
//        Optional<User> user = userService.findById(id);
//        if (!user.isPresent()) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }else {
//            return new ResponseEntity<>(user.get(),HttpStatus.OK);
//        }
        UserUpdateDTO userUpdateDTO = staffService.userDTOById(id);
        return new ResponseEntity<>(userUpdateDTO,HttpStatus.OK);

    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<Staff> updateCategory(@PathVariable("id")Long id, @RequestBody UserUpdateDTO userDTO) throws ParseException {
        Staff staff = staffService.update(id, userDTO);

        if (staff == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(staff, HttpStatus.OK);
        }
    }
}