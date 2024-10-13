import { Board } from 'types/inderface';
import ResponseDTO from '../Response.dto';

export default interface GetBoardResponseDTO extends ResponseDTO, Board {}
