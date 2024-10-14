package com.example.board_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board_back.dto.request.board.PatchBoardRequestDTO;
import com.example.board_back.dto.request.board.PostBoardRequestDTO;
import com.example.board_back.dto.request.board.PostCommentRequestDTO;
import com.example.board_back.dto.response.board.DeleteBoardResponseDTO;
import com.example.board_back.dto.response.board.GetBoardResponseDTO;
import com.example.board_back.dto.response.board.GetCommentListResponseDTO;
import com.example.board_back.dto.response.board.GetFavoriteListResponseDTO;
import com.example.board_back.dto.response.board.GetLatestBoardListResponseDTO;
import com.example.board_back.dto.response.board.GetSearchBoardListResponseDTO;
import com.example.board_back.dto.response.board.GetTop3BoardListResponseDTO;
import com.example.board_back.dto.response.board.IncreaseViewCountResponseDTO;
import com.example.board_back.dto.response.board.PatchBaordResponseDTO;
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

    @DeleteMapping("/{boardNumber}")
    public ResponseEntity<? super DeleteBoardResponseDTO> deleteBoard(@PathVariable("boardNumber") Integer boardNumber, @AuthenticationPrincipal String email) {
        ResponseEntity<? super DeleteBoardResponseDTO> response = boardService.deleteBoard(boardNumber, email);
        return response;
    }

    @PatchMapping("/{boardNumber}")
    public ResponseEntity<? super PatchBaordResponseDTO> patchBoard(@RequestBody @Valid PatchBoardRequestDTO requestBody, @PathVariable("boardNumber") Integer boardNumber, @AuthenticationPrincipal String email) {
        ResponseEntity<? super PatchBaordResponseDTO> response = boardService.patchBoard(requestBody, boardNumber, email);
        return response;
    }

    @GetMapping("/latest-list")
    public ResponseEntity<? super GetLatestBoardListResponseDTO> getLatestBoardList() {
        ResponseEntity<? super GetLatestBoardListResponseDTO>  response = boardService.getLatestBoardList();
        return response;
    }
    
    @GetMapping("/top-3")
    public ResponseEntity<? super GetTop3BoardListResponseDTO> getTop3BoardList() {
        ResponseEntity<? super GetTop3BoardListResponseDTO>  response = boardService.getTop3BoardList();
        return response;
    }

    @GetMapping(value = {"/search-list/{searchWord}", "/search-list/{searchWord}/{preSearchWord}"})
    public ResponseEntity<? super GetSearchBoardListResponseDTO> getSearchBordList(@PathVariable("searchWord") String searchWord, @PathVariable(value = "preSearchWord", required = false) String preSearchWord) {
        ResponseEntity<? super GetSearchBoardListResponseDTO> response = boardService.getSearchBoardList(searchWord, preSearchWord);
        return response; 
    }
}