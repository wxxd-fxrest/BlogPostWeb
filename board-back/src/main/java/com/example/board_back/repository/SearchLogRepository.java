package com.example.board_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.board_back.entity.SearchLogEntity;
import com.example.board_back.repository.resultSet.GetPopularListResultSet;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {
    @Query (
        value = 
        "SELECT search_word as getSearchWord, count(search_word) as count " +
        "From search_log " +
        "Where relation is false " +
        "Group By search_word " +
        "Order By count DESC " +
        "Limit 15 ",
        nativeQuery=true
    )
    List<GetPopularListResultSet> getPopularList();
}
