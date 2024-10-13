import React from 'react';
import './style.css';
import DefaultProfileImage from 'assets/images/default-profile-image.png';
import { BoardListItem, CommentListItem } from 'types/inderface';
import { useNavigate } from 'react-router-dom';
import { USER_PATH } from 'constant';

interface Props {
    commentListItem: CommentListItem;
}

// component: Top3 List Item 컴포넌트
export default function CommentItem({ commentListItem }: Props) {
    // state: properties
    const { nickname, profileImage, userEmail, writeDatetime, content } = commentListItem;

    // function: useNavigate()
    const navigator = useNavigate();

    // event handler: profile info box button click event
    const onProfileInfoBoxButtonClickHandler = () => {
        if (!userEmail) return;
        navigator(USER_PATH(userEmail));
    };

    // render: Top3 List Item 컴포넌트 렌더링
    return (
        <div className="comment-list-item">
            <div className="comment-list-item-top" onClick={onProfileInfoBoxButtonClickHandler}>
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
