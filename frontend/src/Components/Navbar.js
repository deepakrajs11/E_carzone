import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'


export default function Navigation() {
  const [keyword,setKeyword]=useState('');
  const handlesearch=(e)=>{
    console.log(e.target.value);
    setKeyword(e.target.value);
  }
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <img src={Logo} alt="Logo" style={{ width: '40px', height: 'auto', marginRight: '10px' }} />
    <Link class="navbar-brand" to={"/"}>Deepak's Car Zone</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to={`/`}>Home</Link>
        </li>
        <li class="nav-item dropdown">
          <p class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </p>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to={'/search/Sedan'}>Sedan</Link></li>
            <li><Link class="dropdown-item" to={'/search/SUV'}>SUV</Link></li>
          </ul>
        </li>
        
      </ul>
      <div class="d-flex">
        <input class="form-control me-2" type="text" placeholder="Search" name="search" value={keyword} onChange={(e)=>{handlesearch(e);}}/>
        <Link class="btn btn-outline-success" to={`/search/${keyword}`}>Search</Link>
      </div>
      <Link className='btn btn-primary mx-2' to={`/addproduct`}>Add Product</Link>  
      
    </div>
  </div>
</nav>
  )
} 