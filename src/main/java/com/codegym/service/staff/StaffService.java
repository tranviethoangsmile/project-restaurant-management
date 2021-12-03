package com.codegym.service.staff;

import com.codegym.entity.Role;
import com.codegym.entity.Staff;
import com.codegym.entity.User;
import com.codegym.entity.dto.StaffDTO;
import com.codegym.entity.dto.UserDTO;
import com.codegym.entity.dto.UserUpdateDTO;
import com.codegym.repository.StaffRepository;
import com.codegym.repository.UserRepository;
import com.codegym.service.role.IRoleService;
import com.codegym.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;


@Service
public class StaffService implements IStaffService {
    @Autowired
    StaffRepository staffRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    IRoleService roleService;

    @Autowired
    IUserService userService;

    @Override
    public Iterable<Staff> findAll() {
        return staffRepository.findAll();
    }

    @Override
    public Optional<Staff> findById(Long id) {
        return staffRepository.findById(id);
    }


    @Override
    public Staff save(Staff staff) {
        return staffRepository.save(staff);
    }

    @Override
    public void remove(Long id) {
        staffRepository.deleteById(id);
    }

//    @Override
//    public Optional<Staff> findByUsername(String username) {
//        return staffRepository.findByUsername(username);
//    }
//
//    @Override
//    public Boolean existsByUsername(String username) {
//        return staffRepository.existsByUsername(username);
//    }

//    @Override
//    public Staff create(StaffDTO staffDTO) throws ParseException {
//        return null;
//    }

    @Override
    public Staff create(StaffDTO staffDTO) throws ParseException {
        Staff staff = new Staff();
        staff.setFullName(staffDTO.getFullName());

        staff.setAddress(staffDTO.getAddress());
        staff.setPhone(staffDTO.getPhone());

//        Date date = new SimpleDateFormat("dd/MM/yyyy").parse(staffDTO.getDob());
        staff.setDob(staff.getDob());
        staff.setStatus(true);

        User user = new User();
        user.setUsername(staffDTO.getUsername());
        user.setPassword(encoder.encode(staffDTO.getPassword()));

        Role role = new Role();
        role.setCode("ROLE_USER");

        return staffRepository.save(staff);
    }

    @Override
    public Staff update(Long id, UserUpdateDTO userDTO) throws ParseException {
        Optional<Staff> user = staffRepository.findById(id);

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

            return staffRepository.save(user.get());
        }

        return null;
    }

    @Override
    public UserUpdateDTO userDTOById(Long id) {

        Optional<Staff> user = staffRepository.findById(id);
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
