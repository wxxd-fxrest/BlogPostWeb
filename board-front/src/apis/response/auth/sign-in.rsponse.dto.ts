import ResponseDTO from '../response.dto';

export default interface SigninResponseDTO extends ResponseDTO {
    token: string;
    expirationTime: number;
}
