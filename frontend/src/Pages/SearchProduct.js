import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Search() {
    const {keyword}=useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/search/${keyword}`);
            setProducts(response.data);
          } catch (error) {
            console.error("Error fetching search results", error);
          }
        };
        fetchResults();
      }, [keyword]);

  return (
    <div className="container">
        <h2 className="text-center m-4">Search result for "{keyword}"</h2>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <div className="card mb-4 shadow-sm">
                {/* Ensure Base64 string is being correctly passed */}
                <img
                  src={`data:${product.imagetype};base64,${product.imageData}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Category: {product.category}</p>
                  <p className="card-text">Manufacturer: {product.manufacturer}</p>
                  <p className="card-text">Price: ₹{product.price}/-</p>
                  <Link className='btn btn-outline-primary mx-2' to={`/${product.id}`}>View</Link>
                  <Link className='btn btn-primary mx-2' to={`/edit/${product.id}`}>Edit</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

  )
}