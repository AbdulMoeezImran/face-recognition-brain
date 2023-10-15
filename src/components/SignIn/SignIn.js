import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const SignIn = ({ LoadUser, onSignedInChange }) => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const navigate = useNavigate();

    const EmailChange = (event) => {
        setSignInEmail(event.target.value);
    };

    const PasswordChange = (event) => {
        setSignInPassword(event.target.value);
    };

    const SubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    LoadUser(user);
                    navigate('/');
                    onSignedInChange();
                } else {
                    alert('Error signing in, please try again');
                }
            });
    };


    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                onChange={EmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={PasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={SubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="button"
                            value="Sign in"
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p className="pointer f6 link dim black db">
                            <Link to="/register" style={{ color: 'black' }}>Register</Link>
                        </p>
                    </div>
                </div>
            </main>
        </article>
    );

}

export default SignIn;
