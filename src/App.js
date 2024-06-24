import './App.css';
import Home from './home/Home';
import Header from './home/Header.jsx';
import Navbar from './home/Navbar.jsx';
import Newsletter from './home/Newsletter';
import Footer from './home/Footer'
import About from './about/About';
import Gallary from './Gallarynew/Gallaryy.jsx';
// import Services from './Servicenew/Servicess'
import Services from './Servicenew/Weoffer'
import Login from './Login/Main'
import Contact from './Contact/Contact';
import Product from './product/Products.jsx';
import ProductDetails from './product/Productdetails'
import Buy_product from './product/Buy_product.jsx';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
    <Header></Header>
    <Navbar></Navbar>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/product' element={<Product/>}></Route>
    <Route path='/product-details/:id' element={<ProductDetails/>}></Route>
    <Route path='/gallary' element={<Gallary/>}></Route>
    <Route path='/services' element={<Services/>}></Route>
    <Route path='/contactus' element={<Contact/>}></Route>
    <Route path='/buy_product/:id' element={<Buy_product/>}></Route>
    </Routes>
    <Newsletter/>
    <Footer/>
    </Router>
    </>
  );
}

export default App;
