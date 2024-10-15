import axios from 'axios';
import { SigninRequestDTO, SignupRequestDTO } from './request/auth';
import { patchBoardRequestDTO, PostBoardRequestDTO, PostCommentRequestDTO } from './request/baord';
import { PatchNicknameRequestDTO, PatchProfileImageRequestDTO } from './request/user';
import { ResponseDTO } from './response';
import { SigninResponseDTO, SignupResponseDTO } from './response/auth';
import {
    GetBoardResponseDTO,
    GetCommentListResponseDTO,
    GetFavoriteListResponseDTO,
    GetLatestBoardListResponseDTO,
    GetSearchBoardListResponseDTO,
    GetTop3BoardListResponseDTO,
    GetUserBoardListResponseDTO,
    IncreaseViewCountResponseDTO,
    PatchBoardResponseDTO,
    PostBoardResponseDTO,
    PostCommentResponseDTO,
    PutFavoriteResponseDTO,
} from './response/board';
import { GetPopularWordListResponseDTO, GetRelationListResponseDTO } from './response/search';
import {
    GetSignInUserResponseDTO,
    GetUserResponseDTO,
    PatchNicknameResponseDTO,
    PatchProfileImageResponseDTO,
} from './response/user';

const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = `${DOMAIN}/api/v1`;

// description: Auth
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

// description: GET user
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const authorization = (accessToken: string) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } };
};

// description: POST file
const FILE_DOMAIN = `${DOMAIN}/file`;
const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;
const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };

// description: POST board
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;

// description: GET board
const GET_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;

// description: GET increase view count
const INCREASE_VIEW_COUTN_URL = (boardNumber: number | string) =>
    `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;

// description: GET favorite list
const GET_FAVORITE_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;

// description: GET comment list
const GET_COMMENT_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;

// description: PUT favorite
const PUT_FAVORITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite`;

// description: POST comment
const POST_COMMENT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/comment`;

// description: DELETE comment delete
const DELETE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;

// description: PATCH board update
const PATCH_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;

// description: GET latest board list
const GET_LATEST_BOARD_LIST_URL = () => `${API_DOMAIN}/board/latest-list`;

// description: GET top3 list
const GET_TOP_3_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top-3`;

// description: GET popular word list
const GET_POPULAR_WORD_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;

// description: GET search board list
const GET_SEARCH_BOARD_LIST_URL = (searchWord: string, preSearchWord: string | null) =>
    `${API_DOMAIN}/board/search-list/${searchWord}${preSearchWord ? '/' + preSearchWord : ''}`;

// description: GET relation search word list
const GET_RELATION_LIST_URL = (searchWord: string) => `${API_DOMAIN}/search/${searchWord}/relation-list`;

// description: GET user board list
const GET_USER_URL = (email: string) => `${API_DOMAIN}/user/${email}`; // 현재 로그인한 사용자
const GET_USER_BOARD_LIST_URL = (email: string) => `${API_DOMAIN}/board/user-board-list/${email}`; // 타 사용자

// description: PATCH nickname/profile-image
const PATCH_NICKNAME_URL = () => `${API_DOMAIN}/user/nickname`;
const PATCH_PROFILE_IMAGE_URL = () => `${API_DOMAIN}/user/profile-image`;

