package com.example.board_back.service;

import org.springframework.http.ResponseEntity;

import com.example.board_back.dto.response.user.GetSignInUserResponseDTO;

public interface UserService {
    ResponseEntity<? super GetSignInUserResponseDTO> getSignInUser(String email);
}
