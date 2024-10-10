package com.example.board_back.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.board_back.common.ResponseCode;
import com.example.board_back.common.ResponseMessage;
import com.example.board_back.dto.response.ResponseDTO;
import com.example.board_back.entity.UserEntity;

import lombok.Getter;

@Getter
public class GetSignInUserResponseDTO extends ResponseDTO {
    private String email;
    private String nickname;
    private String profileImage;

    private GetSignInUserResponseDTO(UserEntity userEntity) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = userEntity.getEmail();
        this.nickname = userEntity.getNickname();
        this.profileImage = userEntity.getProfileImage();
    }

    public static ResponseEntity<GetSignInUserResponseDTO> success(UserEntity userEntity) {
        GetSignInUserResponseDTO result = new GetSignInUserResponseDTO(userEntity);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDTO> notExistUser() {
        ResponseDTO result = new ResponseDTO(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}
