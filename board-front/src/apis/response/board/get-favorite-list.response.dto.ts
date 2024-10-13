import { FavoriteListItem } from 'types/inderface';
import ResponseDTO from '../Response.dto';

export default interface GetFavoriteListResponseDTO extends ResponseDTO {
    favoriteList: FavoriteListItem[];
}
