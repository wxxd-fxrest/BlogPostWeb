import { Outlet, useLocation } from 'react-router-dom';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import './style.css';
import { AUTH_PATH } from 'constant';

// component: Layout
export default function Container() {
    // state: 현재 페이지 path name state
    const { pathname } = useLocation();

    // render: Layout Rendering
    return (
        <>
            <Header />
            <Outlet />
            {pathname !== AUTH_PATH() && <Footer />}
        </>
    );
}
