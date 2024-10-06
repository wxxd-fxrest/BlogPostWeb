package com.example.board_back.dto.object;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class commentListItem {
    private String nickname;
    private String profileImage;
    private String writeDatetime;
    private String content;
}
