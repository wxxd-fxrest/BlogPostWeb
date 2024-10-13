import { CommentListItem } from 'types/inderface';
import ResponseDTO from '../Response.dto';

export default interface GetCommentListResponseDTO extends ResponseDTO {
    commentList: CommentListItem[];
}
