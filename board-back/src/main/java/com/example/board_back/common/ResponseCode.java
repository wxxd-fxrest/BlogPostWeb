package com.example.board_back.common;

// public interface에서는 
// public static final String SUCCESS = "SU"; 를 
// String SUCCESS = "SU";로 해도 public static final로 인식함 
public interface ResponseCode {
    // HTTP Status 200
    String SUCCESS = "SU";
    // HTTP Status 400
    String VALIDATION_FAILED = "VF";
    String DUPLICATE_EMAIL = "DE";
    String DUPLICATE_NICKNAME = "DN";
    String DUPLICATE_TEL_NUMBER = "DT";
    String NOT_EXISTED_USER = "NU";
    String NOT_EXISTED_BOARD = "NB";

    // HTTP Status 401
    String SIGN_IN_FAIL = "SF";
    String AUTHORIZATION_FAIL = "AF";
    
    // HTTP Status 403
    String NO_PERMISSION = "NP";

    // HTTP Status 500
    String DATABASE_ERROR = "DBE";
}
