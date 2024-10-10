import { User } from 'types/inderface';
import ResponseDTO from '../Response.dto';

export default interface GetSignInUserResponseDTO extends ResponseDTO, User {}
