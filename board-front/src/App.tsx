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
import User from 'views/User';
import './App.css';

// component: Application Coponent
function App() {
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
                <Route path={MAIN_PATH} element={<Main />} />
                <Route path={AUTH_PATH} element={<Authentication />} />
                <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
                <Route path={USER_PATH(':useremail')} element={<User />} />
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
