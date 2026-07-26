package com.ecommerce.sportscentre.repository;

import com.ecommerce.sportscentre.entity.Basket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends CrudRepository<Basket , String> {
}
