import React from 'react';
import './style.css';
import DefaultProfileImage from 'assets/images/default-profile-image.png';
import { FavoriteListItem } from 'types/inderface';
import { useNavigate } from 'react-router-dom';
import { USER_PATH } from 'constant';

interface Props {
    favoriteListItem: FavoriteListItem;
}

// component: Top3 List Item 컴포넌트
export default function FavoriteItem({ favoriteListItem }: Props) {
    // state: properties
    const { email, nickname, profileImage } = favoriteListItem;

    // function: useNavigate()
    const navigator = useNavigate();

    // event handler: profile info box button click event
    const onProfileInfoBoxButtonClickHandler = () => {
        if (!email) return;
        navigator(USER_PATH(email));
    };

    // render: Top3 List Item 컴포넌트 렌더링
    return (
        <div className="favorite-list-item" onClick={onProfileInfoBoxButtonClickHandler}>
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
