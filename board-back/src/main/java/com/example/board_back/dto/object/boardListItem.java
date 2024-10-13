package com.example.board_back.dto.object;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardListItem {
    private int board_number;
    private String title;
    private String content;
    private String boardTitleImage;
    private int favoriteCount;
    private int commentCount;
    private int viewCount;
    private String writeDatetime;
    private String writerNickname;
    private String writerEmail;
    private String writerProfileImage;
}