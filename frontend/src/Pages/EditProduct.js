import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [image, setImage] = useState(null);

    useEffect(() => {
        loadproduct();
    }, []);

    const loadproduct = async () => {
        const result = await axios.get(`http://localhost:8080/${id}`);
        setProduct(result.data);
    };

    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
        if (image) formData.append('image', image);
    
        try {
            const result = await axios.put(`http://localhost:8080/editproduct/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(result.data);
            navigate("/");
        } catch (error) {
            console.log(error);
            alert('Error updating product');
        }
    };
    
    

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter product name"
                                name="name"
                                value={product.name || ""}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter vehicle category"
                                name="category"
                                value={product.category || ""}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter manufacturer name"
                                name="manufacturer"
                                value={product.manufacturer || ""}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the price"
                                name="price"
                                value={product.price || ""}
                                onChange={onInputChange}
                            />
                        </div>

                        {product.imageData && (
                            <img
                                src={`data:${product.imagetype};base64,${product.imageData}`}
                                alt={product.name}
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: '500px', objectFit: 'cover' }}
                            />
                        )}

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Change Image</label>
                            <input
                                className="form-control"
                                type="file"
                                name="image"
                                onChange={handleImage}
                            />
                        </div>

                        <Link className="btn btn-outline-primary mx-2" to="/">Back</Link>
                        <button className="btn btn-primary mx-2" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
