import React from 'react';
import './style.css';
import DefaultProfileImage from 'assets/images/default-profile-image.png';
import { CommentListItem } from 'types/inderface';
import { useNavigate } from 'react-router-dom';
import { USER_PATH } from 'constant';
import dayjs from 'dayjs';

interface Props {
    commentListItem: CommentListItem;
}

// component: Top3 List Item 컴포넌트
export default function CommentItem({ commentListItem }: Props) {
    // state: properties
    const { nickname, profileImage, userEmail, writeDatetime, content } = commentListItem;

    // function: useNavigate()
    const navigator = useNavigate();

    // function: write date time elapsed func
    const getElapsedTime = () => {
        const now = dayjs(); // UTC로 현재 시간
        const writeTime = dayjs(writeDatetime); // writeDatetime이 UTC로 저장되어 있다고 가정

        const gap = now.diff(writeTime, 's');
        if (gap < 60) return `${gap}초 전`;
        if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
        if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
        return `${Math.floor(gap / 86400)}일 전`;
    };

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
                <div className="comment-list-item-time">{getElapsedTime()}</div>
            </div>
            <div className="comment-list-item-main">
                <div className="comment-list-item-content">{content}</div>
            </div>
        </div>
    );
}
