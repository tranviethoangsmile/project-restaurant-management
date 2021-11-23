package com.codegym.service.order;

import com.codegym.entity.Order;
import com.codegym.service.IGeneralService;
import org.springframework.data.jpa.repository.Query;

public interface IOrderService extends IGeneralService<Order> {

    Order getOrderByDeskId(Long id);
}
