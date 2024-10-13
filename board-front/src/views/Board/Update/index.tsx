import { getBoardRequest } from 'apis';
import { ResponseDTO } from 'apis/response';
import { GetBoardResponseDTO } from 'apis/response/board';
import { MAIN_PATH } from 'constant';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoardStore, useLoginUserStore } from 'stores';
import { convertUrlsTofile } from 'utils';
import './style.css';

// component: Board Update Component
export default function BoardWrite() {
    // state: error state
    const [error, setError] = useState<boolean>(false);

    // state: login user state
    const { loginUser } = useLoginUserStore();

    // state: cookie state
    const [cookies, setCookie] = useCookies();

    // state: board number state
    const { boardNumber } = useParams();

    // state: textarea/input ref state
    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    // state: post state
    const { title, setTitle } = useBoardStore();
    const { content, setContent } = useBoardStore();
    const { boardImageFileList, setBoardImageFileList } = useBoardStore();
    const { resetBoard } = useBoardStore();

    // state: post image preview url state
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    // function: navigate func
    const navigator = useNavigate();

    // function: get board response
    const getBoardResponse = (responseBody: GetBoardResponseDTO | ResponseDTO | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'NB') alert('존재하지 않는 게시글입니다.');
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') {
            navigator(MAIN_PATH());
            return;
        }

        const { title, content, boardImageList, writerEmail } = responseBody as GetBoardResponseDTO;
        setTitle(title);
        setContent(content);
        setImageUrls(boardImageList);
        convertUrlsTofile(boardImageList).then((boardImageFileList) => setBoardImageFileList(boardImageFileList));

        if (!loginUser || loginUser.email !== writerEmail) {
            navigator(MAIN_PATH());
            return;
        }
    };

    // event handler: title change event func
    const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setError(false);
        const { value } = event.target;
        setTitle(value);

        if (!titleRef.current) return;
        titleRef.current.style.height = 'auto';
        titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    };

    // event handler: content text change event func
    const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setError(false);
        const { value } = event.target;
        setContent(value);

        if (!contentRef.current) return;
        contentRef.current.style.height = 'auto';
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    };

    // event handler: image button click event
    const onImageUploadButtonClickHandler = () => {
        if (!imageInputRef.current) return;
        imageInputRef.current.click();
    };

    // event handler: image change event
    const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];

        const imageUrl = URL.createObjectURL(file);
        const newImageUrls = imageUrls.map((item) => item);
        newImageUrls.push(imageUrl);
        setImageUrls(newImageUrls);

        const newBoardImageFileList = boardImageFileList.map((item) => item);
        newBoardImageFileList.push(file);
        setBoardImageFileList(newBoardImageFileList);

        if (!imageInputRef.current) return;
        imageInputRef.current.value = '';
    };

    // event handler: image delete button click event
    const onImageDeleteButtonClickHandler = (deleteIndex: number) => {
        if (!imageInputRef.current) return;
        imageInputRef.current.value = '';

        const newImageUrls = imageUrls.filter((url, i) => i !== deleteIndex);
        setImageUrls(newImageUrls);

        const newBoardImageFileList = boardImageFileList.filter((file, index) => index !== deleteIndex);
        setBoardImageFileList(newBoardImageFileList);
    };

    // effect: refresh -> reset effect
    useEffect(() => {
        const accessToken = cookies.accessToken;
        if (!accessToken) {
            navigator(MAIN_PATH());
            return;
        }
        if (!boardNumber) return;
        getBoardRequest(boardNumber).then(getBoardResponse);
    }, [boardNumber]);

    // render: Board Update Component Rendering
    return (
        <div id="board-update-wrapper">
            <div className="board-update-container">
                <div className="board-update-box">
                    <div className="board-update-title-box">
                        <textarea
                            ref={titleRef}
                            className="board-update-title-textarea"
                            placeholder="제목을 입력해 주세요."
                            rows={1}
                            value={title}
                            onChange={onTitleChangeHandler}
                        />
                    </div>
                    <div className="divider"></div>
                    <div className="board-update-content-box">
                        <textarea
                            ref={contentRef}
                            className="board-update-content-textarea"
                            placeholder="본문을 입력해 주세요."
                            value={content}
                            onChange={onContentChangeHandler}
                        />
                        <div className="icon-button" onClick={onImageUploadButtonClickHandler}>
                            <div className="icon image-box-light-icon"></div>
                        </div>
                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={onImageChangeHandler}
                        />
                    </div>
                    <div className="board-update-images-box">
                        {imageUrls.map((imageurl, i) => (
                            <div className="board-update-image-box" key={i}>
                                <img className="board-update-image" src={imageurl} />
                                <div
                                    className="icon-button image-close"
                                    onClick={() => onImageDeleteButtonClickHandler(i)}
                                >
                                    <div className="icon close-icon"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
