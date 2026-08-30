package com.ecommerce.sportscentre.controller;

import com.ecommerce.sportscentre.entity.Basket;
import com.ecommerce.sportscentre.entity.BasketItem;
import com.ecommerce.sportscentre.model.BasketItemResponse;
import com.ecommerce.sportscentre.model.BasketResponse;
import com.ecommerce.sportscentre.service.BasketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/baskets")
public class BasketController {
    private final BasketService basketService;

    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    @GetMapping
    public List<BasketResponse> getAllBaskets(){
        return basketService.getAllBaskets();
    }
    @GetMapping("/{basketId}")
    public ResponseEntity<BasketResponse> getBasketById(@PathVariable String basketId){
        BasketResponse basket = basketService.getBasketById(basketId);
        if(basket == null){
            return ResponseEntity.notFound().build();
        }else {
            return ResponseEntity.ok(basket);
        }
    }
//    @PostMapping
//    public ResponseEntity<BasketResponse> createBasket(@RequestBody Basket basket){
//        BasketResponse createdBasket = basketService.createBasket(basket);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdBasket);
//    }

    @DeleteMapping("/{basketId}")
    public ResponseEntity<Void> deleteBasket(@PathVariable String basketId){
        basketService.deleteBasketById(basketId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<BasketResponse> createBasket(@RequestBody BasketResponse basketResponse){
        // convert this basket response to basket entity
        Basket basket = convertToBasketEntity(basketResponse);
        //call service method to create basket
        BasketResponse createdBasket = basketService.createBasket(basket);
        return new ResponseEntity<>(createdBasket , HttpStatus.CREATED);
    }


    private Basket convertToBasketEntity(BasketResponse basketResponse) {
        Basket basket = new Basket();
        basket.setId(basketResponse.getId());
        basket.setItems(mapBasketItemsResponsesToEntity(basketResponse.getItems()));
        return basket;
    }

    private List<BasketItem> mapBasketItemsResponsesToEntity(List<BasketItemResponse> itemResponses) {
        return itemResponses.stream()
                .map(this::convertToBasketItemEntity)
                .collect(Collectors.toList());
    }

    private BasketItem convertToBasketItemEntity(BasketItemResponse itemResponse) {
        BasketItem basketItem = new BasketItem();
        basketItem.setId(itemResponse.getId());
        basketItem.setName(itemResponse.getName());
        basketItem.setDiscription(itemResponse.getDiscription());
        basketItem.setPictureUrl(itemResponse.getPictureUrl());
        basketItem.setPrice(itemResponse.getPrice());
        basketItem.setProductBrand(itemResponse.getProductBrand());
        basketItem.setProductType(itemResponse.getProductType());
        basketItem.setQuantity(itemResponse.getQuantity());
        return basketItem;
    }
}