// function: Sign in API
export const signInRequest = async (requestBody: SigninRequestDTO) => {
    const result = await axios
        .post(SIGN_IN_URL(), requestBody)
        .then((response) => {
            console.log(SIGN_IN_URL());
            console.log(response);
            const responseBody: SigninResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            console.log(error);
            if (!error.response.data) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Sign up API
export const signUpRequest = async (requestBody: SignupRequestDTO) => {
    const result = await axios
        .post(SIGN_UP_URL(), requestBody)
        .then((response) => {
            const responseBody: SignupResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response.data) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get login user API
export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios
        .get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then((response) => {
            const responseBody: GetSignInUserResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Post board API
export const postBoardRequest = async (requestBody: PostBoardRequestDTO, accessToken: string) => {
    const result = await axios
        .post(POST_BOARD_URL(), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody: PostBoardResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Upload image API
export const fileUploadRequest = async (data: FormData) => {
    const result = await axios
        .post(FILE_UPLOAD_URL(), data, multipartFormData)
        .then((response) => {
            const responseBody: string = response.data;
            return responseBody;
        })
        .catch((error) => {
            return null;
        });
    return result;
};

// function: Get Board data API
export const getBoardRequest = async (boardNumber: number | string) => {
    const result = await axios
        .get(GET_BOARD_URL(boardNumber))
        .then((response) => {
            const responseBody: GetBoardResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get increase view count API
export const increaseViewCountRequest = async (boardNumber: number | string) => {
    const result = await axios
        .get(INCREASE_VIEW_COUTN_URL(boardNumber))
        .then((response) => {
            const responseBody: IncreaseViewCountResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get favorite API
export const getFavoriteListRequest = async (boardNumber: number | string) => {
    const result = await axios
        .get(GET_FAVORITE_LIST_URL(boardNumber))
        .then((response) => {
            const responseBody: GetFavoriteListResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get comment API
export const getCommentListRequest = async (boardNumber: number | string) => {
    const result = await axios
        .get(GET_COMMENT_LIST_URL(boardNumber))
        .then((response) => {
            const responseBody: GetCommentListResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Put favorite API
export const putFavoriteRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios
        .put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
        .then((response) => {
            const responseBody: PutFavoriteResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Post comment API
export const postCommentRequest = async (
    boardNumber: number | string,
    requestBody: PostCommentRequestDTO,
    accessToken: string
) => {
    const result = await axios
        .post(POST_COMMENT_URL(boardNumber), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody: PostCommentResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Delete board API
export const deleteBoardRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios
        .delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
        .then((response) => {
            const responseBody: PostCommentResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Patch board update API
export const patchBoardRequest = async (
    boardNumber: number | string,
    requestBody: patchBoardRequestDTO,
    accessToken: string
) => {
    const result = await axios
        .patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody: PatchBoardResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get latest board list API
export const getLatestBoardListRequest = async () => {
    const result = await axios
        .get(GET_LATEST_BOARD_LIST_URL())
        .then((response) => {
            const responseBody: GetLatestBoardListResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get top3 board list API
export const getTop3BoardListRequest = async () => {
    const result = await axios
        .get(GET_TOP_3_BOARD_LIST_URL())
        .then((response) => {
            const responseBody: GetTop3BoardListResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get popular word list API
export const getPopularWordListRequest = async () => {
    const result = await axios
        .get(GET_POPULAR_WORD_LIST_URL())
        .then((response) => {
            const responseBody: GetPopularWordListResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get search board list API
export const getSearchBoardListRequest = async (searchWord: string, preSearchWord: string | null) => {
    const result = await axios
        .get(GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord))
        .then((response) => {
            const responseBody: GetSearchBoardListResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get relation list API
export const getRelationListRequest = async (searchWord: string) => {
    const result = await axios
        .get(GET_RELATION_LIST_URL(searchWord))
        .then((response) => {
            const responseBody: GetRelationListResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get user board list API (타유저)
export const getUserBoardListRequest = async (email: string) => {
    const result = await axios
        .get(GET_USER_BOARD_LIST_URL(email))
        .then((response) => {
            const responseBody: GetUserBoardListResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Get user API (로그인한 사용자)
export const getUserRequest = async (email: string) => {
    const result = await axios
        .get(GET_USER_URL(email))
        .then((response) => {
            const responseBody: GetUserResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Patch nickname API
export const patchNicknameRequest = async (requestBody: PatchNicknameRequestDTO, accessToken: string) => {
    const result = await axios
        .patch(PATCH_NICKNAME_URL(), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody: PatchNicknameResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};

// function: Patch profile image API
export const patchProfileImageRequest = async (requestBody: PatchProfileImageRequestDTO, accessToken: string) => {
    const result = await axios
        .patch(PATCH_PROFILE_IMAGE_URL(), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody: PatchProfileImageResponseDTO = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
};
