import CommentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';
import Pagination from 'components/Pagination';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Board, CommentListItem, FavoriteListItem } from 'types/inderface';
import './style.css';
import DefaultProfileImage from 'assets/images/default-profile-image.png';
import { useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import {
    deleteBoardRequest,
    getBoardRequest,
    getCommentListRequest,
    getFavoriteListRequest,
    increaseViewCountRequest,
    postCommentRequest,
    putFavoriteRequest,
} from 'apis';
import {
    DeleteBoardResponseDTO,
    GetBoardResponseDTO,
    GetCommentListResponseDTO,
    GetFavoriteListResponseDTO,
    IncreaseViewCountResponseDTO,
    PostCommentResponseDTO,
    PutFavoriteResponseDTO,
} from 'apis/response/board';
import { ResponseDTO } from 'apis/response';
import dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import { PostCommentRequestDTO } from 'apis/request/baord';
import { usePagination } from 'hooks';

// component: Board Detail Component
export default function BoardDetail() {
    // function: useNavigate()
    const navigator = useNavigate();

    // function: increase view count response func
    const increaseViewCountResponse = (responseBody: IncreaseViewCountResponseDTO | ResponseDTO | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'NB') alert('존재하지 않는 게시글입니다.');
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
    };

    // state: board number path variable state
    const { boardNumber } = useParams();

    // state: login user state
    const { loginUser } = useLoginUserStore();

    // state: cookies state
    const [cookies, setCookie] = useCookies();

    // component: Board Detail top component
    const BoardDetailTop = () => {
        // state: profile info box button state
        const [board, setBoard] = useState<Board | null>(null);

        // state: more button state
        const [showMore, setShowMore] = useState<boolean>(false);

        // state: board owner user state
        const [isOwner, setOwner] = useState<Boolean>(false);

        // function: get board response func
        const getBoardResponse = (responseBody: GetBoardResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'NB') alert('존재하지 않는 게시글입니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') {
                navigator(MAIN_PATH());
                return;
            }

            const board: Board = { ...(responseBody as GetBoardResponseDTO) };
            setBoard(board);

            if (!loginUser) {
                setOwner(false);
                return;
            }
            const isOwner = loginUser.email === board.writerEmail;
            setOwner(isOwner);
        };

        // function: write date time format change func
        const getWriteDatetimeFromat = () => {
            if (!board) return '';
            const date = dayjs(board.writeDatetime);
            return date.format('YYYY. MM. DD.');
        };

        // function: delete board response func
        const deleteBoardResponse = (responseBody: DeleteBoardResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'VF') alert('잘못된 접근입니다.');
            if (code === 'NU') alert('존재하지 않는 유저입니다.');
            if (code === 'NB') alert('존재하지 않는 게시글입니다.');
            if (code === 'AF') alert('인증에 실패했습니다.');
            if (code === 'NP') alert('권한이 없습니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            navigator(MAIN_PATH());
        };

        // event handler: profile info box button click event
        const onProfileInfoBoxButtonClickHandler = () => {
            if (!board) return;
            navigator(USER_PATH(board.writerEmail));
        };

        // event handler: more button click event
        const onMoreButtonClickHandler = () => {
            setShowMore(!showMore);
        };

        // event handler: update button click event
        const onUpdateButtonClickHandler = () => {
            if (!board || !loginUser) return;
            if (loginUser.email !== board.writerEmail) return;
            navigator(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(board.boardNumber));
        };

        // event handler: delete button click event
        const onDeleteButtonClickHandler = () => {
            if (!boardNumber || !board || !loginUser || !cookies.accessToken) return;
            if (loginUser.email !== board.writerEmail) return;
            deleteBoardRequest(boardNumber, cookies.accessToken).then(deleteBoardResponse);
        };

        // effect: boarNumber 변경 시 실행 될 effect
        useEffect(() => {
            if (!boardNumber) {
                navigator(MAIN_PATH());
                return;
            }
            getBoardRequest(boardNumber).then(getBoardResponse);
        }, [boardNumber]);

        // render: Detail Top Component Rendering
        if (!board) return <></>;
        return (
            <div id="board-detail-top">
                <div className="board-detail-top-header">
                    <div className="board-detail-title">{board.title}</div>
                    <div className="board-detail-top-sub-box">
                        <div className="board-detail-write-info-box" onClick={onProfileInfoBoxButtonClickHandler}>
                            <div
                                className="board-detail-writer-profile-image"
                                style={{
                                    backgroundImage: `url(${
                                        board.writerProfileImage ? board.writerProfileImage : DefaultProfileImage
                                    })`,
                                }}
                            ></div>
                            <div className="board-detail-writer-nickname">{board.writerNickname}</div>
                            <div className="board-detail-info-divider">{'|'}</div>
                            <div className="board-detail-write-date">{getWriteDatetimeFromat()}</div>
                        </div>
                        {isOwner && (
                            <div className="icon-button" onClick={onMoreButtonClickHandler}>
                                <div className="icon more-icon"></div>
                            </div>
                        )}
                        {showMore && (
                            <div className="board-detail-more-box">
                                <div className="board-detail-update-button" onClick={onUpdateButtonClickHandler}>
                                    {'수정'}
                                </div>
                                <div className="divider"></div>
                                <div className="board-detail-delete-button" onClick={onDeleteButtonClickHandler}>
                                    {'삭제'}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="board-detail-top-main">
                    <div className="board-detail-main-text">{board.content}</div>
                    {board.boardImageList.map((item, i) => (
                        <img key={i} className="board-detail-main-image" src={item} />
                    ))}
                </div>
            </div>
        );
    };

    // component: Board Detail bottom component
    const BoardDetailBottom = () => {
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
        } = usePagination<CommentListItem>(5);

        // state: comment ref state
        const commentRef = useRef<HTMLTextAreaElement | null>(null);

        // state: favorite list state
        const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);

        // state: total comment count state
        const [totalCommentCount, setTotalCommentCount] = useState<number>(0);

        // state: favorite/comment change state
        const [isFavorite, setFavorite] = useState<boolean>(false);
        const [comment, setComment] = useState<string>('');

        // state: show favorite/comment state
        const [showFavorite, setShowFavorite] = useState<boolean>(false);
        const [showComment, setShowComment] = useState<boolean>(false);

        // function: get favorite list response func
        const getFavoriteListResponse = (responseBody: GetFavoriteListResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'NB') alert('존재하지 않는 게시글입니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            const { favoriteList } = responseBody as GetFavoriteListResponseDTO;
            setFavoriteList(favoriteList);

            if (!loginUser) {
                setFavorite(false);
                return;
            }

            const isFavorite = favoriteList.findIndex((favorite) => favorite.email === loginUser.email) !== -1;
            setFavorite(isFavorite);
        };

        // function: get comment list response func
        const getCommentListResponse = (responseBody: GetFavoriteListResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'NB') alert('존재하지 않는 게시글입니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            const { commentList } = responseBody as GetCommentListResponseDTO;
            setTotalList(commentList);
            setTotalCommentCount(commentList.length);
        };

        // function: put favorite response func
        const putFavoriteResponse = (responseBody: PutFavoriteResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'VF') alert('잘못된 접근입니다.');
            if (code === 'NU') alert('존재하지 않는 유저입니다.');
            if (code === 'NB') alert('존재하지 않는 게시글입니다.');
            if (code === 'AF') alert('인증에 실패했습니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            if (!boardNumber) return;
            getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
        };

        // function: post comment response func
        const postCommentResponse = (responseBody: PostCommentResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'VF') alert('잘못된 접근입니다.');
            if (code === 'NU') alert('존재하지 않는 유저입니다.');
            if (code === 'NB') alert('존재하지 않는 게시글입니다.');
            if (code === 'AF') alert('인증에 실패했습니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            setComment('');

            if (!boardNumber) return;
            getCommentListRequest(boardNumber).then(getCommentListResponse);
        };

        // event handler: favorite click event
        const onFavoriteClickHandler = () => {
            if (!boardNumber || !loginUser || !cookies.accessToken) return;
            putFavoriteRequest(boardNumber, cookies.accessToken).then(putFavoriteResponse);
        };

        // event handler: show favorite/comment click event
        const onShowFavoriteButtonClickHandler = () => {
            setShowFavorite(!showFavorite);
        };
        const onShowCommentButtonClickHandler = () => {
            setShowComment(!showComment);
        };

        // event handler: comment change event
        const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = event.target;
            setComment(value);

            if (!commentRef.current) return;
            commentRef.current.style.height = 'auto';
            commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
        };

        // event handler: comment submit button click event
        const onCommentSubmitButtonClickHandler = () => {
            if (!comment || !boardNumber || !loginUser || !cookies.accessToken) return;
            const requestBody: PostCommentRequestDTO = { content: comment };
            postCommentRequest(boardNumber, requestBody, cookies.accessToken).then(postCommentResponse);
        };

        // effect: boardNumber path variable 변경 -> GET favorite/comment data effect
        useEffect(() => {
            if (!boardNumber) return;
            getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
            getCommentListRequest(boardNumber).then(getCommentListResponse);
        }, [boardNumber]);

        // render: Detail Bottom Component Rendering
        return (
            <div id="board-detail-bottom">
                <div className="board-detail-bottom-button-box">
                    <div className="board-detail-bottom-button-group">
                        <div className="icon-button" onClick={onFavoriteClickHandler}>
                            {isFavorite ? (
                                <div className="icon favorite-fill-icon"></div>
                            ) : (
                                <div className="icon favorite-light-icon"></div>
                            )}
                        </div>
                        <div className="board-detail-bottom-button-text">{`좋아요 ${favoriteList.length}`}</div>
                        <div className="icon-button" onClick={onShowFavoriteButtonClickHandler}>
                            {showFavorite ? (
                                <div className="icon up-light-icon"></div>
                            ) : (
                                <div className="icon down-light-icon"></div>
                            )}
                        </div>
                    </div>
                    <div className="board-detail-bottom-button-group">
                        <div className="icon-button">
                            <div className="icon comment-icon"></div>
                        </div>
                        <div className="board-detail-bottom-button-text">{`댓글 ${totalCommentCount}`}</div>
                        <div className="icon-button" onClick={onShowCommentButtonClickHandler}>
                            {showComment ? (
                                <div className="icon up-light-icon"></div>
                            ) : (
                                <div className="icon down-light-icon"></div>
                            )}
                        </div>
                    </div>
                </div>
                {showFavorite && (
                    <div className="board-detail-bottom-favorite-box">
                        <div className="board-detail-bottom-favorite-container">
                            <div className="board-detail-bottom-favorite-title">
                                {'좋아요 '}
                                <span className="emphasis">{favoriteList.length}</span>
                            </div>
                            <div className="board-detail-bottom-favorite-contents">
                                {favoriteList.map((item, i) => (
                                    <FavoriteItem key={i} favoriteListItem={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {showComment && (
                    <div className="board-detail-bottom-comment-box">
                        <div className="board-detail-bottom-comment-container">
                            <div className="board-detail-bottom-comment-title">
                                {'댓글 '}
                                <span className="emphasis">{viewList.length}</span>
                            </div>
                            <div className="board-detail-bottom-comment-list-container">
                                {viewList.map((item, i) => (
                                    <CommentItem key={i} commentListItem={item} />
                                ))}
                            </div>
                        </div>

                        <div className="divider"></div>
                        <div className="board-detail-bottom-comment-pagination-box">
                            <Pagination
                                currentPage={currentPage}
                                currentSection={currentSection}
                                setCurrentPage={setCurrentPage}
                                setCurrentSection={setCurrentSection}
                                viewPageList={viewPageList}
                                totalSection={totalSection}
                            />
                        </div>
                        {loginUser !== null && (
                            <div className="board-detail-bottom-comment-input-container">
                                <div className="board-detail-bottom-comment-input-box">
                                    <textarea
                                        ref={commentRef}
                                        className="board-detail-bottom-comment-textarea"
                                        placeholder="댓글을 작성해 주세요."
                                        value={comment}
                                        onChange={onCommentChangeHandler}
                                    />
                                    <div
                                        className="board-detail-bottom-comment-button-box"
                                        onClick={onCommentSubmitButtonClickHandler}
                                    >
                                        <div className={comment === '' ? 'disable-button' : 'black-button'}>
                                            {'댓글 달기'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // effect: board number path variable 변경 시 조회수 증가
    let effectFlag = true;
    useEffect(() => {
        if (!boardNumber) return;
        if (effectFlag) {
            effectFlag = false;
            return;
        }

        increaseViewCountRequest(boardNumber).then(increaseViewCountResponse);
    }, [boardNumber]);

    // render: Board Detail Component Rendering
    return (
        <div id="board-detail-wrapper">
            <div className="board-detail-container">
                <BoardDetailTop />
                <BoardDetailBottom />
            </div>
        </div>
    );
}
