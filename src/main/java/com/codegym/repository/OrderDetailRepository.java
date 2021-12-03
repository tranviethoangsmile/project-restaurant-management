package com.codegym.repository;

import com.codegym.entity.OrderDetail;
import com.codegym.entity.dto.OrderDetailDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List <OrderDetail> findOrderDetailByOrder_Id(Long id);

//    @Query("SELECT od.productName, SUM(od.quantity) FROM OrderDetail AS od WHERE od.order.id = ?1 order by od.productName")
//    List<OrderDetail> getAllOrderDetailDTOByOrder_Id(Long id);
}
