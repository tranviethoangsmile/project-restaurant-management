package com.codegym.service.role;

import com.codegym.entity.Role;
import com.codegym.service.IGeneralService;

public interface IRoleService extends IGeneralService<Role> {
    Role findByName(String name);
}
