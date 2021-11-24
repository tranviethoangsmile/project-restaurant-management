package com.codegym.controller.api;

import com.codegym.entity.Category;
import com.codegym.entity.Desk;
import com.codegym.entity.Order;
import com.codegym.entity.Product;
import com.codegym.entity.dto.ProductDTO;
import com.codegym.service.category.ICategoryService;
import com.codegym.service.order.IOrderService;
import com.codegym.service.product.IProductService;
import com.codegym.service.desk.IDeskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RestaurantAPI {
//    Mọi người dán Autowired ở đây.

    @Autowired
    IDeskService deskService;

    @Autowired
    private IProductService iProductService;

    @Autowired
    private ICategoryService iCategoryService;

    @Autowired
    IOrderService orderService;

    @GetMapping("/product")
//    @PreAuthorize("hasRole('ADMIN')")
    public Iterable<ProductDTO> getListProduct() {

        return iProductService.findAllPDTO();
    }

    @PostMapping("/product/create")
    public Product createProduct(@RequestBody Product product) {

        return iProductService.save(product);
    }

    @GetMapping("/product/{id}")
    public ProductDTO createIdProduct(@PathVariable Long id) {

        return iProductService.findByIdPDTO(id).get();
    }

    @GetMapping("/product/category/{id}")
    public List<ProductDTO> selectCategory(@PathVariable Long id) {

        return iProductService.findByCategoryIdPDTO(id);
    }

    @PostMapping("/product/update")
    public Product updateProduct(@RequestBody Product product) {

        return iProductService.save(product);
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

        return iCategoryService.findAll();
    }

    @PostMapping("/category/create")
    public Category createCategory(@RequestBody Category category) {

        return iCategoryService.save(category);
    }

    @GetMapping("/category/{id}")
    public Category createIdCategory(@PathVariable Long id) {

        return iCategoryService.findById(id).get();
    }

    @PostMapping("/category/update")
    public Category updateCategory(@RequestBody Category category) {

        return iCategoryService.save(category);
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
        return deskService.save(desk);
    }

    @GetMapping("/desk/getalldesk")
    public Iterable<Desk> getAllDesk () {
        return deskService.findAll();
    }

    @GetMapping("/desk/getDeskById/{id}")
    public Desk getDeskById (@PathVariable Long id) {
        return deskService.findById(id).get();
    }

    @PutMapping("/desk/update/{id}")
    public Desk updateDesk (@PathVariable Long id) {
        Desk desk = deskService.findById(id).get();
        Desk newDesk = new Desk();
        newDesk.setId(desk.getId());
        newDesk.setName(desk.getName());
        newDesk.setStatus(!desk.getStatus());
        return deskService.save(newDesk);
    }


    @PostMapping("/order/create")
    public Order createOrder (@RequestBody Order order) {
        return orderService.save(order);
    }


}

