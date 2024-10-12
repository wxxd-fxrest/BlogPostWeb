package com.example.board_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board_back.dto.request.board.PostBoardRequestDTO;
import com.example.board_back.dto.response.board.GetBoardResponseDTO;
import com.example.board_back.dto.response.board.PostBoardResponseDTO;
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
    
    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDTO> getBoard(@PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super GetBoardResponseDTO> response = boardService.getBoard(boardNumber);
        return response;
    }
}