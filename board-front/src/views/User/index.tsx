import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultProfileImage from 'assets/images/default-profile-image.png';
import './style.css';
import { BoardListItem, User as UserInterface } from 'types/inderface';
import BoardItem from 'components/BoardItem';
import { useLoginUserStore } from 'stores';
import { BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import {
    fileUploadRequest,
    getUserBoardListRequest,
    getUserRequest,
    patchNicknameRequest,
    patchProfileImageRequest,
} from 'apis';
import { GetUserResponseDTO, PatchNicknameResponseDTO, PatchProfileImageResponseDTO } from 'apis/response/user';
import { ResponseDTO } from 'apis/response';
import { useCookies } from 'react-cookie';
import { PatchNicknameRequestDTO, PatchProfileImageRequestDTO } from 'apis/request/user';
import { usePagination } from 'hooks';
import Pagination from 'components/Pagination';
import { GetUserBoardListResponseDTO } from 'apis/response/board';

// component: User Component
export default function User() {
    // function: useNavigate()
    const navigator = useNavigate();

    // state: userParams
    const { useremail } = useParams();

    // state: login user
    const { loginUser } = useLoginUserStore();

    // state: cookies state
    const [cookies, setCookie] = useCookies();

    // state: my page state
    const [isMyPage, setMyPage] = useState<boolean>(false);

    // component: User Top Component
    const UserTop = () => {
        // state nickname state
        const [saveEmail, setSaveEmail] = useState<string>('');
        const [nickname, setNickname] = useState<string>('');
        const [changeNickname, setChangeNickname] = useState<string>('');
        const [isNicknameChange, setNicknameChange] = useState<boolean>(false);

        // state profile image state
        const [profileImage, setProfileImage] = useState<string | null>(null);

        // state: input ref state
        const imageInputRef = useRef<HTMLInputElement | null>(null);

        // function: get user response
        const getUserResponse = (responseBody: GetUserResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'NU') alert('존재하지 않는 유저입니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') {
                navigator(MAIN_PATH());
                return;
            }

            const { email, nickname, profileImage } = responseBody as GetUserResponseDTO;
            setNickname(nickname);
            setProfileImage(profileImage);
            setSaveEmail(email);
            const isMyPage = email === loginUser?.email;
            setMyPage(isMyPage);
        };

        // function: file upload response
        const fileUploadResponse = (profileImage: string | null) => {
            if (!profileImage) return;
            if (!cookies.accessToken) return;

            const requestBody: PatchProfileImageRequestDTO = { profileImage };
            patchProfileImageRequest(requestBody, cookies.accessToken).then(patchProfileImageResponse);
        };

        // function: patch profile image response
        const patchProfileImageResponse = (responseBody: PatchProfileImageResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'AF') alert('인증에 실패했습니다.');
            if (code === 'NU') alert('존재하지 않는 유저입니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            if (!useremail) return;
            getUserRequest(useremail).then(getUserResponse);
        };

        // function: patch nickname response
        const patchNicknameResponse = (responseBody: PatchNicknameResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'VF') alert('닉네임은 필수입니다.');
            if (code === 'AF') alert('인증에 실패했습니다.');
            if (code === 'DN') alert('중복된 닉네임입니다.');
            if (code === 'NP') alert('권한이 없습니다.');
            if (code === 'NU') alert('존재하지 않는 유저입니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            if (!useremail) return;
            getUserRequest(useremail).then(getUserResponse);
            setNicknameChange(false);
        };

        // event handler: nickname edit button click event
        const onNicknameEditButtonClickHandler = () => {
            if (!isNicknameChange) {
                setChangeNickname(nickname);
                setNicknameChange(!isNicknameChange);
                return;
            }
            if (!cookies.accessToken) return;
            const requestBody: PatchNicknameRequestDTO = {
                nickname: changeNickname,
            };
            patchNicknameRequest(requestBody, cookies.accessToken).then(patchNicknameResponse);
        };

        // event handler: nickname change event
        const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setChangeNickname(value);
        };

        // event handler: profile image edit button click event
        const onProfileBoxClickHandler = () => {
            if (!isMyPage) return;
            if (!imageInputRef.current) return;
            imageInputRef.current.click();
        };

        // event handler: profile image change event
        const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files || !event.target.files.length) return;
            const file = event.target.files[0];
            const data = new FormData();
            data.append('file', file);

            fileUploadRequest(data).then(fileUploadResponse);
        };

        // effect: email path variable change effect
        useEffect(() => {
            if (!useremail) return;
            getUserRequest(useremail).then(getUserResponse);
        }, [useremail]);

        // render: User Top Component Rendering
        return (
            <div id="user-top-wrapper">
                <div className="user-top-container">
                    {isMyPage ? (
                        <div className="user-top-my-profile-image-box" onClick={onProfileBoxClickHandler}>
                            {profileImage !== null ? (
                                <div
                                    className="user-top-profile-image"
                                    style={{
                                        backgroundImage: `url(${profileImage})`,
                                    }}
                                ></div>
                            ) : (
                                <div className="icon-box-large">
                                    <div className="icon image-box-white-icon"></div>
                                </div>
                            )}
                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={onProfileImageChangeHandler}
                            />
                        </div>
                    ) : (
                        <div
                            className="user-top-profile-image-box"
                            style={{
                                backgroundImage: `url(${profileImage ? profileImage : DefaultProfileImage})`,
                            }}
                        ></div>
                    )}
                    <div className="user-top-info-box">
                        <div className="user-top-info-nickname-box">
                            {isMyPage ? (
                                <>
                                    {isNicknameChange ? (
                                        <input
                                            className="user-top-info-nickname-input"
                                            type="text"
                                            size={nickname.length + 2}
                                            value={changeNickname}
                                            onChange={onNicknameChangeHandler}
                                        />
                                    ) : (
                                        <div className="user-top-info-nickname">{nickname}</div>
                                    )}
                                    <div className="icon-button" onClick={onNicknameEditButtonClickHandler}>
                                        <div className="icon edit-icon"></div>
                                    </div>
                                </>
                            ) : (
                                <div className="user-top-info-nickname">{nickname}</div>
                            )}
                        </div>
                        <div className="user-top-info-email">{saveEmail}</div>
                    </div>
                </div>
            </div>
        );
    };

    // component: User Bottom Component
    const UserBottom = () => {
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
        } = usePagination<BoardListItem>(5);

        // state: board count state
        const [count, setCount] = useState<number>(2);

        // function: get user board list response
        const getUserBoardListResponse = (responseBody: GetUserBoardListResponseDTO | ResponseDTO | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'NU') {
                alert('존재하지 않는 유저입니다.');
                navigator(MAIN_PATH());
                return;
            }
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            const { userBoardList } = responseBody as GetUserBoardListResponseDTO;
            setTotalList(userBoardList);
            setCount(userBoardList.length);
        };

        // event handler: side card click event
        const onSideCardClickHandler = () => {
            if (isMyPage) {
                navigator(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
            } else if (loginUser) {
                navigator(USER_PATH(loginUser.email));
            }
        };

        // effect: useremail path variable 변경 시 실행 될 effect
        useEffect(() => {
            if (!useremail) return;
            getUserBoardListRequest(useremail).then(getUserBoardListResponse);
        }, [useremail]);

        // render: User Bottom Component Rendering
        return (
            <div id="user-bottom-wrapper">
                <div className="user-bottom-container">
                    <div className="user-bottom-title">
                        {isMyPage ? '내 게시글 ' : '게시글 '}
                        <span className="emphasis">{0}</span>
                    </div>
                    <div className="user-bottom-contents-box">
                        {count === 0 ? (
                            <div className="user-bottom-contents-nothing">{'아직 게시물이 없습니다.'}</div>
                        ) : (
                            <div className="user-bottom-contents">
                                {viewList.map((item, i) => (
                                    <BoardItem key={i} boardListItem={item} />
                                ))}
                            </div>
                        )}
                        <div className="user-bottom-side-box">
                            <div className="user-bottom-side-card" onClick={onSideCardClickHandler}>
                                <div className="user-bottom-side-container">
                                    {isMyPage ? (
                                        <>
                                            <div className="icon-box">
                                                <div className="icon edit-icon"></div>
                                            </div>
                                            <div className="user-bottom-side-text">{'글쓰기'}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="user-bottom-side-text">{'내 게시물로 이동'}</div>
                                            <div className="icon-box">
                                                <div className="icon arrow-right-icon"></div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-bottom-paginaiton-box">
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
    };

    // render: User Component Rendering
    return (
        <>
            <UserTop />
            <UserBottom />
        </>
    );
}
