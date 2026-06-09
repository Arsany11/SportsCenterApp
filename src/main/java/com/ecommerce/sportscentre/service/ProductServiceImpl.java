package com.ecommerce.sportscentre.service;

import com.ecommerce.sportscentre.entity.Product;
import com.ecommerce.sportscentre.model.ProductResponse;
import com.ecommerce.sportscentre.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductResponse getProductById(Integer productId) {
       log.info("Fetching Product By Id: {}",productId);
        Product product = productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product With Given Id Doesn't exist"));
        // now convert the product to product response
        ProductResponse productResponse = convertToProductResponse(product);
        log.info("Fetching Product By Id: {}",productId);

        return productResponse;
    }

    @Override
    public Page<ProductResponse> getProducts(Pageable pageable) {
        log.info("Fetching Products");
        // retrive products from Db
        Page<Product> productPage = productRepository.findAll(pageable);
        //  Map Product -> ProductResponse
        Page<ProductResponse> productResponses = productPage
                .map(this::convertToProductResponse);
        log.info("Fetched Products");
        return productResponses;
    }

    @Override
    public List<ProductResponse> searchProductByName(String keyword) {
        log.info("Searching Product(s) by keyword: {}" , keyword);
        //call custom query method
        List<Product> products = productRepository.searchByName(keyword);
        // map
        List<ProductResponse> productResponses = products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched Products after searching");
        return productResponses;
    }

    @Override
    public List<ProductResponse> searchProductByBrandTypeAndName(Integer brandId, Integer typeId, String keyword) {
        log.info("Searching Product(s) by brandId: {} ,typeId: {} and keyword: {}" , brandId,typeId,keyword);
        //call custom query method
        List<Product> products = productRepository.searchByBrandTypeAndName(brandId,typeId,keyword);
        // map
        List<ProductResponse> productResponses = products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched Products after searching");
        return productResponses;
    }

    @Override
    public List<ProductResponse> searchProductByBrandAndType(Integer brandId, Integer typeId) {
        log.info("Searching Product(s) by brandId: {} and typeId: {}" , brandId,typeId);
        //call custom query method
        List<Product> products = productRepository.searchByBrandAndType(brandId,typeId);
        // map
        List<ProductResponse> productResponses = products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched Products after searching");
        return productResponses;
    }
    @Override
    public List<ProductResponse> searchProductByBrande(Integer brandId) {
        log.info("Searching Product(s) by brandId: {}" , brandId);
        //call custom query method
        List<Product> products = productRepository.searchByBrand(brandId);
        // map
        List<ProductResponse> productResponses = products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched Products after searching");
        return productResponses;
    } @Override
    public List<ProductResponse> searchProductByType( Integer typeId) {
        log.info("Searching Product(s) and typeId: {}" ,typeId);
        //call custom query method
        List<Product> products = productRepository.searchByType(typeId);
        // map
        List<ProductResponse> productResponses = products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched Products after searching");
        return productResponses;
    }


    private ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .pictureUrl(product.getPictureUrl())
                .productBrand(product.getBrand().getName())
                .productType(product.getType().getName())
                .build();
    }
}
