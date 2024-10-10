package com.example.board_back.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.board_back.dto.response.ResponseDTO;

@RestControllerAdvice
public class BadRequestExceptionHandler {
    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})
    public ResponseEntity<ResponseDTO> validationExceptionHandler(Exception exception) {
        return ResponseDTO.validationFailed();
    }
}
