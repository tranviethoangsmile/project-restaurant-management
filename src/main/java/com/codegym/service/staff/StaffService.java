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


    @Override
    public Staff create(StaffDTO staffDTO) throws ParseException {

        UserDTO userDTO = new UserDTO();
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(2L);

        Optional<Role> role = roleService.findById(2L);
//        role.setId(2L);

        userDTO.setUsername(staffDTO.getUser().getUsername());
        userDTO.setPassword(staffDTO.getUser().getPassword());
        userDTO.setRole(roleDTO);

        User user = userService.save(userDTO.toUser());

        Staff staff = staffDTO.toStaff(user);

        return staffRepository.save(staff);
    }

    @Override
    public Staff update(Long id, StaffDTO staffDTO) throws ParseException {
        Optional<Staff> staff = staffRepository.findById(id);

        if(staff.isPresent()) {

            if (staffDTO.getFullName() != null && !staff.get().getFullName().equals(staffDTO.getFullName())) {
                staff.get().setFullName(staffDTO.getFullName());
            }

            if (staffDTO.getAddress() != null && !staff.get().getAddress().equals(staffDTO.getAddress())) {
                staff.get().setAddress(staffDTO.getAddress());
            }

            if (staffDTO.getPhone() != null && !staff.get().getPhone().equals(staffDTO.getPhone())) {
                staff.get().setPhone(staffDTO.getPhone());
            }

//            Date date = new SimpleDateFormat("dd/MM/yyyy").parse(staffUpdateDTO.getDob());
            if (staffDTO.getDob() != null && !staff.get().getDob().equals(staffDTO.getDob())) {
                staff.get().setDob(staffDTO.getDob());
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
