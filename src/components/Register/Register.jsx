import { Link } from 'react-router-dom';
import '../SingIn/SignIn.css';

const Register = () => {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Register</h1>
                <form>
                    <div className="auth-field">
                        <label className="auth-label">Name</label>
                        <input className="auth-input" type="text" placeholder="Your name" />
                    </div>
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
                            <input className="btn-primary w-100" type="submit" value="Register" />
                        </Link>
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
