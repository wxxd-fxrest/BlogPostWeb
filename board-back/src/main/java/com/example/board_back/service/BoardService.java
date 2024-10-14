package com.example.board_back.service;

import org.springframework.http.ResponseEntity;

import com.example.board_back.dto.request.board.PatchBoardRequestDTO;
import com.example.board_back.dto.request.board.PostBoardRequestDTO;
import com.example.board_back.dto.request.board.PostCommentRequestDTO;
import com.example.board_back.dto.response.board.DeleteBoardResponseDTO;
import com.example.board_back.dto.response.board.GetBoardResponseDTO;
import com.example.board_back.dto.response.board.GetCommentListResponseDTO;
import com.example.board_back.dto.response.board.GetFavoriteListResponseDTO;
import com.example.board_back.dto.response.board.GetLatestBoardListResponseDTO;
import com.example.board_back.dto.response.board.GetTop3BoardListResponseDTO;
import com.example.board_back.dto.response.board.IncreaseViewCountResponseDTO;
import com.example.board_back.dto.response.board.PatchBaordResponseDTO;
import com.example.board_back.dto.response.board.PostBoardResponseDTO;
import com.example.board_back.dto.response.board.PostCommentResponseDTO;
import com.example.board_back.dto.response.board.PutFavoriteResponseDTO;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDTO> getBoard(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDTO> postBoard(PostBoardRequestDTO dto, String email);
    
    ResponseEntity<? super PutFavoriteResponseDTO> putFavorite(Integer boardNumber, String email);
    ResponseEntity<? super GetFavoriteListResponseDTO> getFavoriteList(Integer boardNumber);

    ResponseEntity<? super PostCommentResponseDTO> postComment(PostCommentRequestDTO dto, Integer boardNumber, String email);
    ResponseEntity<? super GetCommentListResponseDTO> getCommentList(Integer boardNumber);
    ResponseEntity<? super IncreaseViewCountResponseDTO> increaseViewCount(Integer boardNumber);

    ResponseEntity<? super DeleteBoardResponseDTO> deleteBoard(Integer boardNumber, String email);
    ResponseEntity<? super PatchBaordResponseDTO> patchBoard(PatchBoardRequestDTO dto, Integer boardNumber, String email);

    ResponseEntity<? super GetLatestBoardListResponseDTO> getLatestBoardList();
    ResponseEntity<? super GetTop3BoardListResponseDTO> getTop3BoardList();
}