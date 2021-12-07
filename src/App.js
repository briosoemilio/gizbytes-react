//import 
import { useState, useEffect } from 'react'
import { UserProvider } from './UserContext'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Routes} from 'react-router-dom'

//import pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import Product from './pages/Product'
import ProductsPage from './pages/Products'

//import components
import Navbar from './components/AppNavbar'
import Footer from './components/Footer'

function App() {

  const [user, setUser] = useState({
      id: null,
      isAdmin: null,
      firstName: null,
      lastName: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    let token = localStorage.getItem('token');
    fetch('http://localhost:4000/users/details', {
      method: "GET",
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (typeof data.id !== "undefined") {
        setUser({
          id: data.id,
          isAdmin: data.isAdmin,
          firstName: data.firstName,
          lastName: data.lastName
        })
      } else {
        setUser({
          id: null,
          isAdmin: null,
          firstName: null,
          lastName: null
        })
      }
    })
  }, [])

  return (
    <UserProvider value={{user, setUser, unsetUser}} >  
      <Router>
        <Navbar/>
        <Container>
          <Routes>
            <Route exact path ="/" element = {<Home/>} />
            <Route exact path ="/home" element = {<Home/>} />
            <Route exact path ="/login" element = {<Login/>} />
            <Route exact path ="/register" element = {<Register/>} />
            <Route exact path = "/logout" element = {<Logout/>} />
            <Route exact path ="/cart" element = {<Cart/>} />
            <Route exact path ="/products/:productId" element = {<Product/>} />
            <Route exact path ="/products" element = {<ProductsPage/>} />
            <Route exact path = "*" element = {<NotFound/>} />
          </Routes>
        </Container>
        <Footer/>
      </Router>
    </UserProvider>
  );
}

export default App;
