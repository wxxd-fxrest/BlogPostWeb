import { signInRequest, signUpRequest } from 'apis';
import { SigninRequestDTO, SignupRequestDTO } from 'apis/request/auth';
import { ResponseDTO } from 'apis/response';
import { SigninResponseDTO, SignupResponseDTO } from 'apis/response/auth';
import InputBox from 'components/InputBox';
import { MAIN_PATH } from 'constant';
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
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
            signInRequest(requestBody).then(signInResponse);
        };

        // function: sign in response func
        const signInResponse = (responseBody: SigninResponseDTO | ResponseDTO | null) => {
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
        // state: page count state
        const [page, setPage] = useState<1 | 2>(1);

        // state: error state
        const [error, setError] = useState<boolean>(false);

        // state: input ref state
        const emailRef = useRef<HTMLInputElement | null>(null);
        const passwordRef = useRef<HTMLInputElement | null>(null);
        const passwordCheckRef = useRef<HTMLInputElement | null>(null);
        const nicknameRef = useRef<HTMLInputElement | null>(null);
        const telNumberRef = useRef<HTMLInputElement | null>(null);
        const addressRef = useRef<HTMLInputElement | null>(null);
        const addressDetailRef = useRef<HTMLInputElement | null>(null);

        // state: input state
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [passwordCheck, setPasswordCheck] = useState<string>('');
        const [nickname, setNickName] = useState<string>('');
        const [telNumber, setTelNumber] = useState<string>('');
        const [address, setAddress] = useState<string>('');
        const [addressDetail, setAddressDetail] = useState<string>('');

        // state: password etc state
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
        const [passwordIcon, setPasswordIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>(
            'eye-light-off-icon'
        );
        const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');
        const [passwordCheckIcon, setPasswordCheckIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>(
            'eye-light-off-icon'
        );

        // state: input error state
        const [isEmailError, setEmailError] = useState<boolean>(false);
        const [isPasswordError, setPasswordError] = useState<boolean>(false);
        const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);
        const [isNickNameError, setNickNameError] = useState<boolean>(false);
        const [isTelNumberError, setTelNumberError] = useState<boolean>(false);
        const [isAddressError, setAddressError] = useState<boolean>(false);
        const [isAgreedPersonalError, setAgreedPersonalError] = useState<boolean>(false);

        // state: error message state
        const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
        const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
        const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
        const [nickNameErrorMessage, setNickNameErrorMessage] = useState<string>('');
        const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');
        const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
        const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);

        // event handler: password hidden/show button click event
        const onPasswordButtonClickHandler = () => {
            if (passwordType === 'text') {
                setPasswordType('password');
                setPasswordIcon('eye-light-off-icon');
            } else {
                setPasswordType('text');
                setPasswordIcon('eye-light-on-icon');
            }
        };

        // event handler: check password hidden/show button click event
        const onCheckPasswordButtonClickHandler = () => {
            if (passwordCheckType === 'text') {
                setPasswordCheckType('password');
                setPasswordCheckIcon('eye-light-off-icon');
            } else {
                setPasswordCheckType('text');
                setPasswordCheckIcon('eye-light-on-icon');
            }
        };

        // event handler: email input kedown event
        const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!passwordRef.current) return;
            passwordRef.current.focus();
        };

        // event handler: passord input kedown event
        const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!passwordCheckRef.current) return;
            passwordCheckRef.current.focus();
        };

        // event handler: check passord input kedown event
        const onCheckPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            // if (!nicknameRef.current) return;
            onNextButtonClickHandler();
            // nicknameRef.current.focus();
        };

        // event handler: nickname input kedown event
        const onNickNameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!telNumberRef.current) return;
            telNumberRef.current.focus();
        };

        // event handler: telnumber input kedown event
        const onTelNumberKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            onAddressButtonClickHandler();
            // if (!addressRef.current) return;
            // addressRef.current.focus();
        };

        // event handler: address input kedown event
        const onAddressKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!addressDetailRef.current) return;
            addressDetailRef.current.focus();
        };

        // event handler: Address Detail input kedown event
        const onAddressDetailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            onSignUpButtonClickHandler();
        };

        // event handler: Email Change event
        const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setEmail(value);
            setEmailError(false);
            setEmailErrorMessage('');
        };

        // event handler: Password Change event
        const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setPassword(value);
            setPasswordError(false);
            setPasswordErrorMessage('');
        };

        // event handler: Check Password Change event
        const onCheckPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setPasswordCheck(value);
            setPasswordCheckError(false);
            setPasswordCheckErrorMessage('');
        };

        // event handler: NickName Change event
        const onNickNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setNickName(value);
            setNickNameError(false);
            setNickNameErrorMessage('');
        };

        // event handler: TelNumber Change event
        const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setTelNumber(value);
            setTelNumberError(false);
            setTelNumberErrorMessage('');
        };

        // event handler: Address Change event
        const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setAddress(value);
            setAddressError(false);
            setAddressErrorMessage('');
        };
        // event handler: AddressDetail Change event
        const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setAddressDetail(value);
        };

        // event handler: consent click envent
        const onAgreedPersonalClickHandler = () => {
            setAgreedPersonal(!agreedPersonal);
            setAgreedPersonalError(false);
        };

        // event handler: Next Page Button click event
        const onNextButtonClickHandler = () => {
            const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
            const isEmailPattern = emailPattern.test(email);
            if (!isEmailPattern) {
                setEmailError(true);
                setEmailErrorMessage('이메일 주소가 형식에 알맞지 않습니다.');
            }
            const isCheckPassword = password.trim().length >= 8;
            if (!isCheckPassword) {
                setPasswordError(true);
                setPasswordErrorMessage('비밀번호는 8자 이상 입력해 주세요.');
            }
            const isEqualPassword = password === passwordCheck;
            if (!isEqualPassword) {
                setPasswordCheckError(true);
                setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
            }
            if (!isEmailPattern || !isCheckPassword || !isEqualPassword) return;
            setPage(2);
        };

        // event handler: Signup Button click event
        const onSignUpButtonClickHandler = () => {
            const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
            const isEmailPattern = emailPattern.test(email);
            if (!isEmailPattern) {
                setEmailError(true);
                setEmailErrorMessage('이메일 주소가 형식에 알맞지 않습니다.');
            }
            const isCheckPassword = password.trim().length >= 8 && password.trim().length <= 20;
            if (!isCheckPassword) {
                setPasswordError(true);
                setPasswordErrorMessage('비밀번호는 8자 이상 / 20자 이하로 입력해 주세요.');
            }
            const isEqualPassword = password === passwordCheck;
            if (!isEqualPassword) {
                setPasswordCheckError(true);
                setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
            }

            if (!isEmailPattern || !isCheckPassword || !isEqualPassword) {
                setPage(1);
                return;
            }

            const hasNickName = nickname.trim().length > 0;
            if (!hasNickName) {
                setNickNameError(true);
                setNickNameErrorMessage('닉네임을 입력해 주세요.');
            }

            const telNumberPattern = /^[0-9]{11,13}$/;
            const isTelNumberPattern = telNumberPattern.test(telNumber);
            if (!isTelNumberPattern) {
                setTelNumberError(true);
                setTelNumberErrorMessage('숫자만 입력해 주세요.');
            }

            const hasAddress = address.trim().length > 0;
            if (!hasAddress) {
                setAddressError(true);
                setAddressErrorMessage('주소를 입력해 주세요.');
            }
            if (!agreedPersonal) setAgreedPersonalError(true);

            if (!hasNickName || !isTelNumberPattern || !agreedPersonal) return;

            const requestBody: SignupRequestDTO = {
                email,
                password,
                nickname,
                telNumber,
                address,
                addressDetail,
                agreedPersonal,
            };

            signUpRequest(requestBody).then(signUpResponse);
        };

        // function: sign up response func
        const signUpResponse = (responseBody: SignupResponseDTO | ResponseDTO | null) => {
            if (!responseBody) {
                alert('네트워크가 불안정합니다.');
                return;
            }

            const { code } = responseBody;
            if (code === 'DE') {
                setEmailError(true);
                setEmailErrorMessage('이미 존재하는 이메일 주소입니다.');
            }
            if (code === 'DN') {
                setNickNameError(true);
                setNickNameErrorMessage('이미 존재하는 닉네임입니다.');
            }
            if (code === 'DT') {
                setTelNumberError(true);
                setTelNumberErrorMessage('이미 존재하는 핸드폰 번호입니다.');
            }

            if (code === 'VF') alert('필수 항목을 모두 입력해 주세요.');
            if (code === 'DBE') alert('데이터 베이스 오류입니다. 다시 시도해 주세요.');

            if (code !== 'SU') return;

            setView('sign-in');
        };

        // event handler: sign-in link click envent
        const onSignInLinkClickHandler = () => {
            setView('sign-in');
        };

        // event handler: Address Button click event
        const onAddressButtonClickHandler = () => {
            open({ onComplete });
        };

        // function: Daum Post search pop up open func
        const open = useDaumPostcodePopup();

        // event handler: Daum Post search complete event
        const onComplete = (data: Address) => {
            const { address } = data;
            setAddress(address);
            setAddressError(false);
            setAddressErrorMessage('');
            if (!addressDetailRef.current) return;
            addressDetailRef.current.focus();
        };

        // effect: 두번째 페이지로 이동 시 실행 될 함수
        useEffect(() => {
            if (page === 2) {
                if (!nicknameRef.current) return;
                nicknameRef.current.focus();
            }
        }, [page]);

        // render: sign up card component Rendering
        return (
            <div className="auth-card">
                <div className="auth-card-box">
                    <div className="auth-card-top">
                        <div className="auth-card-title-box">
                            <div className="auth-card-title">{'회원가입'}</div>
                            <div className="auth-card-page">{`${page}/2`}</div>
                        </div>
                        {page === 1 && (
                            <>
                                <InputBox
                                    ref={emailRef}
                                    label="이메일"
                                    type="text"
                                    placeholder="이메일을 입력해 주세요."
                                    value={email}
                                    error={isEmailError}
                                    message={emailErrorMessage}
                                    onChange={onEmailChangeHandler}
                                    onKeyDown={onEmailKeyDownHandler}
                                />
                                <InputBox
                                    ref={passwordRef}
                                    label="비밀번호"
                                    type={passwordType}
                                    icon={passwordIcon}
                                    placeholder="비밀번호를 입력해 주세요."
                                    value={password}
                                    error={isPasswordError}
                                    message={passwordErrorMessage}
                                    onChange={onPasswordChangeHandler}
                                    onButtonClick={onPasswordButtonClickHandler}
                                    onKeyDown={onPasswordKeyDownHandler}
                                />
                                <InputBox
                                    ref={passwordCheckRef}
                                    label="비밀번호 확인"
                                    type={passwordCheckType}
                                    icon={passwordCheckIcon}
                                    placeholder="비밀번호를 확인해 주세요."
                                    value={passwordCheck}
                                    error={isPasswordCheckError}
                                    message={passwordCheckErrorMessage}
                                    onChange={onCheckPasswordChangeHandler}
                                    onButtonClick={onCheckPasswordButtonClickHandler}
                                    onKeyDown={onCheckPasswordKeyDownHandler}
                                />
                            </>
                        )}

                        {page === 2 && (
                            <>
                                <InputBox
                                    ref={nicknameRef}
                                    label="* 닉네임"
                                    type="text"
                                    placeholder="닉네임을 입력해 주세요."
                                    value={nickname}
                                    error={isNickNameError}
                                    message={nickNameErrorMessage}
                                    onChange={onNickNameChangeHandler}
                                    onKeyDown={onNickNameKeyDownHandler}
                                />
                                <InputBox
                                    ref={telNumberRef}
                                    label="* 전화번호"
                                    type="text"
                                    placeholder="전화번호를 입력해 주세요."
                                    value={telNumber}
                                    error={isTelNumberError}
                                    message={telNumberErrorMessage}
                                    onChange={onTelNumberChangeHandler}
                                    onKeyDown={onTelNumberKeyDownHandler}
                                />
                                <InputBox
                                    ref={addressRef}
                                    label="* 주소"
                                    type="text"
                                    icon="expand-right-light-icon"
                                    placeholder="주소를 입력해 주세요."
                                    value={address}
                                    error={isAddressError}
                                    message={addressErrorMessage}
                                    onChange={onAddressChangeHandler}
                                    onButtonClick={onAddressButtonClickHandler}
                                    onKeyDown={onAddressKeyDownHandler}
                                />
                                <InputBox
                                    ref={addressDetailRef}
                                    label="상세 주소"
                                    type="text"
                                    placeholder="상세 주소를 입력해 주세요."
                                    value={addressDetail}
                                    error={false}
                                    onChange={onAddressDetailChangeHandler}
                                    onKeyDown={onAddressDetailKeyDownHandler}
                                />
                            </>
                        )}
                    </div>
                    <div className="auth-card-bottom">
                        {page === 1 && (
                            <div className="black-large-full-button" onClick={onNextButtonClickHandler}>
                                {'다음 단계'}
                            </div>
                        )}
                        {page === 2 && (
                            <>
                                <div className="auth-consent-box">
                                    <div className="auth-check-box" onClick={onAgreedPersonalClickHandler}>
                                        <div
                                            className={`icon ${
                                                agreedPersonal ? 'check-round-fill-icon' : 'check-ring-light-icon'
                                            }`}
                                        ></div>
                                    </div>
                                    <div
                                        className={
                                            isAgreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'
                                        }
                                    >
                                        {'개인정보 동의'}
                                    </div>
                                    <div className="auth-consent-link">{'더보기 >'}</div>
                                </div>
                                <div className="black-large-full-button" onClick={onSignUpButtonClickHandler}>
                                    {'회원가입'}
                                </div>
                            </>
                        )}

                        <div className="auth-description-box">
                            <div className="auth-description">
                                {'이미 계정이 있으신가요? '}
                                <span className="auth-description-link" onClick={onSignInLinkClickHandler}>
                                    {' 로그인'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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
