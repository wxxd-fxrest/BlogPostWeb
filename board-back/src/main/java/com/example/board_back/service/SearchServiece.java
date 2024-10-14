package com.example.board_back.service;

import org.springframework.http.ResponseEntity;

import com.example.board_back.dto.response.search.GetPopularListResponseDTO;
import com.example.board_back.dto.response.search.GetRelationListResponseDTO;

public interface SearchServiece {
    ResponseEntity<? super GetPopularListResponseDTO> getPopularList();
    ResponseEntity<? super GetRelationListResponseDTO> getRelationList(String searchWord);
}
