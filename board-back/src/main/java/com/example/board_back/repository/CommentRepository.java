package com.example.board_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.board_back.entity.CommentEntity;
import com.example.board_back.repository.resultSet.GetCommentListResultSet;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> { 

    @Query(
        value = "SELECT " +
        "U.nickname as nickname, " +
        "U.profile_image as profileImage, " +
        "U.email as userEmail, " + 
        "C.write_datetime as writeDatetime, " +
        "C.content as content " +
        "From comment as C " +
        "Inner Join user as U " +
        "On C.user_email = U.email " +
        "Where C.board_number = ?1 " +
        "Order By write_datetime DESC ", 
        nativeQuery = true
    )

    List<GetCommentListResultSet> getCommentList(Integer boardNumber);
}
