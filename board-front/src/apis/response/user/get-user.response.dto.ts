import { User } from 'types/inderface';
import ResponseDTO from '../Response.dto';

export default interface GetUserResponseDTO extends ResponseDTO, User {}
