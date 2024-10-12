package com.example.board_back.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.board_back.dto.request.board.PostBoardRequestDTO;
import com.example.board_back.dto.response.ResponseDTO;
import com.example.board_back.dto.response.board.GetBoardResponseDTO;
import com.example.board_back.dto.response.board.GetFavoriteListResponseDTO;
import com.example.board_back.dto.response.board.PostBoardResponseDTO;
import com.example.board_back.dto.response.board.PutFavoriteResponseDTO;
import com.example.board_back.entity.BoardEntity;
import com.example.board_back.entity.FavoriteEntity;
import com.example.board_back.entity.ImageEntity;
import com.example.board_back.repository.BoardRepository;
import com.example.board_back.repository.FavoriteRepository;
import com.example.board_back.repository.ImageRepository;
import com.example.board_back.repository.UserRepository;
import com.example.board_back.repository.resultSet.GetBoardResultSet;
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

    // POST board 
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

    // GET specific board 
    @Override
    public ResponseEntity<? super GetBoardResponseDTO> getBoard(Integer boardNumber) {
        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();

        try {
            resultSet = boardRepository.getBoard(boardNumber);
            if(resultSet == null) return GetBoardResponseDTO.noExistBoard();

            imageEntities = imageRepository.findByBoardNumber(boardNumber);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetBoardResponseDTO.success(resultSet, imageEntities);
    }

    // PUT put favorite
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

    // Get favorite list 
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
}
