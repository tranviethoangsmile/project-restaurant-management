package com.codegym.controller.api;

import com.codegym.entity.Category;
import com.codegym.entity.Desk;
import com.codegym.entity.Product;
import com.codegym.entity.dto.ProductDTO;
import com.codegym.service.category.ICategoryService;
import com.codegym.service.product.IProductService;
import com.codegym.service.table.IDeskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RestaurantAPI {
    //    Mọi người dán Autowired ở đây.
    @Autowired
    IDeskService tableService;
    @Autowired
    private IProductService iProductService;

    @Autowired
    private ICategoryService iCategoryService;

    @GetMapping("/product")
    public Iterable<ProductDTO> getListProduct() {

        Iterable<ProductDTO> products = iProductService.findAllPDTO();

        return products;
    }

    @PostMapping("/product/create")
    public Product createProduct(@RequestBody Product product) {

        Product product1 = iProductService.save(product);

        return product1;
    }

    @GetMapping("/product/{id}")
    public ProductDTO createIdProduct(@PathVariable Long id) {

        ProductDTO product = iProductService.findByIdPDTO(id).get();

        return product;
    }

    @GetMapping("/product/category/{id}")
    public List<ProductDTO> selectCategory(@PathVariable Long id) {

        List<ProductDTO> product = iProductService.findByCategoryIdPDTO(id);

        return product;
    }

    @PostMapping("/product/update")
    public Product updateProduct(@RequestBody Product product) {

        Product product1 = iProductService.save(product);

        return product1;
    }

    @GetMapping("/product/delete/{id}")
    public ResponseEntity<Boolean> deleteProduct(@PathVariable Long id) {

        iProductService.remove(id);

        Optional<Product> product = iProductService.findById(id);

        if (product.isPresent()) {
            return new ResponseEntity<Boolean>(true, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

    @GetMapping("/category")
    public Iterable<Category> getListCategory() {

        Iterable<Category> categories = iCategoryService.findAll();

        return categories;
    }

    @PostMapping("/category/create")
    public Category createCategory(@RequestBody Category category) {

<<<<<<< HEAD
        Category category1 = iCategoryService.save(category);

        return category1;
=======
        return iCategoryService.save(category);
>>>>>>> hoang_dev
    }

    @GetMapping("/category/{id}")
    public Category createIdCategory(@PathVariable Long id) {

        Category category = iCategoryService.findById(id).get();

        return category;
    }

    @PostMapping("/category/update")
    public Category updateCategory(@RequestBody Category category) {

        Category category1 = iCategoryService.save(category);

        return category1;
    }

    @GetMapping("/category/delete/{id}")
    public ResponseEntity<Boolean> deleteCategory(@PathVariable Long id) {

        iCategoryService.remove(id);

        Optional<Category> category = iCategoryService.findById(id);

        if (category.isPresent()) {
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

