import React, { useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import Layout from '../components/Layout';
import { signin,authenticate, isAuthenticated } from '../auth';
const Login = () => {
    const [email, setEmail] = useState("");
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const resp = await signin(email);
        console.log({resp})
        if(resp && resp.data){
            localStorage.setItem("authenticated", true);
            authenticate(resp.data);
            navigate('/');
            
        }
        else {
            setError(resp.response.data.error);   
        }
    }

    const signInForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" value={email} />
            </div>

            <button onClick={handleSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const redirectUser = () => {
        if(isAuthenticated()){
            return <Navigate to = "/" />
        }
    }
    return (

        <Layout
        title="Login"
        description="Login to Product App"
        className="container col-md-8 offset-md-2"
    >
        {showError()}
        {signInForm()}
        {redirectUser()}
    </Layout>
        
    );
}

export default Login