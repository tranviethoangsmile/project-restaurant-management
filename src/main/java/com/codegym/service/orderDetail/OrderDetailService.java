package com.codegym.service.orderDetail;

import com.codegym.entity.OrderDetail;
import com.codegym.entity.dto.IOrderDetailSumDTO;
import com.codegym.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService implements IOrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public Iterable<OrderDetail> findAll() {
        return orderDetailRepository.findAll();
    }

    @Override
    public Optional<OrderDetail> findById(Long id) {
        return orderDetailRepository.findById(id);
    }

    @Override
    public OrderDetail save(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public void remove(Long id) {
        orderDetailRepository.deleteById(id);
    }

    @Override
    public List<OrderDetail> findOrderDetailByOrder_id(Long id) {
        return orderDetailRepository.findOrderDetailByOrder_Id(id);
    }

    @Override
    public List<IOrderDetailSumDTO> getAllIOrderDetailSumDTOByOrderId(Long id) {
        return orderDetailRepository.getAllIOrderDetailSumDTOByOrderId(id);
    }
}
