import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import '../SingIn/SignIn.css';

const Register = ({loadUser, user}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    if(user) {
        return <Navigate to='/' replace />
    }
    const onSubmitRegister = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/register", {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({ name, email, password })
        })
        .then(response => {
            const status = response.status;
            return response.json().then(data => ({status, data}));
        })
        .then(({status, data}) => {
            if(status === 200) {
                console.log("[FRONTEND] User Registeration Successful!");
                setError(""); // clear any previous errors
                loadUser(data);
                navigate('/', { replace: true });
            } else {
                console.log("[FRONTEND]  User Registeration failed:", data);
                // backend returns {error: 'message'} so extract the message
                setError(typeof data === 'string' ? data : data.error || 'Registration failed');
            }
        })
        .catch(error => console.error("Error:", error))
    } 

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Register</h1>
                {error && (
                    <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px', fontSize: '14px' }}>
                        {error}
                    </div>
                )}
                <form onSubmit = {onSubmitRegister}>
                    <div className="auth-field">
                        <label className="auth-label">Name</label>
                        <input onChange={(e) => {setName(e.target.value)}} className="auth-input" type="text" placeholder="Your name" />
                    </div>
                    <div className="auth-field">
                        <label className="auth-label">Email</label>
                        <input onChange={(e) => {setEmail(e.target.value)}} className="auth-input" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input onChange={(e) => {setPassword(e.target.value)}}className="auth-input" type="password" placeholder="••••••••" />
                    </div>
                    <div className="auth-submit">
                        <button className="btn-primary w-100"  type="submit">Register</button>
                    </div>
                    <div className="auth-links">
                        <Link to="/signin" className="auth-link">Already have an account? Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
