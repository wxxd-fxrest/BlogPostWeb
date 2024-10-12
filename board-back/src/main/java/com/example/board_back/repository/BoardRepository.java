package com.example.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.board_back.entity.BoardEntity;
import com.example.board_back.repository.resultSet.GetBoardResultSet;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    // POST put favorite
    // boolean existsByBoardNumber(Integer boardNumber);

    // GET specific board 
    BoardEntity findByBoardNumber(Integer boardNumber);

    @Query(
        value = "SELECT " +
            "B.board_number as boardNumber, " +
            "B.title as title, " +
            "B.content as content, " +
            "B.write_datetime as writeDatetime, " +
            "B.writer_email as writerDmail, " +
            "U.nickname as writerNickname, " +
            "U.profile_image as writerProfileImage " +
            "From board as B " +
            "Inner Join user as U " +
            "On B.writer_email = U.email " +
            "Where board_number = ?1 ",
            nativeQuery = true
    )
    
    GetBoardResultSet getBoard(Integer boardNumber);
}
