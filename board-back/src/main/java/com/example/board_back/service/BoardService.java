package com.example.board_back.service;

import org.springframework.http.ResponseEntity;

import com.example.board_back.dto.request.board.PostBoardRequestDTO;
import com.example.board_back.dto.request.board.PostCommentRequestDTO;
import com.example.board_back.dto.response.board.GetBoardResponseDTO;
import com.example.board_back.dto.response.board.GetFavoriteListResponseDTO;
import com.example.board_back.dto.response.board.PostBoardResponseDTO;
import com.example.board_back.dto.response.board.PostCommentResponseDTO;
import com.example.board_back.dto.response.board.PutFavoriteResponseDTO;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDTO> getBoard(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDTO> postBoard(PostBoardRequestDTO dto, String email);
    
    ResponseEntity<? super PutFavoriteResponseDTO> putFavorite(Integer boardNumber, String email);
    ResponseEntity<? super GetFavoriteListResponseDTO> getFavoriteList(Integer boardNumber);

    ResponseEntity<? super PostCommentResponseDTO> postComment(PostCommentRequestDTO dto, Integer boardNumber, String email);
}