import InputBox from 'components/InputBox';
import React, { KeyboardEvent, useRef, useState } from 'react';
import './style.css';

// component: Auth Component
export default function Authentication() {
    // state: Screen state
    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

    // component: sign in card component
    const SignInCard = () => {
        // state: error state
        const [error, setError] = useState<boolean>(false);

        // state: input ref state
        const emailRef = useRef<HTMLInputElement | null>(null);
        const passwordRef = useRef<HTMLInputElement | null>(null);

        // state: input state
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');

        // state: password etc state
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
        const [passwordIcon, setPasswordIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>(
            'eye-light-off-icon'
        );

        // event handler: password hidden/show button click event func
        const onPasswordButtonClickHandler = () => {
            if (passwordType === 'text') {
                setPasswordType('password');
                setPasswordIcon('eye-light-off-icon');
            } else {
                setPasswordType('text');
                setPasswordIcon('eye-light-on-icon');
            }
        };

        // event handler: email input kedown event func
        const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!passwordRef.current) return;
            passwordRef.current.focus();
        };

        // event handler: passord input kedown event func
        const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            onSignInButtonClickHandler();
        };

        // event handler: Login Button click event func
        const onSignInButtonClickHandler = () => {
            console.log('로그인 버튼 클릭클릭');
        };

        // event handler: sign-up link click envent func
        const onSignUpLinkClickHandler = () => {
            setView('sign-up');
        };

        // render: sign in card component Rendering
        return (
            <div className="auth-card">
                <div className="auth-card-box">
                    <div className="auth-card-top">
                        <div className="auth-card-title-box">
                            <div className="auth-card-title">{'로그인'}</div>
                        </div>
                        <InputBox
                            ref={emailRef}
                            label="이메일"
                            type="text"
                            placeholder="이메일을 입력해 주세요."
                            error={error}
                            value={email}
                            setValue={setEmail}
                            onKeyDown={onEmailKeyDownHandler}
                        />
                        <InputBox
                            ref={passwordRef}
                            label="비밀번호"
                            type={passwordType}
                            placeholder="비밀번호를 입력해 주세요."
                            error={error}
                            value={password}
                            setValue={setPassword}
                            icon={passwordIcon}
                            onButtonClick={onPasswordButtonClickHandler}
                            onKeyDown={onPasswordKeyDownHandler}
                        />
                    </div>
                    <div className="auth-card-bottom">
                        {error && (
                            <div className="auth-sign-in-error-box">
                                <div className="auth-sign-in-error-message">
                                    {'이메일 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해 주세요.'}
                                </div>
                            </div>
                        )}
                        <div className="black-large-full-button" onClick={onSignInButtonClickHandler}>
                            {'로그인'}
                        </div>
                        <div className="auth-description-box">
                            <div className="auth-description">
                                {'신규 사용자이신가요? '}
                                <span className="auth-description-link" onClick={onSignUpLinkClickHandler}>
                                    {' 회원가입'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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
