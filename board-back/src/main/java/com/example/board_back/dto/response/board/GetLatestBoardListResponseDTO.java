package com.example.board_back.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.board_back.common.ResponseCode;
import com.example.board_back.common.ResponseMessage;
import com.example.board_back.dto.object.BoardListItem;
import com.example.board_back.dto.response.ResponseDTO;
import com.example.board_back.entity.BoardListViewEntity;

import lombok.Getter;

@Getter
public class GetLatestBoardListResponseDTO extends ResponseDTO {
    private List<BoardListItem> latestList;

    private GetLatestBoardListResponseDTO(List<BoardListViewEntity> boardEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.latestList = BoardListItem.getList(boardEntities);
    }

    public static ResponseEntity<GetLatestBoardListResponseDTO> success(List<BoardListViewEntity> boardEntities) {
        GetLatestBoardListResponseDTO result = new GetLatestBoardListResponseDTO(boardEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
