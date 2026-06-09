package com.ecommerce.sportscentre.service;

import com.ecommerce.sportscentre.model.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    ProductResponse getProductById(Integer productId);
    Page<ProductResponse> getProducts(Pageable pageable);
    List<ProductResponse> searchProductByName(String keyword);

    List<ProductResponse> searchProductByBrandTypeAndName(Integer brandId, Integer typeId, String keyword);

    List<ProductResponse> searchProductByBrandAndType(Integer brandId, Integer typeId);
}
