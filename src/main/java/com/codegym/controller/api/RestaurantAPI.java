package com.codegym.controller.api;

import com.codegym.entity.*;
import com.codegym.entity.dto.IOrderDetailSumDTO;
import com.codegym.entity.dto.OrderDetailDTO;
import com.codegym.entity.dto.ProductDTO;
import com.codegym.service.bill.IBillService;
import com.codegym.service.category.ICategoryService;
import com.codegym.service.order.IOrderService;
import com.codegym.service.orderDetail.IOrderDetailService;
import com.codegym.service.product.IProductService;
import com.codegym.service.desk.IDeskService;
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
    IDeskService deskService;

    @Autowired
    private IProductService iProductService;

    @Autowired
    private ICategoryService iCategoryService;

    @Autowired
    IOrderService orderService;

    @Autowired
    IOrderDetailService orderDetailService;

    @Autowired
    IBillService billService;

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

    @PutMapping ("/product/changerstatus/{id}")
    public Product changerStatus (@PathVariable Long id) {
        ProductDTO productDTO = iProductService.findByIdPDTO(id).get();
        Product newProduct = new Product();
        newProduct.setId(productDTO.getId());
        newProduct.setName(productDTO.getName());
        newProduct.setPrice(productDTO.getPrice());
        newProduct.setStatus(!productDTO.isStatus());
        newProduct.setCategory(productDTO.getCategory());
        return iProductService.save(newProduct);
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
    @GetMapping("/desk/delete/{id}")
    public ResponseEntity <Boolean> delete(@PathVariable Long id) {

        deskService.remove(id);

        Optional<Desk> desk = deskService.findById(id);
        if (desk.isPresent()) {
            return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

    @PostMapping ("/desk/edit")
    public Desk editDesk (@RequestBody Desk desk) {
        return deskService.save(desk);
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

    @GetMapping("/order/getorderbydeskid/{id}")
    public Order getOrderByDeskid (@PathVariable Long id) {
        return orderService.getOrderByDeskId(id);
    }

    @GetMapping("/product/getproductby/{id}")
    public Product getProductById (@PathVariable Long id) {
        return iProductService.findById(id).get();
    }


    @PostMapping ("/orderdetail/create")
    public OrderDetail createOrderDetail (@RequestBody OrderDetailDTO orderDetailDTO) {
        System.out.println(orderDetailDTO);
        Order order = orderService.findById(orderDetailDTO.getOrderId()).get();
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrder(order);
        orderDetail.setQuantity(orderDetailDTO.getQuantity());
        orderDetail.setUnitPrice(orderDetailDTO.getUnitPrice());
        orderDetail.setProductName(orderDetailDTO.getProductName());
        orderDetail.setProductPrice(orderDetailDTO.getProductPrice());
        return orderDetailService.save(orderDetail);
    }

    @GetMapping("/orderdetail/orderdetailofdeskid/{id}")
    public List<OrderDetail> getOrderDetailOfDeskid (@PathVariable Long id) {
        Order order = orderService.getOrderByDeskId(id);
        return orderDetailService.findOrderDetailByOrder_id(order.getId());
    }

    @GetMapping("/orderdetail/order-detail-of-deskid/{id}")
    public List<IOrderDetailSumDTO> getAllIOrderDetailSumDTOByOrderId (@PathVariable Long id) {
        Order order = orderService.getOrderByDeskId(id);
        return orderDetailService.getAllIOrderDetailSumDTOByOrderId(order.getId());
    }

    @GetMapping("/orderdetail/getorderdetailbyorderid/{id}")
    public List<OrderDetail> getOrderDetailByOrderIdOrderDetails (@PathVariable Long id) {
        return orderDetailService.findOrderDetailByOrder_id(id);
    }

    @GetMapping("/orderdetail/getallorderdetail")
    public Iterable<OrderDetail> getAllOrderDetail () {
        return orderDetailService.findAll();
    }

    @PostMapping("/bill/create")
    public Bill createBill (@RequestBody Bill bill) {
        System.out.println(bill);
        return billService.save(bill);
    }

    @GetMapping("/bill/getallbill")
    public Iterable<Bill> getABill () {
        return billService.findAll();
    }


}

