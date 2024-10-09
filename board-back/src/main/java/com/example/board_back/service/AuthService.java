package com.example.board_back.service;

import org.springframework.http.ResponseEntity;

import com.example.board_back.dto.request.auth.SignupRequestDTO;
import com.example.board_back.dto.response.auth.SignupResponseDTO;

public interface AuthService {
    ResponseEntity<? super SignupResponseDTO> signUp(SignupRequestDTO dto);
}
