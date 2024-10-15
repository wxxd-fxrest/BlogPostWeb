import { BoardListItem } from 'types/inderface';
import ResponseDTO from '../Response.dto';

export default interface GetUserBoardListResponseDTO extends ResponseDTO {
    userBoardList: BoardListItem[];
}
