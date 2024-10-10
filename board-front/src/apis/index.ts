import axios from 'axios';
import { SigninRequestDTO, SignupRequestDTO } from './request/auth';
import { ResponseDTO } from './response';
import { SigninResponseDTO, SignupResponseDTO } from './response/auth';
import { GetSignInUserResponseDTO } from './response/user';

const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization = (accessToken: string) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } };
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

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
