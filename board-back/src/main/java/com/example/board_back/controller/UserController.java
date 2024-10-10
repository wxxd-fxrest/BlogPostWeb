package com.example.board_back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.board_back.dto.response.user.GetSignInUserResponseDTO;
import com.example.board_back.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<? super GetSignInUserResponseDTO> getSignInUser(@AuthenticationPrincipal String email) {
        ResponseEntity<? super GetSignInUserResponseDTO> response = userService.getSignInUser(email);
        return response;
    }
}
