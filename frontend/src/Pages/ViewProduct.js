import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function ViewProduct() {
    let navigate=useNavigate();
    const {id} =useParams();
    const [product,setProduct]=useState([]);
    useEffect(()=>{
        loadproduct();

    },[]);
    const loadproduct=async()=>{
        const result=await axios.get(`http://localhost:8080/${id}`);
        setProduct(result.data);
        console.log(result.data);
    }

    const handleDelete=async(e)=>{
        const result=await axios.delete(`http://localhost:8080/delete/${id}`);
        alert(result.data);
        navigate('/');
    }


  return (
    <div className="container my-5">
    <div className="row">
        {/* Left Side: Product Image */}
        <div className="col-md-6">
            <img
                src={`data:${product.imagetype};base64,${product.imageData}`}
                alt={product.name}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
        </div>

        {/* Right Side: Product Information */}
        <div className="col-md-6">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-manufacturer"><strong>Manufacturer:</strong> {product.manufacturer}</p>
            <p className="product-category"><strong>Category:</strong> {product.category}</p>
            <p className="product-price"><strong>Price:</strong> ₹{product.price}/-</p>
            <p className="product-description"><strong>Description:</strong> {product.description}</p>
            
            {/* Add to Cart Button */}
            <div className="mt-3">
                <button className="btn btn-danger btn-lg" onClick={(e)=>{handleDelete(e);}}>Delete</button>
                <Link to="/" className="btn btn-primary btn-lg ms-3">Back to Products</Link>
            </div>
        </div>
    </div>
</div>
);
} 