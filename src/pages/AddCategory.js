import React, { useState } from "react";
import Layout from "../components/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "../api/apiAdmin";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user } = isAuthenticated();
    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = async e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        console.log({name});
        // make request to api to create category
       const resp = await createCategory(user.id, name)
       console.log({resp});
            if (  resp.data.error || resp.status == 400) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
            };
    };

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add a new category"
            description={new Date().getHours() >= 12 ? `Good Afternoon ${user.name}, ready to add a new category?`: `Good Morning ${user.name}, ready to add a new category?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFom()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );

};

export default AddCategory;