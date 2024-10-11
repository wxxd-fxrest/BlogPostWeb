package com.example.board_back.service.implement;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.board_back.service.FileService;

@Service
public class FileServiceImplement implements FileService{
    @Value("${file.path}")
    private String filePath;

    @Value("${file.url}")
    private String fileUrl;

    @Override
    public String upload(MultipartFile file) {
        if (file.isEmpty()) return null;
    
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) {
            System.out.println("파일 이름이 null입니다.");
            return null; // 또는 적절한 오류 처리
        }
    
        int lastIndex = originalFileName.lastIndexOf(".");
        String extension = (lastIndex == -1) ? "" : originalFileName.substring(lastIndex);
        
        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid + extension;
        String savePath = filePath + saveFileName;
    
        try {
            file.transferTo(new File(savePath));
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    
        String url = fileUrl + saveFileName; 
        return url;
    }
    
    @Override
    public Resource getImage(String fileName) {
        Resource resource = null;
        try {
            resource = new UrlResource("file:" + filePath + fileName);
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
        return resource;
    }
}
