package com.codegym.controller.api;

import com.codegym.entity.Desk;
import com.codegym.service.table.ITableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RestaurantAPI {
//    Mọi người dán Autowired ở đây.
    @Autowired
    ITableService tableService;
    @PostMapping("/table/create")
    public Desk createTable (@RequestBody Desk desks) {
        return tableService.save(desks);
    }
}

