package com.deepak.eshopping_backend.Repository;

import com.deepak.eshopping_backend.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {
    boolean existsByName(String name);

    @Query("SELECT P FROM Product P WHERE "+
    "LOWER(P.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "+
    "LOWER (P.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "+
    "LOWER(P.manufacturer) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> search(String keyword);
}
