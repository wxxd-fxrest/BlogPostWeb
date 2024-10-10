import { Route, Routes } from 'react-router-dom';
import {
    AUTH_PATH,
    MAIN_PATH,
    SEARCH_PATH,
    USER_PATH,
    BOARD_PATH,
    BOARD_WRITE_PATH,
    BOARD_DETAIL_PATH,
    BOARD_UPDATE_PATH,
} from 'constant';
import Container from 'layouts/Container';
import Authentication from 'views/Authentication';
import BoardDetail from 'views/Board/Detail';
import BoardUpdate from 'views/Board/Update';
import BoardWrite from 'views/Board/Write';
import Main from 'views/Main';
import Search from 'views/Search';
import UserPage from 'views/User';
import './App.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { GetSignInUserRequest } from 'apis';
import { GetSignInUserResponseDTO } from 'apis/response/user';
import { ResponseDTO } from 'apis/response';
import { User } from 'types/inderface';

// component: Application Coponent
function App() {
    // state: login user state
    const { setLoginUser, resetLoginUser } = useLoginUserStore();

    // state: cookie state
    const [cookies, setCookie] = useCookies();

    // function: get sign in user response func
    const GetSignInUserResponse = (responseBody: GetSignInUserResponseDTO | ResponseDTO | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'AF' || code === 'NU' || code === 'DBE') {
            resetLoginUser();
            return;
        }
        const loginUser: User = { ...(responseBody as GetSignInUserResponseDTO) };
        setLoginUser(loginUser);
    };

    // effect: asscessToken cookie 값 변경 시 실행 될 effect
    useEffect(() => {
        if (!cookies.accessToken) {
            resetLoginUser();
            return;
        }
        GetSignInUserRequest(cookies.accessToken).then(GetSignInUserResponse);
    }, [cookies.accessToken]);

    // render: Application Component Rendering
    // description: Main Screen| '/' -Main
    // description: Login + Signup Screen| '/auth' -Authentication
    // description: Search Screen| '/search/:word' -Search
    // description: User Screen| 'user/:userEmail' -User
    // description: Post Detail Screen| 'board/detail/:boardNumber' -BoardDetail
    // description: Post Write Screen| 'board/write' -BoardWrite
    // description: Post Edit Screen| 'board/update' -BoardUpdate
    return (
        <Routes>
            <Route element={<Container />}>
                <Route path={MAIN_PATH()} element={<Main />} />
                <Route path={AUTH_PATH()} element={<Authentication />} />
                <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
                <Route path={USER_PATH(':useremail')} element={<UserPage />} />
                <Route path={BOARD_PATH()}>
                    <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
                    <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
                    <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
                </Route>
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
