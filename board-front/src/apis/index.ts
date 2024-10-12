import axios from 'axios';
import { SigninRequestDTO, SignupRequestDTO } from './request/auth';
import { PostBoardRequestDTO } from './request/baord';
import { ResponseDTO } from './response';
import { SigninResponseDTO, SignupResponseDTO } from './response/auth';
import { PostBoardResponseDTO } from './response/board';
import { GetSignInUserResponseDTO } from './response/user';

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
export const GetSignInUserRequest = async (accessToken: string) => {
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
