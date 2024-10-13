package com.example.board_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board_back.dto.request.board.PostBoardRequestDTO;
import com.example.board_back.dto.request.board.PostCommentRequestDTO;
import com.example.board_back.dto.response.board.GetBoardResponseDTO;
import com.example.board_back.dto.response.board.GetCommentListResponseDTO;
import com.example.board_back.dto.response.board.GetFavoriteListResponseDTO;
import com.example.board_back.dto.response.board.IncreaseViewCountResponseDTO;
import com.example.board_back.dto.response.board.PostBoardResponseDTO;
import com.example.board_back.dto.response.board.PostCommentResponseDTO;
import com.example.board_back.dto.response.board.PutFavoriteResponseDTO;
import com.example.board_back.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDTO> postBoard(@RequestBody @Valid PostBoardRequestDTO requestBody, @AuthenticationPrincipal String email) {
        ResponseEntity<? super PostBoardResponseDTO> response = boardService.postBoard(requestBody, email);
        return response;
    }

    @PutMapping("/{boardNumber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDTO> putFavorite(@PathVariable("boardNumber") Integer boardNumber, @AuthenticationPrincipal String email) {
        ResponseEntity<? super PutFavoriteResponseDTO> response = boardService.putFavorite(boardNumber, email);
        return response; 
    }

    @GetMapping("/{boardNumber}/favorite-list")
    public ResponseEntity<? super GetFavoriteListResponseDTO> getFavoriteList(@PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super GetFavoriteListResponseDTO> response = boardService.getFavoriteList(boardNumber);
        return response; 
    }
    
    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDTO> getBoard(@PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super GetBoardResponseDTO> response = boardService.getBoard(boardNumber);
        return response;
    }

    @PostMapping("/{boardNumber}/comment")
    public ResponseEntity<? super PostCommentResponseDTO> postComment(@RequestBody @Valid PostCommentRequestDTO requestBody, @PathVariable("boardNumber") Integer boardNumber, @AuthenticationPrincipal String email) {
        ResponseEntity<? super PostCommentResponseDTO> response = boardService.postComment(requestBody, boardNumber, email);
        return response; 
    }

    @GetMapping("/{boardNumber}/comment-list")
    public ResponseEntity<? super GetCommentListResponseDTO> getCommentList(@PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super GetCommentListResponseDTO> response = boardService.getCommentList(boardNumber);
        return response;
    }

    @GetMapping("/{boardNumber}/increase-view-count")
    public ResponseEntity<? super IncreaseViewCountResponseDTO> increasseViewCount(@PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super IncreaseViewCountResponseDTO> response = boardService.increaseViewCount(boardNumber);
        return response;
    }
}