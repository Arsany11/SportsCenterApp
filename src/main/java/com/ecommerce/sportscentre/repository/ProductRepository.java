package com.ecommerce.sportscentre.repository;

import com.ecommerce.sportscentre.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product , Integer> {
    @Query("SELECT p FROM Product p where p.name LIKE %:keyword%")
    List<Product> searchByName(@Param("keyword") String keyword);

    @Query("SELECT p FROM Product p where p.brand.id = :brandId And p.type.id = :typeId And p.name LIKE %:keyword%")
    List<Product> searchByBrandTypeAndName(@Param("brandId") Integer brandId, @Param("typeId") Integer typeId ,@Param("keyword") String keyword);
    @Query("SELECT p FROM Product p where p.brand.id = :brandId And p.type.id = :typeId ")
    List<Product> searchByBrandAndType(@Param("brandId") Integer brandId, @Param("typeId") Integer typeId );
}
