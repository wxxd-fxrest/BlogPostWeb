package com.example.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.board_back.dto.request.user.PatchNicknameRequestDTO;
import com.example.board_back.dto.request.user.PatchProfileImageRequestDTO;
import com.example.board_back.dto.response.ResponseDTO;
import com.example.board_back.dto.response.user.GetSignInUserResponseDTO;
import com.example.board_back.dto.response.user.GetUserResponseDTO;
import com.example.board_back.dto.response.user.PatchNicknameResponseDTO;
import com.example.board_back.dto.response.user.PatchProfileImageResponseDTO;
import com.example.board_back.entity.UserEntity;
import com.example.board_back.repository.UserRepository;
import com.example.board_back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {
    private final UserRepository userRepository; 

    // description: GET sign in 
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

    // description: GET user data
    @Override
    public ResponseEntity<? super GetUserResponseDTO> getUser(String email) {
        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return GetUserResponseDTO.notExistUser();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetUserResponseDTO.success(userEntity);
    }

    // description: PATCH nickname
    @Override
    public ResponseEntity<? super PatchNicknameResponseDTO> patchNickname(PatchNicknameRequestDTO dto, String email) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return PatchNicknameResponseDTO.notExistUser();

            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if(existedNickname) return PatchNicknameResponseDTO.duplicateNickname();

            userEntity.setNickname(nickname);
            userRepository.save(userEntity);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return PatchNicknameResponseDTO.success();
    }

    // description: PATCH profile image
    @Override
    public ResponseEntity<? super PatchProfileImageResponseDTO> patchProfileImage(PatchProfileImageRequestDTO dto,
    String email) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return PatchProfileImageResponseDTO.notExistUser();

            String profileImage = dto.getProfileImage();
            userEntity.setProfileImage(profileImage);
            userRepository.save(userEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return PatchProfileImageResponseDTO.success();
    }
}
