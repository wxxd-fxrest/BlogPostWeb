import { BoardListItem } from 'types/inderface';
import ResponseDTO from '../Response.dto';

export default interface GetTop3BoardListResponseDTO extends ResponseDTO {
    top3list: BoardListItem[];
}
