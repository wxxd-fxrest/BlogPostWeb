import ResponseDTO from '../Response.dto';

export default interface SigninResponseDTO extends ResponseDTO {
    token: string;
    expirationTime: number;
}
