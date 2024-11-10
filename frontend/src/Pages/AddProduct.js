import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
     let navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    manufacturer: '',
    price: '',
  });
  const [image, setImage] = useState(null);

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8080/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product uploaded successfully');
    } catch (error) {
      console.error("Error uploading product:", error);
      alert('Failed to upload product');
    }
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Product</h2>
          <form onSubmit={handleSubmit}> 
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the name of the product"
                name="name"
                value={product.name}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product category"
                name="category"
                value={product.category}
                onChange={onInputChange}
              />
            </div>      

            <div className="mb-3">
              <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter manufacturer"
                name="manufacturer"
                value={product.manufacturer}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the price"
                name="price"
                value={product.price}
                onChange={onInputChange}
              />
            </div>            

            <div className="mb-3">
              <label htmlFor="image" className="form-label">Select an Image</label>  
              <input
                className="form-control"
                type="file"
                name="image"
                onChange={handleImage}
              />
            </div>

            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
