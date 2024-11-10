import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Navbar from './Components/Navbar'
import Home from './Pages/Home';
import AddProduct from './Pages/AddProduct';
import ViewProduct from './Pages/ViewProduct';
import SearchProduct from './Pages/SearchProduct';
import EditProduct from './Pages/EditProduct';
import Footer from './Components/Footer';
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
         
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/addproduct' element={<AddProduct />} />
          <Route exact path='/:id' element={<ViewProduct />} />
          <Route exact path='/search/:keyword' element={<SearchProduct />} />
          <Route exact path='/search/' element={<Home />} />
          <Route exact path='/edit/:id' element={<EditProduct />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
