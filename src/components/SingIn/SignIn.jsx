import { Navigate, useNavigate, Link  } from 'react-router-dom';
import './SignIn.css';
import { useState } from 'react';




const SignIn = ({loadUser, user}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");;

    const navigate = useNavigate();

    
    if (user) {
        return <Navigate to="/" replace />;  // Redirect to home if already registered
    }
    
    const onSubmitSignIn = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/signin", {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })
        .then(response => {
             const status = response.status;
             return response.json().then(data => ({status, data}));
        })
        .then(({status, data}) => {
            if(status === 200) {
                console.log("Sign in Successful!");
                loadUser(data);
                navigate('/', { replace: true });
            } else {
                console.log("Sign in failed:", data);
                // TODO: Show error message to user
            }
        })
        .catch(error => console.error("Error:", error))
    }


    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Sign In</h1>
                <form>
                    <div className="auth-field">
                        <label className="auth-label">Email</label>
                        <input onChange = {(event) => { setEmail(event.target.value)}} className="auth-input" type="email" placeholder="yourname@example.com" />
                    </div>
                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input onChange = {(event) => { setPassword(event.target.value)}} className="auth-input" type="password" placeholder="••••••••" />
                    </div>
                    <div className="auth-submit"> {/* SigninButton */}
                            <button  onClick = {onSubmitSignIn} className="btn-primary w-100" value="Sign In" >Sign in</button>
                    </div>
                    <div className="auth-links">
                        <Link to="/register" className="auth-link">Register</Link>
                        <a href="#0" className="auth-link">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
