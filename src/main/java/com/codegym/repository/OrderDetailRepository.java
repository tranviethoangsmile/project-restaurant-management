package com.codegym.repository;

import com.codegym.entity.OrderDetail;
import com.codegym.entity.dto.IOrderDetailSumDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List <OrderDetail> findOrderDetailByOrder_Id(Long id);

    @Query("SELECT " +
            "od.productName AS productName, " +
            "od.unitPrice AS unitPrice, " +
            "SUM(od.quantity) AS quantity, " +
            "od.productPrice AS productPrice " +
            "FROM OrderDetail AS od " +
            "WHERE od.order.id = ?1 " +
            "GROUP BY " +
            "od.productName, " +
            "od.unitPrice, " +
            "od.productPrice")
    List<IOrderDetailSumDTO> getAllIOrderDetailSumDTOByOrderId(Long id);
}
