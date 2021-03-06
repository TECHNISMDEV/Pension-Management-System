package com.oracle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oracle.model.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, String> {

	List<Document> findAllByCompanyId(String companyId);
	
	

}
