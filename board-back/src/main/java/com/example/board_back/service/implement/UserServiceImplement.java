package com.example.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.board_back.dto.response.ResponseDTO;
import com.example.board_back.dto.response.user.GetSignInUserResponseDTO;
import com.example.board_back.entity.UserEntity;
import com.example.board_back.repository.UserRepository;
import com.example.board_back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {
    private final UserRepository userRepository; 

    @Override
    public ResponseEntity<? super GetSignInUserResponseDTO> getSignInUser(String email) {
        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return GetSignInUserResponseDTO.notExistUser();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetSignInUserResponseDTO.success(userEntity);
    }
}
