package com.oracle.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.oracle.model.Document;
import com.oracle.repository.DocumentRepository;

@Service
public class DocumentService {

	@Autowired
	DocumentRepository docRepo;
	
	public Document saveDocument(MultipartFile file,String companyId) throws IOException
	{
		Document doc=new Document();
		doc.setDocumentName(file.getName());
		doc.setType(file.getContentType());
		doc.setFileSize(file.getSize());
		doc.setActualFile(file.getBytes());
		doc.setFileName(file.getOriginalFilename());
		doc.setCompanyId(companyId);
		
		return docRepo.save(doc);
	}

	public void getDocumentById(String docId) {

		docRepo.findById(docId);
	}
}
