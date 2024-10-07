import React from 'react';
import './style.css';
import DefaultProfileImage from 'assets/images/Ellipse 1.png';
import { FavoriteListItem } from 'types/inderface';
import { useNavigate } from 'react-router-dom';

interface Props {
    favoriteListItem: FavoriteListItem;
}

// component: Top3 List Item 컴포넌트
export default function FavoriteItem({ favoriteListItem }: Props) {
    // properties
    const { nickname, profileImage } = favoriteListItem;

    // function: 네비게이트 함수
    // const navigator = useNavigate();

    // event handler: 게시물 아이템 클릭 이벤트 처리
    const onClickHandler = () => {
        // navigator(boardNumber);
    };

    // render: Top3 List Item 컴포넌트 렌더링
    return (
        <div className="favorite-list-item" onClick={onClickHandler}>
            <div className="favorite-list-item-profile-box">
                <div
                    className="favorite-list-item-profile-image"
                    style={{ backgroundImage: `url(${profileImage ? profileImage : DefaultProfileImage})` }}
                ></div>
            </div>
            <div className="favorite-list-item-nickname">{nickname}</div>
        </div>
    );
}
