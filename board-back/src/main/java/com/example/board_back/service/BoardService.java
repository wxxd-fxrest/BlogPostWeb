package com.example.board_back.service;

import org.springframework.http.ResponseEntity;

import com.example.board_back.dto.request.board.PostBoardRequestDTO;
import com.example.board_back.dto.response.board.GetBoardResponseDTO;
import com.example.board_back.dto.response.board.PostBoardResponseDTO;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDTO> getBoard(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDTO> postBoard(PostBoardRequestDTO dto, String email);
}
