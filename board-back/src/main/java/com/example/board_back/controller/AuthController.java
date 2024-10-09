package com.example.board_back.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board_back.dto.request.auth.SigninRequestDTO;
import com.example.board_back.dto.request.auth.SignupRequestDTO;
import com.example.board_back.dto.response.auth.SigninResponseDTO;
import com.example.board_back.dto.response.auth.SignupResponseDTO;
import com.example.board_back.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService; 

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignupResponseDTO> signUp(@RequestBody @Valid SignupRequestDTO requestBody) {
        ResponseEntity<? super SignupResponseDTO> response = authService.signUp(requestBody); 
        return response; 
    }
    
    @PostMapping("/sign-in")
    public ResponseEntity<? super SigninResponseDTO> signIn(@RequestBody @Valid SigninRequestDTO requestBody) {
        ResponseEntity<? super SigninResponseDTO> response = authService.signIn(requestBody);
        return response;
    }
    
}
