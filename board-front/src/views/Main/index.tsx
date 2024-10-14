import { getLatestBoardListRequest, getPopularWordListRequest, getTop3BoardListRequest } from 'apis';
import { ResponseDTO } from 'apis/response';
import { GetLatestBoardListResponseDTO, GetTop3BoardListResponseDTO } from 'apis/response/board';
import { GetPopularWordListResponseDTO } from 'apis/response/search';
import BoardItem from 'components/BoardItem';
import Pagination from 'components/Pagination';
import Top3Item from 'components/Top3Item';
import { SEARCH_PATH } from 'constant';
import { usePagination } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardListItem } from 'types/inderface';
import './style.css';

// component: Main Component
export default function Main() {
    // function: useNavigate()
    const navigator = useNavigate();

    // component: Main Top Component
    const MainTop = () => {
        // state: top3 list state
        const [top3BaordList, setTop3BaordList] = useState<BoardListItem[]>([]);

        // function: get top3 board list response
        const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            const { top3list } = responseBody as GetTop3BoardListResponseDTO;
            setTop3BaordList(top3list);
        };

        // effect: first rendering 시 실행 될 effect
        useEffect(() => {
            getTop3BoardListRequest().then(getTop3BoardListResponse);
        }, []);

        // render: Main Top Component Rendering
        return (
            <div id="main-top-wrapper">
                <div className="main-top-container">
                    <div className="main-top-title">{'Hoons Board에서 \n다양한 이야기를 나눠보세요.'}</div>
                    <div className="main-top-contents-box">
                        <div className="main-top-contents-title"></div>
                        <div className="main-top-contents">
                            {top3BaordList.map((item, i) => (
                                <Top3Item key={i} top3ListItem={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // component: Main Bottom Component
    const MainBottom = () => {
        // state pagination ref state
        const {
            currentPage,
            currentSection,
            viewList,
            viewPageList,
            totalSection,
            setCurrentPage,
            setCurrentSection,
            setTotalList,
        } = usePagination<BoardListItem>(10);

        // state: latest/popular list state (임시)
        const [popularWordList, setPopularWordList] = useState<string[]>([]);

        // function: get latest board list response
        const getLatestBoardListResponse = (responseBody: GetLatestBoardListResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            const { latestList } = responseBody as GetLatestBoardListResponseDTO;
            setTotalList(latestList);
        };

        // function: get popular word list response
        const getPopularWordListResponse = (responseBody: GetPopularWordListResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            const { popularwordList } = responseBody as GetPopularWordListResponseDTO;
            setPopularWordList(popularwordList);
        };

        // event handler: popular word click event
        const onPopularWordClickHandler = (word: string) => {
            navigator(SEARCH_PATH(word));
        };

        // effect: first rendering 시 실행 될 effect
        useEffect(() => {
            getLatestBoardListRequest().then(getLatestBoardListResponse);
            getPopularWordListRequest().then(getPopularWordListResponse);
        }, []);

        // render: Main Bottom Component Rendering
        return (
            <div id="main-bottom-wrapper">
                <div className="main-bottom-container">
                    <div className="main-bottom-title">{'최신 게시글'}</div>
                    <div className="main-bottom-content-box">
                        <div className="main-bottom-latest-content">
                            {viewList.map((item, i) => (
                                <BoardItem key={i} boardListItem={item} />
                            ))}
                        </div>
                        <div className="main-bottom-popular-box">
                            <div className="main-bottom-popular-card">
                                <div className="main-bottom-popular-card-box">
                                    <div className="main-bottom-popular-card-title">{'인기 검색어'}</div>
                                    <div className="main-bottom-popular-card-contents">
                                        {popularWordList.map((item, i) => (
                                            <div
                                                className="word-badge"
                                                key={i}
                                                onClick={() => onPopularWordClickHandler(item)}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-bottom-pagination-box">
                        <Pagination
                            currentPage={currentPage}
                            currentSection={currentSection}
                            setCurrentPage={setCurrentPage}
                            setCurrentSection={setCurrentSection}
                            viewPageList={viewPageList}
                            totalSection={totalSection}
                        />
                    </div>
                </div>
            </div>
        );
    };

    // render: Main Component Rendering
    return (
        <>
            <MainTop />
            <MainBottom />
        </>
    );
}
