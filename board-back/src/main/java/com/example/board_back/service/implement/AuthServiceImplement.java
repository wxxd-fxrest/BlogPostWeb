package com.example.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.board_back.dto.request.auth.SigninRequestDTO;
import com.example.board_back.dto.request.auth.SignupRequestDTO;
import com.example.board_back.dto.response.ResponseDTO;
import com.example.board_back.dto.response.auth.SigninResponseDTO;
import com.example.board_back.dto.response.auth.SignupResponseDTO;
import com.example.board_back.entity.UserEntity;
import com.example.board_back.provider.JwtProvider;
import com.example.board_back.repository.UserRepository;
import com.example.board_back.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<? super SignupResponseDTO> signUp(SignupRequestDTO dto) {
        try {
            String email = dto.getEmail();
            boolean existedEmail = userRepository.existsByEmail(email);
            if (existedEmail) return SignupResponseDTO.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if(existedNickname) return SignupResponseDTO.duplicateNickname();
            
            String telNumber = dto.getTelNumber();
            boolean existedTelnumber = userRepository.existsByTelNumber(telNumber);
            if(existedTelnumber) return SignupResponseDTO.duplicateTelNumber();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }
        return SignupResponseDTO.success();
    }

    @Override
    public ResponseEntity<? super SigninResponseDTO> signIn(SigninRequestDTO dto) {
        String token = null;

        try {
            String email = dto.getEmail();
            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return SigninResponseDTO.signInFail();

            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            boolean isMathced = passwordEncoder.matches(password, encodedPassword);
            if(!isMathced) return SigninResponseDTO.signInFail();

            token = jwtProvider.create(email);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return SigninResponseDTO.success(token);
    }
}
