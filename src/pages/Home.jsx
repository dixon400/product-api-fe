import React, { useState, useEffect, Fragment } from 'react'
import { Navigate  } from 'react-router-dom';
import axios from 'axios'
import ProductCard from '../components/ProductCard';
import Layout from "../components/Layout";
import { getProducts } from '../api/apiAdmin';

const Home = () => {
    const [authenticated, setauthenticated] = useState(localStorage.getItem("jwt")); 
    const [products, setProducts] = useState([])
    const getAllProducts = async() => {
       try {
        const resp = getProducts();
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
    <Fragment>
       <Layout
        title="Producte App"
        description="View And Create Products"
        className="container-fluid"
        >
            <h2 className="mb-4">Products</h2>
            <div className="row">
                {products && products.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
         </Layout>
    </Fragment>
    
  )
}

export default Home