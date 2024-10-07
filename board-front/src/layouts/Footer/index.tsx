import React from 'react';
import './style.css';

// component: Footer Layout
export default function Footer() {
    // event handler: Insta Icon Button Click Event
    const onInstaIconButtonClickHandler = () => {
        window.open('https://www.instagram.com');
    };

    // event handler: Naver Icon Button Click Event
    const onNaverIconButtonClickHandler = () => {
        window.open('https://blog.naver.com');
    };

    // render: Footer Layout Rendering
    return (
        <div id="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-logo-box">
                        <div className="icon-box">
                            <div className="icon logo-light-icon"></div>
                        </div>
                        <div className="footer-logo-text">{'Hoons Board'}</div>
                    </div>
                    <div className="footer-link-box">
                        <div className="footer-email-link">{'lacls159@gmail.com'}</div>
                        <div className="icon-button" onClick={onInstaIconButtonClickHandler}>
                            <div className="icon insta-icon"></div>
                        </div>
                        <div className="icon-button" onClick={onNaverIconButtonClickHandler}>
                            <div className="icon naver-blog-icon"></div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-copyright">{'Copyright © 2022 Jukoyakki. All Rights Reserved.'}</div>
                </div>
            </div>
        </div>
    );
}
