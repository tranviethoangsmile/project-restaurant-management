package com.codegym.repository;

import com.codegym.entity.Desk;
import com.codegym.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

//    @Query("SELECT MAX(o.id) FROM orders AS o WHERE o.desk_id = ?1")
//    Order getOrderLastByDesk_Id(Long id);

    @Query("select MAX (o) from Order o where o.desk.id = ?1")
    Order getMaxOrderLastByDesk_Id(Long id);

//    Order getMaxOrderByDesk_Id(Long id);

//    @Query("select o from Order o where o.desk.id = ?1")
//    Order getOrderByDesk_Id(Long id);

}
