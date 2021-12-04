package com.codegym.service.orderDetail;

import com.codegym.entity.OrderDetail;
import com.codegym.entity.dto.IOrderDetailSumDTO;
import com.codegym.service.IGeneralService;

import java.util.List;

public interface IOrderDetailService extends IGeneralService<OrderDetail> {

    List <OrderDetail> findOrderDetailByOrder_id(Long id);

    List<IOrderDetailSumDTO> getAllIOrderDetailSumDTOByOrderId(Long id);
}
