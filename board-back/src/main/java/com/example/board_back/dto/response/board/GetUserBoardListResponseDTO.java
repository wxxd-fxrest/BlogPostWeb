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
public class GetUserBoardListResponseDTO extends ResponseDTO {
    private List<BoardListItem> userBoardList;

    private GetUserBoardListResponseDTO(List<BoardListViewEntity> boardListViewEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.userBoardList = BoardListItem.getList(boardListViewEntities);
    }

    public static ResponseEntity<GetUserBoardListResponseDTO> success(List<BoardListViewEntity> boardListViewEntities) {
        GetUserBoardListResponseDTO result = new GetUserBoardListResponseDTO(boardListViewEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDTO> noExistUser() {
        ResponseDTO result = new ResponseDTO(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
