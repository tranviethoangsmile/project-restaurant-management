package com.codegym.controller.api;

import com.codegym.entity.Staff;
import com.codegym.entity.dto.StaffDTO;
import com.codegym.entity.dto.StaffUpdateDTO;
import com.codegym.service.staff.IStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Optional;

@RestController
@RequestMapping("/api/staff")
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
    public ResponseEntity<StaffUpdateDTO> findUserById(@PathVariable Long id) {
//        Optional<User> user = userService.findById(id);
//        if (!user.isPresent()) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }else {
//            return new ResponseEntity<>(user.get(),HttpStatus.OK);
//        }
        StaffUpdateDTO staffUpdateDTO = staffService.staffDTOById(id);
        return new ResponseEntity<>(staffUpdateDTO,HttpStatus.OK);

    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable("id")Long id,@RequestBody StaffDTO staffDTO) throws ParseException {
        Staff staff = staffService.update(id, staffDTO);

        if (staff == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(staff, HttpStatus.OK);
        }
    }

    @PostMapping("/change-status/{id}")
    public ResponseEntity<Staff> changeStatus(@PathVariable("id")Long id){
        Optional<Staff> staff = staffService.findById(id);
        if(!staff.isPresent()){
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            staff.get().setStatus(!staff.get().getStatus());
            return new ResponseEntity<>(staffService.save(staff.get()),HttpStatus.OK);
        }

    }


}
