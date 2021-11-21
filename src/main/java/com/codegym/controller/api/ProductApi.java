package com.codegym.controller.api;


import com.codegym.entity.Product;
import com.codegym.entity.dto.ProductDTO;
import com.codegym.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
public class ProductApi {

    @Autowired
    private IProductService iProductService;

    @GetMapping("/product")
    public Iterable<ProductDTO> getList() {

        Iterable<ProductDTO> products = iProductService.findAllPDTO();

        return products;
    }

    @PostMapping("/product/create")
    public Product create(@RequestBody Product product) {

        Product product1 = iProductService.save(product);

        return product1;
    }

    @GetMapping("/product/{id}")
    public ProductDTO createId(@PathVariable Long id) {

        ProductDTO product = iProductService.findByIdPDTO(id).get();

        return product;
    }

    @GetMapping("/product/category/{id}")
    public List<ProductDTO> selectCategory(@PathVariable Long id) {

        List<ProductDTO> product = iProductService.findByCategoryIdPDTO(id);

        return product;
    }

    @PostMapping("/product/update")
    public Product update(@RequestBody Product product) {

        Product product1 = iProductService.save(product);

        return product1;
    }

    @GetMapping("/product/delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {

        iProductService.remove(id);

        Optional<Product> product = iProductService.findById(id);

        if (product.isPresent()) {
            return new ResponseEntity<Boolean>(true, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }
}
