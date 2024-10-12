import CommentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';
import Pagination from 'components/Pagination';
import commentListMock from 'mocks/comment-list.mock';
import favoriteListMock from 'mocks/favorite-list.mock';
import React, { useEffect, useState } from 'react';
import { CommentListItem, FavoriteListItem } from 'types/inderface';
import './style.css';
import DefaultProfileImage from 'assets/images/default-profile-image.png';

// component: Board Detail Component
export default function BoardDetail() {
    // component: Board Detail top component
    const BoardDetailTop = () => {
        // state: more button state
        const [showMore, setShowMore] = useState<boolean>(false);

        // event handler: more button click event
        const onMoreButtonClickHandler = () => {
            setShowMore(!showMore);
        };

        // render: Detail Top Component Rendering
        return (
            <div id="board-detail-top">
                <div className="board-detail-top-header">
                    <div className="board-detail-title">{'제목임'}</div>
                    <div className="board-detail-top-sub-box">
                        <div className="board-detail-write-info-box">
                            <div
                                className="board-detail-writer-profile-image"
                                style={{
                                    backgroundImage: `url(${DefaultProfileImage})`,
                                }}
                            ></div>
                            <div className="board-detail-writer-nickname">{'나는우드'}</div>
                            <div className="board-detail-info-divider">{'|'}</div>
                            <div className="board-detail-write-date">{'2024.02.30 12:00:33'}</div>
                        </div>
                        <div className="icon-button" onClick={onMoreButtonClickHandler}>
                            <div className="icon more-icon"></div>
                        </div>
                        {showMore && (
                            <div className="board-detail-more-box">
                                <div className="board-detail-update-button">{'수정'}</div>
                                <div className="divider"></div>
                                <div className="board-detail-delete-button">{'삭제'}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="board-detail-top-main">
                    <div className="board-detail-main-text">
                        {
                            '살아간다는 생각에 잠겨있는 동안 내가 잃어버린 건 whoa 이젠 너무 아득하게만 느껴지는 걸 추억을 더듬어봐도 아직 모두 다 여전한 건지 그때 우리 참 많이 다퉜지 oh 잊지 못해 모든 게 변한 대도 내 삶이 끝날 때 곁에 있는 건 우린 몰랐을지 몰라 살아가는 동안 조금씩 가까워지던 우리 어느새 자라서 굳이 안녕이란 말도 필요 없을 것 같아 벅찬 이 세상에 I need you F-R-I-E-N-D-S 지겹도록 오래된 I know I love my best friends 몇 명이면 난 족해 I said F-R-I-E-N-D friend 난 볼 거야 평생 벅찬 이 세상에서 I need you살아간다는 생각에 잠겨있는 동안 내가 잃어버린 건 whoa 이젠 너무 아득하게만 느껴지는 걸 추억을 더듬어봐도 아직 모두 다 여전한 건지 그때 우리 참 많이 다퉜지 oh 잊지 못해 모든 게 변한 대도 내 삶이 끝날 때 곁에 있는 건 우린 몰랐을지 몰라 살아가는 동안 조금씩 가까워지던 우리 어느새 자라서 굳이 안녕이란 말도 필요 없을 것 같아 벅찬 이 세상에 I need you F-R-I-E-N-D-S 지겹도록 오래된 I know I love my best friends 몇 명이면 난 족해 I said F-R-I-E-N-D friend 난 볼 거야 평생 벅찬 이 세상에서 I need you '
                        }
                    </div>
                    <img
                        className="board-detail-main-image"
                        src="https://i.pinimg.com/564x/ed/35/22/ed3522e276429dff3ab447190f5e9da7.jpg"
                    />
                </div>
            </div>
        );
    };

    // component: Board Detail bottom component
    const BoardDetailBottom = () => {
        const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
        const [commentList, setCommentList] = useState<CommentListItem[]>([]);

        useEffect(() => {
            setFavoriteList(favoriteListMock);
            setCommentList(commentListMock);
        }, []);

        // render: Detail Bottom Component Rendering
        return (
            <div id="board-detail-bottom">
                <div className="board-detail-bottom-button-box">
                    <div className="board-detail-bottom-button-group">
                        <div className="icon-button">
                            <div className="icon favorite-fill-icon"></div>
                        </div>
                        <div className="board-detail-bottom-button-text">{`좋아요 ${12}`}</div>
                        <div className="icon-button">
                            <div className="icon up-light-button"></div>
                        </div>
                    </div>
                    <div className="board-detail-bottom-button-group">
                        <div className="icon-button">
                            <div className="icon comment-fill-icon"></div>
                        </div>
                        <div className="board-detail-bottom-button-text">{`댓글 ${12}`}</div>
                        <div className="icon-button">
                            <div className="icon up-light-button"></div>
                        </div>
                    </div>
                </div>
                <div className="board-detail-bottom-favorite-box">
                    <div className="board-detail-bottom-favorite-container">
                        <div className="board-detail-bottom-favorite-title">
                            {'좋아요'}
                            <span className="emphasis">{12}</span>
                        </div>
                        <div className="board-detail-bottom-favorite-contents">
                            {favoriteList.map((item, i) => (
                                <FavoriteItem key={i} favoriteListItem={item} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="board-detail-bottom-comment-box">
                    <div className="board-detail-bottom-comment-container">
                        <div className="board-detail-bottom-comment-title">
                            {'댓글 '}
                            <span className="emphasis">{12}</span>
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
                                className="board-detail-bottom-comment-textarea"
                                placeholder="댓글을 작성해 주세요."
                            />
                            <div className="board-detail-bottom-comment-button-box">
                                <div className="disable-button">{'댓글 달기'}</div>
                            </div>
                        </div>
                    </div>
                </div>
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
