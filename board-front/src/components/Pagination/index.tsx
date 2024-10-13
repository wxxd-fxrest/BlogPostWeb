import React, { Dispatch, SetStateAction } from 'react';
import './style.css';

// interface: pagination component properties
interface Props {
    currentPage: number;
    currentSection: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setCurrentSection: Dispatch<SetStateAction<number>>;
    viewPageList: number[];
    totalSection: number;
}

// component: Pagination Component
export default function Pagination(props: Props) {
    // state: properties
    const { currentPage, currentSection, viewPageList, totalSection } = props;
    const { setCurrentPage, setCurrentSection } = props;

    // event handler: page click event
    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };

    // event handler: previous page click event
    const onPreviousPageClickHandler = () => {
        console.log('pre');

        if (currentSection === 1) return;
        setCurrentPage((currentSection - 1) * 10);
        setCurrentSection(currentSection - 1);
    };

    // event handler: next page click event
    const onNextPageClickHandler = () => {
        console.log('next');

        if (currentSection === totalSection) return;
        setCurrentPage(currentSection * 10 + 1);
        setCurrentSection(currentSection + 1);
    };

    // render: Pagination Component Rendering
    return (
        <div id="paginaiton-wrapper">
            <div className="paginaiton-change-link-box" onClick={onPreviousPageClickHandler}>
                <div className="icon-box-small">
                    <div className="icon expand-left-icon"></div>
                </div>
                <div className="paginaiton-change-link-text">{'이전'}</div>
            </div>
            <div className="paginaiton-divider">{'|'}</div>
            {viewPageList.map((page, i) =>
                page === currentPage ? (
                    <div className="paginaiton-text-active" key={i}>
                        {page}
                    </div>
                ) : (
                    <div key={i} className="paginaiton-text" onClick={() => onPageClickHandler(page)}>
                        {page}
                    </div>
                )
            )}

            <div className="paginaiton-divider">{'|'}</div>
            <div className="paginaiton-change-link-box" onClick={onNextPageClickHandler}>
                <div className="paginaiton-change-link-text">{'다음'}</div>
                <div className="icon-box-small">
                    <div className="icon expand-right-icon"></div>
                </div>
            </div>
        </div>
    );
}
