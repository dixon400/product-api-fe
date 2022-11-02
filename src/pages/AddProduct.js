import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from '../api/apiAdmin';


const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        brand: '',
        categories: [],
        category: '',
        error: '',
        createdProduct: '',
        formData: ''
    });

    const {
        name,
        description,
        price,
        brand,
        categories,
        category,
        error,
        createdProduct,
        formData,
    } = values;

    const {user} = isAuthenticated();

    const handleChange = name => event => {
        const value  = event.target.value;
        formData.append(name, value);
        setValues({ ...values, [name]: value });
    };

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);


    const clickSubmit =async event => {
        event.preventDefault();
        setValues({ ...values, error: ''});
       console.log({values});
        const resp = await createProduct(user.id, values)
        if (  resp.data.error || resp.status == 400) {
            setValues({ ...values, error: resp.data.error });
        } else {
            setValues({
                ...values,
                name: '',
                description: '',
                image: '',
                price: '',
                createdProduct: resp.data.name
            });
        };
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Create Product</h4>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Brand</label>
                <input onChange={handleChange('brand')} type="text" className="form-control" value={brand} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>


            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );


    return (
        <Layout
        title="Add a new product"
        description={new Date().getHours() >= 12 ? `Good Afternoon ${user.name}, ready to add a new category?`: `Good Morning ${user.name}, ready to add a new category?`}
    >
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newPostForm()}
            </div>
        </div>
    </Layout>
    )
}

export default AddProduct;