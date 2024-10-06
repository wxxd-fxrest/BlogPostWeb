import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardListItem } from 'types/inderface';
import './style.css';
import DefaultProfileImage from 'assets/images/Ellipse 1.png';

interface Props {
    boardListItem: BoardListItem;
}

// component: Board List Item 컴포넌트
export default function BoardItem({ boardListItem }: Props) {
    // properties
    const { boardNumber, title, content, boardTitleImage } = boardListItem;
    const { favoriteCount, commentCount, viewCount } = boardListItem;
    const { writeDatetime, writeNickname, writerProfileImage } = boardListItem;

    // function: 네비게이트 함수
    // const navigator = useNavigate();

    // event handler: 게시물 아이템 클릭 이벤트 처리
    const onClickHandler = () => {
        // navigator(boardNumber);
    };

    // render: Board List Item 컴포넌트 렌더링
    return (
        <div className="board-list-item" onClick={onClickHandler}>
            {/* Card Left */}
            <div className="board-list-item-main-box">
                {/* Card Left Top*/}
                <div className="board-list-item-top">
                    {/* Card Left Top Profile Box 작성자 프로필 사진 */}
                    <div className="board-list-item-profile-box">
                        <div
                            className="board-list-item-profile-image"
                            style={{
                                backgroundImage: `url(${
                                    writerProfileImage ? writerProfileImage : DefaultProfileImage
                                })`,
                            }}
                        ></div>
                    </div>
                    {/* Card Left Top Write Box - 작성자 이름/ 작성 날짜 */}
                    <div className="board-list-item-write-box">
                        <div className="board-list-item-nickname">{writeNickname}</div>
                        <div className="board-list-item-write-date">{writeDatetime}</div>
                    </div>
                </div>
                {/* Card Left Middle*/}
                <div className="board-list-item-middle">
                    <div className="board-list-item-title">
                        {/* {'Oh, let me tell you a story 내가 아주 작을 때 의심 없이 믿었던 이야기'} */}
                        {title}
                    </div>
                    <div className="board-list-item-content">{content}</div>
                </div>
                {/* Card Left Bottom*/}
                <div className="board-list-item-bottom">
                    <div className="board-list-item-counts">{`댓글 ${commentCount} ・ 좋아요 ${favoriteCount} ・ 조회수 ${viewCount}`}</div>
                </div>
            </div>
            {/* Card Image */}
            {boardTitleImage !== null && (
                <div className="board-list-item-image-box">
                    <div
                        className="board-list-item-image"
                        style={{
                            backgroundImage: `url(${boardTitleImage})`,
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
}
