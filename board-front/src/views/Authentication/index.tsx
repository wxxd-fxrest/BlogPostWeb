import React, { useState } from 'react';
import './style.css';

// component: Auth Component
export default function Authentication() {
    // state: Screen state
    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

    // component: sign in card component
    const SignInCard = () => {
        // render: sign in card component Rendering
        return <div className="auth-card"></div>;
    };

    // component: sign up card component
    const SignUpCard = () => {
        // render: sign up card component Rendering
        return <div className="auth-card"></div>;
    };

    // render: Auth Component Rendering
    return (
        <div id="auth-wrapper">
            <div className="auth-container">
                <div className="auth-jumbotron-box">
                    <div className="auth-jumbotron-contents">
                        <div className="auth-logo-icon"></div>
                        <div className="auth-jumbotron-text-box">
                            <div className="auth-jumbotron-text">{'환영합니다.'}</div>
                            <div className="auth-jumbotron-text">{'HOONS BOARD입니다.'}</div>
                        </div>
                    </div>
                </div>
                {view === 'sign-in' && <SignInCard />}
                {view === 'sign-up' && <SignUpCard />}
            </div>
        </div>
    );
}
