import CommentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';
import Pagination from 'components/Pagination';
import commentListMock from 'mocks/comment-list.mock';
import favoriteListMock from 'mocks/favorite-list.mock';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Board, CommentListItem, FavoriteListItem } from 'types/inderface';
import './style.css';
import DefaultProfileImage from 'assets/images/default-profile-image.png';
import { useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import boardMock from 'mocks/board.mock';

// component: Board Detail Component
export default function BoardDetail() {
    // function: useNavigate()
    const navigator = useNavigate();

    // state: board number path variable state
    const { boardNumber } = useParams();

    // state: login user state
    const { loginUser } = useLoginUserStore();

    // component: Board Detail top component
    const BoardDetailTop = () => {
        // state: profile info box button state
        const [board, setBoard] = useState<Board | null>(null);

        // state: more button state
        const [showMore, setShowMore] = useState<boolean>(false);

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
            if (!board || !loginUser) return;
            if (loginUser.email !== board.writerEmail) return;
            // TODO: Delete Request
            navigator(MAIN_PATH());
        };

        // effect: boarNumber 변경 시 실행 될 effect
        useEffect(() => {
            setBoard(boardMock);
        }, [boardNumber]);

        // render: Detail Top Component Rendering
        if (!board) return <></>;
        return (
            <div id="board-detail-top">
                <div className="board-detail-top-header">
                    <div className="board-detail-title">{'제목임'}</div>
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
                            <div className="board-detail-write-date">{board.writeDatetime}</div>
                        </div>
                        <div className="icon-button" onClick={onMoreButtonClickHandler}>
                            <div className="icon more-icon"></div>
                        </div>
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
        // state: comment ref state
        const commentRef = useRef<HTMLTextAreaElement | null>(null);

        // state: favorite/comment list state
        const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
        const [commentList, setCommentList] = useState<CommentListItem[]>([]);

        // state: favorite/comment change state
        const [isFavorite, setFavorite] = useState<boolean>(false);
        const [comment, setComment] = useState<string>('');

        // state: show favorite/comment state
        const [showFavorite, setShowFavorite] = useState<boolean>(false);
        const [showComment, setShowComment] = useState<boolean>(false);

        // event handler: favorite click event
        const onFavoriteClickHandler = () => {
            setFavorite(!isFavorite);
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
            if (!comment) return;
            alert('댓글 달림 ㅇㅇ');
        };

        // effect: boardNumber path variable 변경 -> GET favorite/comment data effect
        useEffect(() => {
            setFavoriteList(favoriteListMock);
            setCommentList(commentListMock);
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
                        <div className="board-detail-bottom-button-text">{`댓글 ${commentList.length}`}</div>
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
                                <span className="emphasis">{commentList.length}</span>
                            </div>
                            <div className="board-detail-bottom-comment-list-container">
                                {commentList.map((item, i) => (
                                    <CommentItem key={i} commentListItem={item} />
                                ))}
                            </div>
                        </div>

                        <div className="divider"></div>
                        <div className="board-detail-bottom-comment-pagination-box">
                            <Pagination />
                        </div>
                        <div className="board-detail-bottom-comment-input-container">
                            <div className="board-detail-bottom-comment-input-box">
                                <textarea
                                    ref={commentRef}
                                    className="board-detail-bottom-comment-textarea"
                                    placeholder="댓글을 작성해 주세요."
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
                    </div>
                )}
            </div>
        );
    };

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
