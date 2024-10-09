package com.example.board_back.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.board_back.common.ResponseCode;
import com.example.board_back.common.ResponseMessage;
import com.example.board_back.dto.response.ResponseDTO;

import lombok.Getter;

@Getter
public class SigninResponseDTO extends ResponseDTO {
    private String token;
    private int expirationTime; 

    private SigninResponseDTO(String token) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.token = token; 
        this.expirationTime = 3600;
    }

    public static ResponseEntity<SigninResponseDTO> success(String token) {
        SigninResponseDTO result = new SigninResponseDTO(token);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDTO> signInFail() {
        ResponseDTO result = new ResponseDTO(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}
