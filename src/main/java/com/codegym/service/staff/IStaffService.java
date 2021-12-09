package com.codegym.service.staff;

import com.codegym.entity.Staff;
import com.codegym.entity.dto.StaffDTO;
import com.codegym.entity.dto.StaffUpdateDTO;
import com.codegym.service.IGeneralService;

import java.text.ParseException;

public interface IStaffService extends IGeneralService<Staff> {
//    Optional<Staff> findByUsername(String username);

//    Boolean existsByUsername(String username);

    Staff create(StaffDTO staffDTO) throws ParseException;

    Staff update(Long id, StaffDTO staffDTO) throws ParseException;

    StaffUpdateDTO staffDTOById(Long id);

}
