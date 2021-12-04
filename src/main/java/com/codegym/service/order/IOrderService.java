package com.codegym.service.order;

import com.codegym.entity.Order;
import com.codegym.service.IGeneralService;

public interface IOrderService extends IGeneralService<Order> {

    Order getOrderByDeskId(Long id);
}
