import { Link } from 'react-router';
import './SignIn.css';

const SignIn = () => {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Sign In</h1>
                <form>
                    <div className="auth-field">
                        <label className="auth-label">Email</label>
                        <input className="auth-input" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input className="auth-input" type="password" placeholder="••••••••" />
                    </div>
                    <div className="auth-submit">
                        <Link to="/">
                            <input className="btn-primary w-100" type="submit" value="Sign In" />
                        </Link>
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
