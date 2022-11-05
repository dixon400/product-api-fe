import { API } from '../config';
import axios from 'axios'

export const createCategory = async (userId, category) => {
    try {
        return await axios.post(`${API}categories`, { name: category, created_by: userId }, {withCredentials: true})
    } catch (e) {
        console.log({ e });
        return e;
    }
};



export const getCategories = async() => {
    try {
        return await axios.get(`${API}categories`)
    } catch (e) {
        console.log({ e });
        return e;
    }
};


export const createProduct = async (userId, product) => {
    try {
        return await axios.post(`${API}products`, {
            name: product.name,
            brand: product.brand,
            price: `$${product.price} usd`,
            description: product.description,
            category_id: product.category,
            created_by: userId
        }, {withCredentials: true})
    } catch (e) {
        console.log({ e });
        return e;
    }
};

export const getProducts = async () => {
    try {
        return await axios.get(`${API}products`,{withCredentials: true})
    } catch (e) {
        console.log({ e });
        return e;
    }
}

export const deleteProduct = async (userId) => {
    try {
        return await axios.delete(`${API}products/${userId}`, {withCredentials: true})
    } catch (e) {
        console.log({ e });
        return e;
    }
}
