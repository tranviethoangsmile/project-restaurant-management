package com.codegym.controller;

import com.codegym.entity.Product;
import com.codegym.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping ("/")
public class HomeController {
    @Autowired
    private IProductService productService;

    @GetMapping
    private ModelAndView login() {
        return new ModelAndView("/user/login");
    }

    @GetMapping("/home")
    private ModelAndView goHome () {
        ModelAndView modelAndView = new ModelAndView();
        Iterable<Product> products = productService.findAll();
        modelAndView.setViewName("/user/home");
        modelAndView.addObject("products", products);
        return modelAndView;
    }

    @GetMapping("/admin")
    private ModelAndView goAdmin () {
        ModelAndView modelAndView = new ModelAndView("/user/admin");
        return modelAndView;
    }

    @GetMapping ("/desk")
    private ModelAndView goTable () {
        ModelAndView modelAndView = new ModelAndView("/layout/desk");
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
