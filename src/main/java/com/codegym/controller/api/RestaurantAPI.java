package com.codegym.controller.api;

import com.codegym.entity.Desk;
import com.codegym.entity.Product;
import com.codegym.service.product.IProductService;
import com.codegym.service.table.IDeskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RestaurantAPI {
//    Mọi người dán Autowired ở đây.
    @Autowired
IDeskService tableService;

    @Autowired
    private IProductService productService;

    @PostMapping("/product/create")
    public Product create(@RequestBody Product product) {

        return productService.save(product);
    }

    @GetMapping("/product/{id}")
    public Optional<Product> createId(@PathVariable Long id) {

        return productService.findById(id);
    }


    @PostMapping("/product/update")
    public Product update(@RequestBody Product product) {

        return productService.save(product);
    }

    @GetMapping("/product/delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {

        productService.remove(id);

        Optional<Product> product = productService.findById(id);

        if (product.isPresent()) {
            return new ResponseEntity<Boolean>(true, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

    @PostMapping("/desk/create")
    public Desk createTable (@RequestBody Desk desk) {
        return tableService.save(desk);
    }

    @GetMapping("/desk/getalldesk")
    public Iterable<Desk> getAllDesk () {
        return tableService.findAll();
    }
}

