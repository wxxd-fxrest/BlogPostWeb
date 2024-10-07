import React from 'react';
import './style.css';
import DefaultProfileImage from 'assets/images/Ellipse 1.png';
import { BoardListItem, CommentListItem } from 'types/inderface';
import { useNavigate } from 'react-router-dom';

interface Props {
    commentListItem: CommentListItem;
}

// component: Top3 List Item 컴포넌트
export default function CommentItem({ commentListItem }: Props) {
    // properties
    const { nickname, profileImage, writeDatetime, content } = commentListItem;

    // function: 네비게이트 함수
    // const navigator = useNavigate();

    // event handler: 게시물 아이템 클릭 이벤트 처리
    const onClickHandler = () => {
        // navigator(boardNumber);
    };

    // render: Top3 List Item 컴포넌트 렌더링
    return (
        <div className="comment-list-item" onClick={onClickHandler}>
            <div className="comment-list-item-top">
                <div className="comment-list-item-profile-box">
                    <div
                        className="comment-list-item-profile-image"
                        style={{ backgroundImage: `url(${profileImage ? profileImage : DefaultProfileImage})` }}
                    ></div>
                </div>
                <div className="comment-list-item-nickname">{nickname}</div>
                <div className="comment-list-item-divider">{'|'}</div>
                <div className="comment-list-item-time">{writeDatetime}</div>
            </div>
            <div className="comment-list-item-main">
                <div className="comment-list-item-content">{content}</div>
            </div>
        </div>
    );
}
