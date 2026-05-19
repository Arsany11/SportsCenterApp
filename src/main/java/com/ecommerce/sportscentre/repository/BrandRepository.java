package com.ecommerce.sportscentre.repository;

import com.ecommerce.sportscentre.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand ,Integer> {
}
