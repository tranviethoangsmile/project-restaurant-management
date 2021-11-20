package com.codegym.repository;

import com.codegym.entity.Product;
import com.codegym.entity.dto.ProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT NEW com.codegym.entity.dto.ProductDTO(u.id, u.name, u.price, u.status, u.category) FROM Product u")
    List<ProductDTO> findAllPDTO();

    @Query("SELECT NEW com.codegym.entity.dto.ProductDTO(u.id, u.name, u.price, u.status, u.category ) FROM Product u where  u.id = ?1")
    Optional<ProductDTO> findByIdPDTO(Long id);

    @Query("SELECT NEW com.codegym.entity.dto.ProductDTO(u.id, u.name, u.price, u.status, u.category ) FROM Product u where  u.category.id = ?1")
    List<ProductDTO> findByCategoryIdPDTO(Long id);
}
