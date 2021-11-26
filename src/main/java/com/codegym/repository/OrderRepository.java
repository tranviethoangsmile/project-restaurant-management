package com.codegym.repository;

import com.codegym.entity.Desk;
import com.codegym.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order getOrderByDesk_Id(Long id);

}
