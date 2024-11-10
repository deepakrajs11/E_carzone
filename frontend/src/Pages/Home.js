import React, { useState, useEffect } from 'react';
import caurosel1 from "../images/carousel1.png";
import caurosel2 from "../images/carousel2.jpg";
import caurosel3 from "../images/carousel3.jpg";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Home() {
  const {id}=useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get('http://localhost:8080/products');
    console.log("Fetched Products:", result.data); // Log to check the fetched data
    setProducts(result.data);
  };

  return (
    <div>
      <div style={{ width: "100%", margin: "0 auto" }}>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={caurosel1} alt="Honda" style={{ width: "100%", height: "500px" }} />
            </div>
            <div className="carousel-item">
              <img src={caurosel2} alt="Toyota" style={{ width: "100%", height: "500px" }} />
            </div>
            <div className="carousel-item">
              <img src={caurosel3} alt="Benz" style={{ width: "100%", height: "500px" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        <h2 className="text-center m-4">Product List</h2>
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
    </div>
  );
}
