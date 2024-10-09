package com.example.board_back.service;

import org.springframework.http.ResponseEntity;

import com.example.board_back.dto.request.auth.SignupRequestDTO;
import com.example.board_back.dto.request.auth.SigninRequestDTO;
import com.example.board_back.dto.response.auth.SignupResponseDTO;
import com.example.board_back.dto.response.auth.SigninResponseDTO;

public interface AuthService {
    ResponseEntity<? super SignupResponseDTO> signUp(SignupRequestDTO dto);
    ResponseEntity<? super SigninResponseDTO> signIn(SigninRequestDTO dto);
}
