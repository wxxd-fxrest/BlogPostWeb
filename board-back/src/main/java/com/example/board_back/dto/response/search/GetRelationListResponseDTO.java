package com.example.board_back.dto.response.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.board_back.common.ResponseCode;
import com.example.board_back.common.ResponseMessage;
import com.example.board_back.dto.response.ResponseDTO;
import com.example.board_back.repository.resultSet.GetRelationResultSet;

import lombok.Getter;

@Getter
public class GetRelationListResponseDTO extends ResponseDTO {
    private List<String> relativeWordList;

    private GetRelationListResponseDTO(List<GetRelationResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        List<String> relativeWordList = new ArrayList<>();
        for(GetRelationResultSet resultSet: resultSets) {
            String relativeWord = resultSet.getSearchWord();
            relativeWordList.add(relativeWord);
        }
        this.relativeWordList = relativeWordList;
    }

    public static ResponseEntity<GetRelationListResponseDTO> success(List<GetRelationResultSet> resultSets) {
        GetRelationListResponseDTO result = new GetRelationListResponseDTO(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
