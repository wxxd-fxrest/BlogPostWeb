package com.example.board_back.service.implement;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.board_back.dto.request.board.PatchBoardRequestDTO;
import com.example.board_back.dto.request.board.PostBoardRequestDTO;
import com.example.board_back.dto.request.board.PostCommentRequestDTO;
import com.example.board_back.dto.response.ResponseDTO;
import com.example.board_back.dto.response.board.DeleteBoardResponseDTO;
import com.example.board_back.dto.response.board.GetBoardResponseDTO;
import com.example.board_back.dto.response.board.GetCommentListResponseDTO;
import com.example.board_back.dto.response.board.GetFavoriteListResponseDTO;
import com.example.board_back.dto.response.board.GetLatestBoardListResponseDTO;
import com.example.board_back.dto.response.board.GetSearchBoardListResponseDTO;
import com.example.board_back.dto.response.board.GetTop3BoardListResponseDTO;
import com.example.board_back.dto.response.board.GetUserBoardListResponseDTO;
import com.example.board_back.dto.response.board.IncreaseViewCountResponseDTO;
import com.example.board_back.dto.response.board.PatchBaordResponseDTO;
import com.example.board_back.dto.response.board.PostBoardResponseDTO;
import com.example.board_back.dto.response.board.PostCommentResponseDTO;
import com.example.board_back.dto.response.board.PutFavoriteResponseDTO;
import com.example.board_back.entity.BoardEntity;
import com.example.board_back.entity.BoardListViewEntity;
import com.example.board_back.entity.CommentEntity;
import com.example.board_back.entity.FavoriteEntity;
import com.example.board_back.entity.ImageEntity;
import com.example.board_back.entity.SearchLogEntity;
import com.example.board_back.repository.BoardListViewRepository;
import com.example.board_back.repository.BoardRepository;
import com.example.board_back.repository.CommentRepository;
import com.example.board_back.repository.FavoriteRepository;
import com.example.board_back.repository.ImageRepository;
import com.example.board_back.repository.SearchLogRepository;
import com.example.board_back.repository.UserRepository;
import com.example.board_back.repository.resultSet.GetBoardResultSet;
import com.example.board_back.repository.resultSet.GetCommentListResultSet;
import com.example.board_back.repository.resultSet.GetFavoriteListResultSet;
import com.example.board_back.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final FavoriteRepository favoriteRepository;
    private final CommentRepository commentRepository;
    private final BoardListViewRepository boardListViewRepository;
    private final SearchLogRepository searchLogRepository;

    // description: POST board 
    @Override
    public ResponseEntity<? super PostBoardResponseDTO> postBoard(PostBoardRequestDTO dto, String email) {
        try {
            boolean existedEmail = userRepository.existsByEmail(email);
            if(!existedEmail) return PostBoardResponseDTO.noExistUser();

            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            for(String image: boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }

            imageRepository.saveAll(imageEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return PostBoardResponseDTO.success();
    }

    // description: GET specific board 
    @Override
    public ResponseEntity<? super GetBoardResponseDTO> getBoard(Integer boardNumber) {
        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();

        try {
            resultSet = boardRepository.getBoard(boardNumber);
            if(resultSet == null) return GetBoardResponseDTO.noExistBoard();

            imageEntities = imageRepository.findByBoardNumber(boardNumber);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetBoardResponseDTO.success(resultSet, imageEntities);
    }

    // description: PUT put favorite
    @Override
    public ResponseEntity<? super PutFavoriteResponseDTO> putFavorite(Integer boardNumber, String email) {
        try {

            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser) return PutFavoriteResponseDTO.noExistUser();

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return PutFavoriteResponseDTO.noExistBoard();

            FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
            if(favoriteEntity == null) {
                favoriteEntity = new FavoriteEntity(email, boardNumber);
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaseFavoriteCount();
            } else {
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaseFavoriteCount();
            }

            boardRepository.save(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return PutFavoriteResponseDTO.success();
    }

    // description: GET favorite list 
    @Override
    public ResponseEntity<? super GetFavoriteListResponseDTO> getFavoriteList(Integer boardNumber) {
        List<GetFavoriteListResultSet> resultSets = new ArrayList<>();

        try {
            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if(!existedBoard) return GetFavoriteListResponseDTO.noExistBoard();

            resultSets = favoriteRepository.getFavoriteList(boardNumber);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetFavoriteListResponseDTO.success(resultSets);
    }

    // description: POST comment 
    @Override
    public ResponseEntity<? super PostCommentResponseDTO> postComment(PostCommentRequestDTO dto, Integer boardNumber, String email) {
        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return PostCommentResponseDTO.noExistBoard();

            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser) return PostBoardResponseDTO.noExistUser();

            CommentEntity commentEntity = new CommentEntity(dto, boardNumber, email);
            commentRepository.save(commentEntity);

            boardEntity.increaseCommentCount();
            boardRepository.save(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return PostCommentResponseDTO.success();
    }

    // description: GET comment
    @Override
    public ResponseEntity<? super GetCommentListResponseDTO> getCommentList(Integer boardNumber) {
        List<GetCommentListResultSet> resultSets = new ArrayList<>();
        try {
            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if(!existedBoard) return GetCommentListResponseDTO.noExistBoard();

            resultSets = commentRepository.getCommentList(boardNumber);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetCommentListResponseDTO.success(resultSets);
    }

    // description: GET increase view count
    @Override
    public ResponseEntity<? super IncreaseViewCountResponseDTO> increaseViewCount(Integer boardNumber) {
        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return IncreaseViewCountResponseDTO.noExistBoard();

            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return IncreaseViewCountResponseDTO.success();
    }

    // description: DELETE board 
    @Override
    public ResponseEntity<? super DeleteBoardResponseDTO> deleteBoard(Integer boardNumber, String email) {
        try {
            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser) return DeleteBoardResponseDTO.noExistUser();
            
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return DeleteBoardResponseDTO.noExistBoard();

            String writerEmail = boardEntity.getWriterEmail();
            boolean isWriter = writerEmail.equals(email);
            if(!isWriter) return DeleteBoardResponseDTO.noPermission();

            imageRepository.deleteByBoardNumber(boardNumber);
            commentRepository.deleteByBoardNumber(boardNumber);
            favoriteRepository.deleteByBoardNumber(boardNumber);

            boardRepository.delete(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return DeleteBoardResponseDTO.success();
    }

    // description: PATCH board
    @Override
    public ResponseEntity<? super PatchBaordResponseDTO> patchBoard(PatchBoardRequestDTO dto, Integer boardNumber, String email) {
        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return PatchBaordResponseDTO.noExistBoard();

            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser) return PatchBaordResponseDTO.noExistUser();

            String writerEmail = boardEntity.getWriterEmail();
            boolean isWriter = writerEmail.equals(email);
            if(!isWriter) return PatchBaordResponseDTO.noPermission();

            boardEntity.patchBoard(dto);
            boardRepository.save(boardEntity);

            imageRepository.deleteByBoardNumber(boardNumber);
            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            for (String image: boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }

            imageRepository.saveAll(imageEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return PatchBaordResponseDTO.success();
    }

    // description: GET latest board list 
    @Override
    public ResponseEntity<? super GetLatestBoardListResponseDTO> getLatestBoardList() {
        List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

        try {
            boardListViewEntities = boardListViewRepository.findByOrderByWriteDatetimeDesc();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetLatestBoardListResponseDTO.success(boardListViewEntities);
    }

    // description: GET top3 list 
    @Override
    public ResponseEntity<? super GetTop3BoardListResponseDTO> getTop3BoardList() {
        List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

        try {
            Date beforeWeek = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String sevenDaysAgo = simpleDateFormat.format(beforeWeek);

            boardListViewEntities = boardListViewRepository.findTop3ByWriteDatetimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc(sevenDaysAgo);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetTop3BoardListResponseDTO.success(boardListViewEntities);
    }

    // description: GET search board list
    @Override
    public ResponseEntity<? super GetSearchBoardListResponseDTO> getSearchBoardList(String searchWord, String preSearchWord) {
        List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

        try {
            boardListViewEntities = boardListViewRepository.findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(searchWord, preSearchWord);

            SearchLogEntity searchLogEntity = new SearchLogEntity(searchWord, preSearchWord, false);
            searchLogRepository.save(searchLogEntity);

            boolean relation = preSearchWord != null;
            if(relation) {
                searchLogEntity = new SearchLogEntity(preSearchWord, searchWord, relation);
                searchLogRepository.save(searchLogEntity);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetSearchBoardListResponseDTO.success(boardListViewEntities);
    }

    // description: GET user board list 
    @Override
    public ResponseEntity<? super GetUserBoardListResponseDTO> getUserBoardList(String email) {
        List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

        try {
            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser) return GetUserBoardListResponseDTO.noExistUser();

            boardListViewEntities = boardListViewRepository.findByWriterEmailOrderByWriteDatetimeDesc(email);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetUserBoardListResponseDTO.success(boardListViewEntities);
    }
}
