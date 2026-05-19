package com.ecommerce.sportscentre.service;

import com.ecommerce.sportscentre.model.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse getProductById(Integer productId);
    List<ProductResponse>getProducts();
}
