import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ SignedIn, onSignedInChange, resetUser }) => {
    const linkStyle = {
        textDecoration: 'none',
        color: 'black', // Default color
    };

    if (SignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    onClick={() => {
                        resetUser();
                        onSignedInChange();
                    }}
                    className="f3 link dim underline pa3 pointer"
                >
                    <Link to="/signin" style={linkStyle}>
                        Sign out
                    </Link>
                </p>
            </nav>
        );
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className="f3 link dim underline pa3 pointer">
                    <Link to="/signin" style={linkStyle}>
                        Sign In
                    </Link>
                </p>
                <p className="f3 link dim underline pa3 pointer">
                    <Link to="/register" style={linkStyle}>
                        Register
                    </Link>
                </p>
            </nav>
        );
    }
};

export default Navigation;
