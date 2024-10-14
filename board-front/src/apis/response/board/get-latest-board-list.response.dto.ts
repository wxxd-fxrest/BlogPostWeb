import { BoardListItem } from 'types/inderface';
import ResponseDTO from '../Response.dto';

export default interface GetLatestBoardListResponseDTO extends ResponseDTO {
    latestList: BoardListItem[];
}
