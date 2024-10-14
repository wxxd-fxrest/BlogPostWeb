package com.example.board_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board_back.dto.response.search.GetPopularListResponseDTO;
import com.example.board_back.service.SearchServiece;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchServiece searchServiece;

    @GetMapping("/popular-list")
    public ResponseEntity<? super GetPopularListResponseDTO> getPopularList() {
        ResponseEntity<? super GetPopularListResponseDTO> response = searchServiece.getPopularList();
        return response;
    }
}
