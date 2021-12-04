package com.codegym.service.staff;

import com.codegym.entity.Role;
import com.codegym.entity.Staff;
import com.codegym.entity.User;
import com.codegym.entity.dto.RoleDTO;
import com.codegym.entity.dto.StaffDTO;
import com.codegym.entity.dto.UserDTO;
import com.codegym.entity.dto.StaffUpdateDTO;
import com.codegym.repository.StaffRepository;
import com.codegym.service.role.IRoleService;
import com.codegym.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Optional;


@Service
public class StaffService implements IStaffService {
    @Autowired
    StaffRepository staffRepository;

    @Autowired
    StaffService staffService;

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

        UserDTO userDTO = new UserDTO();
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(2L);

        Optional<Role> role = roleService.findById(2L);
//        role.setId(2L);

        userDTO.setUsername(staffDTO.getUsername());
        userDTO.setPassword(staffDTO.getPassword());
        userDTO.setRole(roleDTO);

        User user = userService.save(userDTO.toUser());

//        Role role = roleService.findByName("ROLE_USER");
//        user.setRole(role);

//        userService.save(user);
//        userService.findByUsername(user.getUsername());
//        staff.setUser(user);

//        Staff staff = new Staff();
//        staff.setUser(userDTO.toUser());
//        staff.setFullName(staffDTO.getFullName());
//        staff.setAddress(staffDTO.getAddress());
//        staff.setPhone(staffDTO.getPhone());

        //        Date date = new SimpleDateFormat("dd/MM/yyyy").parse(staffDTO.getDob());
//        staff.setDob(staff.getDob());
//        staff.setStatus(false);

        Staff staff = staffDTO.toStaff(user);

        return staffRepository.save(staff);
    }

    @Override
    public Staff update(Long id, StaffUpdateDTO staffUpdateDTO) throws ParseException {
        Optional<Staff> staff = staffRepository.findById(id);

        if(staff.isPresent()) {

            if (staffUpdateDTO.getFullName() != null && !staff.get().getFullName().equals(staffUpdateDTO.getFullName())) {
                staff.get().setFullName(staffUpdateDTO.getFullName());
            }

            if (staffUpdateDTO.getAddress() != null && !staff.get().getAddress().equals(staffUpdateDTO.getAddress())) {
                staff.get().setAddress(staffUpdateDTO.getAddress());
            }

            if (staffUpdateDTO.getPhone() != null && !staff.get().getPhone().equals(staffUpdateDTO.getPhone())) {
                staff.get().setPhone(staffUpdateDTO.getPhone());
            }

//            Date date = new SimpleDateFormat("dd/MM/yyyy").parse(staffUpdateDTO.getDob());
            if (staffUpdateDTO.getDob() != null && !staff.get().getDob().equals(staffUpdateDTO.getDob())) {
                staff.get().setDob(staffUpdateDTO.getDob());
            }


            return staffRepository.save(staff.get());
        }

        return null;
    }

    @Override
    public StaffUpdateDTO staffDTOById(Long id) {

        Optional<Staff> staff = staffRepository.findById(id);
        StaffUpdateDTO staffUpdateDTO = new StaffUpdateDTO();

        if (staff.isPresent()) {
            staffUpdateDTO.setId(id);
            staffUpdateDTO.setFullName(staff.get().getFullName());
            staffUpdateDTO.setAddress(staff.get().getAddress());
            staffUpdateDTO.setPhone(staff.get().getPhone());
            staffUpdateDTO.setDob(staff.get().getDob());

            return staffUpdateDTO;
        }

        return null;
    }


}
