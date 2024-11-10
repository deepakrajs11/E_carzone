package com.deepak.eshopping_backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue
    private long id;
    private String name;
    private String manufacturer;
    private String category;
    private double price;
    private String Imagename;
    private String Imagetype;
    @Lob
    private byte[] ImageData;

}
