import React, { useState, useEffect, Fragment } from 'react'
import { Navigate  } from 'react-router-dom';
import axios from 'axios'
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [authenticated, setauthenticated] = useState(localStorage.getItem("jwt") || false); 
    const [products, setProducts] = useState([])
    const getProducts = async() => {
       try {
        const resp = await axios.get("http://127.0.0.1:8000/api/products")
        console.log({response: resp.data});
        return await setProducts(resp.data)
       } catch (error) {
        console.log({error});
        return error
       }
            
    }
    useEffect(() => {
        const loggedInUser = localStorage.getItem("jwt");
        if (loggedInUser) {
          setauthenticated(loggedInUser);
          getProducts()
        }
      }, []);
    if(!authenticated){
    return <Navigate replace to="/login" />;
 }

 console.log({products: products});

  return (
    <div>
        <ul>
        {products && products.map(product=>(
            <li>
                <ProductCard product={product}/>
            </li> 
            ))}
    </ul>
    </div>
    
  )
}

export default Home