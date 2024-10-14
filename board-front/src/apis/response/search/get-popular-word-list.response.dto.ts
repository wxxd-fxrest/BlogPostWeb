import ResponseDTO from '../Response.dto';

export default interface GetPopularWordListResponseDTO extends ResponseDTO {
    popularWordList: string[];
}
