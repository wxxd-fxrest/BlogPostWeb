package com.example.board_back.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.board_back.dto.response.ResponseDTO;
import com.example.board_back.dto.response.search.GetPopularListResponseDTO;
import com.example.board_back.repository.SearchLogRepository;
import com.example.board_back.repository.resultSet.GetPopularListResultSet;
import com.example.board_back.service.SearchServiece;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImplement implements SearchServiece {
    private final SearchLogRepository searchLogRepository;
    
    @Override
    public ResponseEntity<? super GetPopularListResponseDTO> getPopularList() {
        List<GetPopularListResultSet> resultSets = new ArrayList<>();

        try {
            resultSets = searchLogRepository.getPopularList();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetPopularListResponseDTO.success(resultSets);
    }
}
