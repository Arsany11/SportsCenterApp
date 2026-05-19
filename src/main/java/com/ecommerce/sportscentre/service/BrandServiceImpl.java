package com.ecommerce.sportscentre.service;

import com.ecommerce.sportscentre.entity.Brand;
import com.ecommerce.sportscentre.model.BrandResponse;
import com.ecommerce.sportscentre.repository.BrandRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BrandServiceImpl implements BrandService{
private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public List<BrandResponse> getAllBrands() {
        log.info("Fetching all Brands!!!");
        //Fetch brands
        List<Brand> brandsList = brandRepository.findAll();
        // now use stream operator to map with response
        List<BrandResponse> brandResponses = brandsList.stream()
                .map(this::convertToBrandResponse)
                .collect(Collectors.toList());
        return brandResponses;
    }

    private BrandResponse convertToBrandResponse(Brand brand){
        return BrandResponse.builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();
    }
}
