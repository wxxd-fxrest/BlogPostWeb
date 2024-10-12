import { fileUploadRequest, postBoardRequest } from 'apis';
import { PostBoardRequestDTO } from 'apis/request/baord';
import { ResponseDTO } from 'apis/response';
import { PostBoardResponseDTO } from 'apis/response/board';
import {
    AUTH_PATH,
    BOARD_DETAIL_PATH,
    BOARD_PATH,
    BOARD_UPDATE_PATH,
    BOARD_WRITE_PATH,
    MAIN_PATH,
    SEARCH_PATH,
    USER_PATH,
} from 'constant';
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useBoardStore, useLoginUserStore } from 'stores';
import './style.css';

// component: Header Layout
export default function Header() {
    // state: Login User state
    const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();

    // state: cookie state
    const [cookies, setCookies] = useCookies();

    // state: Login state
    const [isLogin, setLogin] = useState<boolean>(false);

    // state: path state
    const { pathname } = useLocation();

    // state: path page state
    const [isAuthPage, setAuthPage] = useState<boolean>(false);
    const [isMainPage, setMainPage] = useState<boolean>(false);
    const [isSearchPage, setSearchPage] = useState<boolean>(false);
    const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
    const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
    const [isBoardUpdatePage, setBoardUpadatePage] = useState<boolean>(false);
    const [isUserPage, setUserPage] = useState<boolean>(false);

    // function: navigate func
    const navigator = useNavigate();

    // event handler: Logo click event
    const onLogoClickHandleer = () => {
        navigator(MAIN_PATH());
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
            navigator(SEARCH_PATH(word));
        };

        // effect: Search Word path variable Change func
        useEffect(() => {
            if (searchWord) {
                setWord(searchWord);
                setStatus(true);
            }
        }, [searchWord]);

        // effect: Login User 변경 시 실행 될 effect
        useEffect(() => {
            setLogin(loginUser !== null);
        }, [loginUser]);

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
        const { useremail } = useParams();

        // event handler: MyPage Button Click func
        const onMyPageButtonClickHandler = () => {
            if (!loginUser) return;
            const { email } = loginUser;
            navigator(USER_PATH(email));
        };

        // event handler: SignIn Button Click func
        const onSignInButtonClickHandler = () => {
            navigator(AUTH_PATH());
        };

        // event handler: SignOut Button Click func
        const onSignOutButtonClickHandler = () => {
            resetLoginUser();
            setCookies('accessToken', '', { path: MAIN_PATH(), expires: new Date() });
            navigator(MAIN_PATH());
        };

        if (isLogin && useremail === loginUser?.email)
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
                    {'마이페이지'}
                </div>
            );
        return (
            // render: SignIn Button Component Rendering -> false
            <div className="black-button" onClick={onSignInButtonClickHandler}>
                {'로그인'}
            </div>
        );
    };

    // component: Upload Button Component
    const Uploadbutton = () => {
        // state: 게시글 상태
        const { title, content, boardImageFileList, resetBoard } = useBoardStore();

        // event handler: board upload button click event
        const onUploadButtonClickHandler = async () => {
            const accessToken = cookies.accessToken;
            if (!accessToken) return;

            const boardImageList: string[] = [];
            for (const file of boardImageFileList) {
                const data = new FormData();
                data.append('file', file);

                const url = await fileUploadRequest(data);
                if (url) boardImageList.push(url);
            }

            const requestBody: PostBoardRequestDTO = {
                title,
                content,
                boardImageList,
            };
            postBoardRequest(requestBody, accessToken).then(poseBoardResponse);
        };

        // function: post board response func
        const poseBoardResponse = (responseBody: PostBoardResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code === 'AF' || code === 'NU') navigator(AUTH_PATH());
            if (code === 'VF') alert('제목과 내용은 필수사항 입니다.');
            if (code !== 'SU') return;

            resetBoard();
            if (!loginUser) return;
            const { email } = loginUser;
            navigator(USER_PATH(email));
        };

        // render: Upload Button Component Rendering
        if (title && content)
            return (
                <div className="black-button" onClick={onUploadButtonClickHandler}>
                    {'업로드'}
                </div>
            );
        // render: Upload 불가 Button Component Rendering
        return <div className="disable-button">{'업로드'}</div>;
    };

    // effect: path 변경 시 실행될 func
    useEffect(() => {
        const isAuthPage = pathname.startsWith(AUTH_PATH());
        setAuthPage(isAuthPage);
        const isMainPage = pathname === MAIN_PATH();
        setMainPage(isMainPage);
        const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
        setSearchPage(isSearchPage);
        const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
        setBoardDetailPage(isBoardDetailPage);
        const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
        setBoardWritePage(isBoardWritePage);
        const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
        setBoardUpadatePage(isBoardUpdatePage);
        const isUserPage = pathname.startsWith(USER_PATH(''));
        setUserPage(isUserPage);
    }, [pathname]);

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
                    {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
                    {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <LoginMyPageButton />}
                    {(isBoardWritePage || isBoardUpdatePage) && <Uploadbutton />}
                </div>
            </div>
        </div>
    );
}
