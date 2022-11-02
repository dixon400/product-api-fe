import { API } from '../config';
import axios from 'axios'

export const createCategory = async (userId, category) => {
    try {
        return await axios.post(`${API}categories`,{name:category, created_by: userId})
    } catch (e) {
        console.log({ e }); 
        return e;
    }
    // return fetch(`${API}/category/create/${userId}`, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`
    //     },
    //     body: JSON.stringify(category)
    // })
    //     .then(response => {
    //         return response.json();
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
};



export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const createProduct = async(userId, product) => {
    try {
       return await axios.post(`${API}products`, {
         name: product.name,
         brand: product.brand,
         price: `$${product.price} usd`,
         description: product.description,
         category_id: product.category,
         created_by: userId
    })
    } catch (e) {
        console.log({ e }); 
        return e;
    }
    // return fetch(`${API}products/create/${userId}`, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: `Bearer ${token}`
    //     },
    //     body: product
    // })
    //     .then(response => {
    //         return response.json();
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
};
