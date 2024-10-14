import { BoardListItem } from 'types/inderface';
import ResponseDTO from '../Response.dto';

export default interface GetSearchBoardListResponseDTO extends ResponseDTO {
    searchList: BoardListItem[];
}
