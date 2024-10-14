import { getRelationListRequest, getSearchBoardListRequest } from 'apis';
import { ResponseDTO } from 'apis/response';
import { GetSearchBoardListResponseDTO } from 'apis/response/board';
import { GetRelationListResponseDTO } from 'apis/response/search';
import BoardItem from 'components/BoardItem';
import Pagination from 'components/Pagination';
import { SEARCH_PATH } from 'constant';
import { usePagination } from 'hooks';
import latestBoardListMock from 'mocks/latest-board-list.mock';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/inderface';
import './style.css';

// component: Search Component
export default function Search() {
    // function: useNavigate()
    const navigator = useNavigate();

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

    // state: search word path variable state
    const { searchWord } = useParams();

    // state: preSearchWord(이전 검색어) state
    const [preSearchWord, setPreSearchWord] = useState<string | null>(null);

    // state: search board count state
    const [count, setCount] = useState<number>(2);

    // state: relation word list state
    const [relativeWordList, setRelativeWordList] = useState<string[]>([]);

    // function: get search board list response
    const getSearchBoardListResponse = (responseBody: GetSearchBoardListResponseDTO | ResponseDTO | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') return;

        if (!searchWord) return;
        const { searchList } = responseBody as GetSearchBoardListResponseDTO;
        setTotalList(searchList);
        setCount(searchList.length);
        setPreSearchWord(searchWord);
    };

    // function: get relation list response
    const getRelationListResponse = (responseBody: GetRelationListResponseDTO | ResponseDTO | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') return;

        const { relativeWordList } = responseBody as GetRelationListResponseDTO;
        setRelativeWordList(relativeWordList);
    };

    // event handler: relation word click event
    const onRelationWordClickHandler = (word: string) => {
        navigator(SEARCH_PATH(word));
    };

    // effect: search word change 시 실행 될 effect
    useEffect(() => {
        if (!searchWord) return;
        getSearchBoardListRequest(searchWord, preSearchWord).then(getSearchBoardListResponse);
        getRelationListRequest(searchWord).then(getRelationListResponse);
    }, [searchWord]);

    // render: Search Component Rendering
    return (
        <div id="search-wrapper">
            <div className="search-container">
                <div className="search-title-box">
                    <div className="search-title">
                        <span className="search-title-emphasis">{searchWord}</span>
                        {'에 대한 검색 결과입니다.'}
                    </div>
                    <div className="search-count">{count}</div>
                </div>
                <div className="search-contents-box">
                    {count === 0 ? (
                        <div className="search-contents-nothing">{'검색 결과가 없습니다.'}</div>
                    ) : (
                        <div className="search-contents">
                            {viewList.map((item, i) => (
                                <BoardItem key={i} boardListItem={item} />
                            ))}
                        </div>
                    )}
                    <div className="search-relation-box">
                        <div className="search-relation-card">
                            <div className="search-relation-card-container">
                                <div className="search-relation-card-title">{'관련 검색어'}</div>
                                {relativeWordList.length === 0 ? (
                                    <div className="search-relation-card-contents-nothing">
                                        {'관련 검색어가 없습니다.'}
                                    </div>
                                ) : (
                                    <div className="search-relation-card-contents">
                                        {relativeWordList.map((word, i) => (
                                            <div
                                                key={i}
                                                className="word-badge"
                                                onClick={() => onRelationWordClickHandler(word)}
                                            >
                                                {word}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-pagination-box">
                    {count !== 0 && (
                        <Pagination
                            currentPage={currentPage}
                            currentSection={currentSection}
                            setCurrentPage={setCurrentPage}
                            setCurrentSection={setCurrentSection}
                            viewPageList={viewPageList}
                            totalSection={totalSection}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
