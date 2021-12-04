package com.codegym.controller.api;

import com.codegym.entity.Category;
import com.codegym.service.category.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/category")
public class CategoryApi {

    @Autowired
    private ICategoryService iCategoryService;

    @GetMapping("/category")
    public Iterable<Category> getList() {

        return iCategoryService.findAll();
    }

    @PostMapping("/category/create")
    public Category create(@RequestBody Category category) {

        return iCategoryService.save(category);
    }

    @GetMapping("/category/{id}")
    public Category createId(@PathVariable Long id) {

        return iCategoryService.findById(id).get();
    }

    @PostMapping("/category/update")
    public Category update(@RequestBody Category category) {

        return iCategoryService.save(category);
    }

    @GetMapping("/category/delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {

        iCategoryService.remove(id);

        Optional<Category> category = iCategoryService.findById(id);

        if (category.isPresent()) {
            return new ResponseEntity<Boolean>(true, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

}
