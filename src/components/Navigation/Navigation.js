import React from 'react';

const Navigation = ({ RouteChange, SignedIn }) => {
    if (SignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => RouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => RouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => RouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        )
    }

}

export default Navigation;