package com.codegym.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping ("")
public class HomeController {

    @GetMapping
    private ModelAndView goHome () {
        ModelAndView modelAndView = new ModelAndView("/user/home");
        return modelAndView;
    }

    @GetMapping("/admin")
    private ModelAndView goAdmin () {
        ModelAndView modelAndView = new ModelAndView("/user/admin");
        return modelAndView;
    }

    @GetMapping ("/table")
    private ModelAndView goTable () {
        ModelAndView modelAndView = new ModelAndView("/layout/table");
        return modelAndView;
    }

    @GetMapping ("/catogory")
    private ModelAndView goCatogory () {
        ModelAndView modelAndView = new ModelAndView("/layout/catogory");
        return modelAndView;
    }

    @GetMapping ("/product")
    private ModelAndView goProduct () {
        ModelAndView modelAndView = new ModelAndView("/layout/product");
        return modelAndView;
    }
    @GetMapping ("/staff")
    private ModelAndView goStaff () {
        ModelAndView modelAndView = new ModelAndView("/layout/staff");
        return modelAndView;
    }

}
