import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoginUserStore } from 'stores';
import './style.css';

// component: Header Layout
export default function Header() {
    // state: Login User state
    const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();

    // state: cookie state
    const [cookies, setCookies] = useCookies();

    // state: Login state
    const [isLogin, setLogin] = useState<boolean>(false);

    // function: navigate func
    const navigate = useNavigate();

    // event handler: Logo click event
    const onLogoClickHandleer = () => {
        navigate(MAIN_PATH);
    };

    // component: Search Button Component
    const SearchButton = () => {
        // state: Search Button 요소 참조 State
        const searchButtonRef = useRef<HTMLDivElement | null>(null);
        // state: Search Button State
        const [status, setStatus] = useState<boolean>(false);
        // state: Search Word Button State
        const [word, setWord] = useState<string>('');
        // state: Search Word path variable State
        const { searchWord } = useParams();

        // event handler: Search Word Change Event
        const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setWord(value);
        };

        // event handler: Search Word Key Event
        const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!searchButtonRef.current) return;
            searchButtonRef.current.click();
        };

        // event handler: Search Button Click Event func
        const onSearchButtonClickHandler = () => {
            if (!status) {
                setStatus(!status);
                return;
            }
            navigate(SEARCH_PATH(word));
        };

        // effect: Search Word path variable Change func
        useEffect(() => {
            if (searchWord) {
                setWord(searchWord);
                setStatus(true);
            }
        }, [searchWord]);

        if (!status) {
            // render: Search Button Rendering -> false
            return (
                <div className="icon-button" onClick={onSearchButtonClickHandler}>
                    <div className="icon search-light-icon"></div>
                </div>
            );
        } else {
            // render: Search Button Rendering -> true
            return (
                <div className="header-search-input-box">
                    <input
                        type="text"
                        className="header-search-input"
                        placeholder="검색어를 입력해 주세요."
                        value={word}
                        onChange={onSearchWordChangeHandler}
                        onKeyDown={onSearchWordKeyDownHandler}
                    />
                    <div ref={searchButtonRef} className="icon-button" onClick={onSearchButtonClickHandler}>
                        <div className="icon search-light-icon"></div>
                    </div>
                </div>
            );
        }
    };

    // component: SignIn & MyPage Component
    const LoginMyPageButton = () => {
        // state: userEmail path variable state
        const { userEmail } = useParams();

        // event handler: MyPage Button Click func
        const onMyPageButtonClickHandler = () => {
            if (!loginUser) return;
            const { email } = loginUser;
            navigate(USER_PATH(email));
        };

        // event handler: SignIn Button Click func
        const onSignInButtonClickHandler = () => {
            navigate(AUTH_PATH);
        };

        // event handler: SignOut Button Click func
        const onSignOutButtonClickHandler = () => {
            resetLoginUser();
            navigate(MAIN_PATH);
        };

        if (isLogin && userEmail === loginUser?.email)
            // render: Logout Button Component Rendering
            return (
                <div className="white-button" onClick={onSignOutButtonClickHandler}>
                    {'로그아웃'}
                </div>
            );
        if (isLogin)
            // render: Login Button Component Rendering -> true
            return (
                <div className="white-button" onClick={onMyPageButtonClickHandler}>
                    {'My page'}
                </div>
            );
        return (
            // render: SignIn Button Component Rendering -> false
            <div className="black-button" onClick={onSignInButtonClickHandler}>
                {'로그인'}
            </div>
        );
    };

    // render: Header Layout Rendering
    return (
        <div id="header">
            <div className="header-container">
                <div className="header-left-box" onClick={onLogoClickHandleer}>
                    <div className="icon-box">
                        <div className="icon logo-dark-icon"></div>
                    </div>
                    <div className="header-logo">{'Hoons Board'}</div>
                </div>
                <div className="header-right-box">
                    <SearchButton />
                    <LoginMyPageButton />
                </div>
            </div>
        </div>
    );
}
