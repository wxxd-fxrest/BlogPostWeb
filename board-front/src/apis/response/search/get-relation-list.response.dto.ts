import ResponseDTO from '../Response.dto';

export default interface GetRelationListResponseDTO extends ResponseDTO {
    relativeWordList: string[];
}
