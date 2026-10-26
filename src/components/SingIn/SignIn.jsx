import { Navigate, useNavigate, Link  } from 'react-router-dom';
import './SignIn.css';
import Brand from '../brand/Brand';
import { useState } from 'react';




const SignIn = ({loadUser, user}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");;
    const [error, setError] = useState("");

    const navigate = useNavigate();

    
    if (user) {
        return <Navigate to="/" replace />;  // Redirect to home if already registered
    }
    
    const onSubmitSignIn = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/signin`, {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            const status = response.status;
            // not every error comes back as JSON (e.g. a proxy or rate limiter), so fall back to plain text
            return response.text().then(text => {
                try {
                    return { status, data: JSON.parse(text) };
                } catch {
                    return { status, data: text };
                }
            });
        })
        .then(({status, data}) => {
            if(status === 200) {
                console.log("[FRONTEND] Sign in Successful!");
                setError(""); // clear any previous errors
                loadUser(data);
                navigate('/', { replace: true });
            } else {
                console.log("[FRONTEND] Sign in failed:", data);
                // backend returns {error: 'message'} so extract the message
                setError(typeof data === 'string' ? data : data.error || 'Sign in failed');
            }
        })
        .catch(error => {
            console.error("Error signing in:", error);
            setError("Can't reach the server. Please try again in a moment.");
        })
    }


    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <Brand compact />
                </div>
                <h1 className="auth-title">Sign In</h1>
                <p className="auth-subtitle">
                    SmartBrain finds and highlights every person in a photo. Sign in to try it.
                </p>
                {error && (
                    <div className="message message-error auth-error" role="alert">
                        {error}
                    </div>
                )}
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
