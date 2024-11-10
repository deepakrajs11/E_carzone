package com.deepak.eshopping_backend.Controller;

import com.deepak.eshopping_backend.Model.Product;
import com.deepak.eshopping_backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")  // Enable CORS for frontend on localhost:3000
public class ProductController {

    @Autowired
    private ProductService productService;

    // Get all products
    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getProducts();  // Fetch products with Base64 image data
    }

    // Get a product by ID
    @GetMapping("{productId}")
    public Optional<Product> getProductById(@PathVariable long productId) {
        return productService.getProductById(productId);  // Get a product by its ID
    }

    // Add a new product with image
    @PostMapping("/addproduct")
    public String addProduct(@RequestPart Product product, @RequestPart MultipartFile image) {
        return productService.addProduct(product, image);  // Save product and image
    }

    @PutMapping("/editproduct/{productId}")
    public String editproduct(
            @PathVariable long productId,
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        return productService.editproduct(productId, product, image);
    }


    @GetMapping("/search/{keyword}")
    List<Product> search(@PathVariable String keyword){
        return productService.search(keyword);
    }

    @DeleteMapping("/delete/{productId}")
    String deleteproduct(@PathVariable long productId){
        return productService.deleteproduct(productId);
    }
}
