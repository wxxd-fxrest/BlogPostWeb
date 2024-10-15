package com.example.board_back.service;

import org.springframework.http.ResponseEntity;

import com.example.board_back.dto.request.user.PatchNicknameRequestDTO;
import com.example.board_back.dto.request.user.PatchProfileImageRequestDTO;
import com.example.board_back.dto.response.user.GetSignInUserResponseDTO;
import com.example.board_back.dto.response.user.GetUserResponseDTO;
import com.example.board_back.dto.response.user.PatchNicknameResponseDTO;
import com.example.board_back.dto.response.user.PatchProfileImageResponseDTO;

public interface UserService {
    ResponseEntity<? super GetSignInUserResponseDTO> getSignInUser(String email);
    ResponseEntity<? super GetUserResponseDTO> getUser(String email);
    ResponseEntity<? super PatchNicknameResponseDTO> patchNickname(PatchNicknameRequestDTO dto, String email);
    ResponseEntity<? super PatchProfileImageResponseDTO> patchProfileImage(PatchProfileImageRequestDTO dto, String email);
}
