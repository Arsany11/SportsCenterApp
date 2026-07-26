package com.ecommerce.sportscentre.service;

import com.ecommerce.sportscentre.entity.Basket;
import com.ecommerce.sportscentre.model.BasketResponse;

import java.util.List;

public interface BasketService {
    List<BasketResponse> getAllBaskets();
    BasketResponse getBasketById(String basketId);
    void deleteBasketById(String basketId);
    BasketResponse createBasket(Basket basket);
}
