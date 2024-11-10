package com.deepak.eshopping_backend.Service;

import com.deepak.eshopping_backend.Model.Product;
import com.deepak.eshopping_backend.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
@Autowired
    ProductRepo productRepo;

    public List<Product> getProducts() {
        return productRepo.findAll();
    }

   public String addProduct(Product product, MultipartFile imageFile) {
        if (productRepo.existsByName(product.getName())) {
            return "Product already exists";
        }
        else {
            try {
                product.setImagetype(imageFile.getContentType());
                product.setImageData(imageFile.getBytes()); // Storing image bytes
                product.setName(product.getName());
                productRepo.save(product);
                return "Success";
            } catch (Exception e) {
                return "Error saving product: " + e.getMessage();
            }
        }
    }



    public Optional<Product> getProductById(long productId) {
        return productRepo.findById(productId);
    }

    public List<Product> search(String keyword) {
        return productRepo.search(keyword);

    }

    public String editproduct(long id, Product product, MultipartFile image) {
        Optional<Product> existingProductOpt = productRepo.findById(id);
        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();
            existingProduct.setName(product.getName());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setManufacturer(product.getManufacturer());
            existingProduct.setPrice(product.getPrice());

            if (image != null && !image.isEmpty()) {
                try {
                    existingProduct.setImagename(image.getOriginalFilename());
                    existingProduct.setImagetype(image.getContentType());
                    existingProduct.setImageData(image.getBytes());
                } catch (Exception e) {
                    return "Error setting image data: " + e.getMessage();
                }
            }

            productRepo.save(existingProduct);
            return "Success";
        } else {
            return "Product not found";
        }
    }


    public String deleteproduct(long productId) {
        try{
            productRepo.deleteById(productId);
            return "Deletion successfull";
        }
        catch(Exception e){
            return e.toString();
        }
    }
}
