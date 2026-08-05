package com.ecommerce.sportscentre.service;

import com.ecommerce.sportscentre.entity.Basket;
import com.ecommerce.sportscentre.entity.BasketItem;
import com.ecommerce.sportscentre.entity.Product;
import com.ecommerce.sportscentre.model.BasketItemResponse;
import com.ecommerce.sportscentre.model.BasketResponse;
import com.ecommerce.sportscentre.model.ProductResponse;
import com.ecommerce.sportscentre.repository.BasketRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BasketServiceImpl implements BasketService {
    private final BasketRepository basketRepository;

    public BasketServiceImpl(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    @Override
    public List<BasketResponse> getAllBaskets() {
        log.info("Fetching All Basket");
        List<Basket> basketList = (List<Basket>) basketRepository.findAll();
        List<BasketResponse> basketResponses = basketList.stream()
                .map(this::convertToBasketResponse)
                .collect(Collectors.toList());
        return basketResponses;
    }

    @Override
    public BasketResponse getBasketById(String basketId) {
        log.info("Fetching basket by ID{}",basketId);
        Optional<Basket> basketOptional = basketRepository.findById(basketId);
        if(basketOptional.isPresent()){
            Basket basket = basketOptional.get();
            log.info("Fetching basket by ID{}",basketId);
            return convertToBasketResponse(basket);
        }else{
            log.info("Basket not found by id{}",basketId);
            return null;
        }
    }

    @Override
    public void deleteBasketById(String basketId) {
        log.info("Deleting basket by ID{}",basketId);
        basketRepository.deleteById(basketId);
        log.info("Deleted basket by ID{}",basketId);
    }

    @Override
    public BasketResponse createBasket(Basket basket) {
        log.info("Creating new basket");
        Basket savedBasket = basketRepository.save(basket);
        log.info("Saved basket by id{}",savedBasket.getId());
        return convertToBasketResponse(savedBasket);
    }

    private BasketResponse convertToBasketResponse(Basket basket) {
        if (basket == null)
            return null;
        List<BasketItemResponse> itemResponses = basket.getItems().stream()
                .map(this::convertToBasketItemResponse)
                .collect(Collectors.toList());
        return BasketResponse.builder()
                .id(basket.getId())
                .items(itemResponses)
                .build();
    }

    private BasketItemResponse convertToBasketItemResponse(BasketItem basketItem) {
        System.out.println("Description: " + basketItem.getDescription());
        return BasketItemResponse.builder()
                .id(basketItem.getId())
                .name(basketItem.getName())
                .description(basketItem.getDescription())
                .price(basketItem.getPrice())
                .pictureUrl(basketItem.getPictureUrl())
                .quantity(basketItem.getQuantity())
                .productBrand(basketItem.getProductBrand())
                .productType(basketItem.getProductType())
                .build();
    }
}