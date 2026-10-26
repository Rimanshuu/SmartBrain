import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './UserMenu.css';

// account dropdown: shows the user's count, plus reset and sign out
const UserMenu = ({ user, onResetClick, onSignOut }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // close when clicking anywhere else or pressing Escape
    useEffect(() => {
        if (!open) return;

        const onPointerDown = (event) => {
            if (!menuRef.current?.contains(event.target)) setOpen(false);
        };
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    const count = Number(user.entries);
    const initial = user.name?.trim()?.[0]?.toUpperCase() || '?';

    return (
        <div className="user-menu" ref={menuRef}>
            <button
                className="nav-pill user-menu-button"
                onClick={() => setOpen(prev => !prev)}
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <span className="user-avatar" aria-hidden="true">{initial}</span>
                <span className="user-menu-name">{user.name}</span>
                <span className={`user-menu-chevron ${open ? 'open' : ''}`} aria-hidden="true">▾</span>
            </button>

            {open && (
                <div className="user-menu-dropdown" role="menu">
                    <div className="user-menu-header">
                        <p className="user-menu-title">{user.name}</p>
                        {user.email && <p className="user-menu-email">{user.email}</p>}
                    </div>

                    <div className="user-menu-stat">
                        <span className="user-menu-stat-value">{count}</span>
                        <span className="user-menu-stat-label">{count === 1 ? 'person' : 'people'} found so far</span>
                    </div>

                    <div className="user-menu-divider" />

                    <button
                        role="menuitem"
                        className="user-menu-item user-menu-danger"
                        onClick={() => { setOpen(false); onResetClick(); }}
                        disabled={count === 0}
                    >
                        Reset count
                    </button>
                    <Link
                        role="menuitem"
                        to="/signin"
                        className="user-menu-item"
                        onClick={onSignOut}
                    >
                        Sign out
                    </Link>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
