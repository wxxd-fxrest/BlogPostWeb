import { signInRequest } from 'apis';
import { SigninRequestDTO } from 'apis/request/auth';
import { ResponseDTO } from 'apis/response';
import { SigninResponseDTO } from 'apis/response/auth';
import InputBox from 'components/InputBox';
import { MAIN_PATH } from 'constant';
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './style.css';

// component: Auth Component
export default function Authentication() {
    // function: useNavigate()
    const navigator = useNavigate();

    // state: screen state
    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

    // state: cookies state
    const [cookies, setCookie] = useCookies();

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

        // event handler: Email Change event func
        const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setEmail(value);
        };

        // event handler: Password Change event func
        const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setPassword(value);
        };

        // event handler: Login Button click event func
        const onSignInButtonClickHandler = () => {
            const requestBody: SigninRequestDTO = { email, password };
            console.log(requestBody);
            signInRequest(requestBody).then(signinResponse);
        };

        // function: sign in response func
        const signinResponse = (responseBody: SigninResponseDTO | ResponseDTO | null) => {
            if (!responseBody) {
                alert('네트워크가 불안정합니다.');
                return;
            }

            const { code } = responseBody;
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code === 'SF' || code === 'VF') setError(true);
            if (code !== 'SU') return;

            const { token, expirationTime } = responseBody as SigninResponseDTO;
            const now = new Date().getTime();
            const expires = new Date(now + expirationTime * 1000);

            setCookie('accessToken', token, { expires, path: MAIN_PATH() });
            navigator(MAIN_PATH());
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
                            onChange={onEmailChangeHandler}
                            onKeyDown={onEmailKeyDownHandler}
                        />
                        <InputBox
                            ref={passwordRef}
                            label="비밀번호"
                            type={passwordType}
                            placeholder="비밀번호를 입력해 주세요."
                            error={error}
                            value={password}
                            onChange={onPasswordChangeHandler}
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
