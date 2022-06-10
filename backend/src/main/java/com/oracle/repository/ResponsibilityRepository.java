package com.oracle.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oracle.model.UserResponsibility;

@Repository
public interface ResponsibilityRepository extends JpaRepository<UserResponsibility, String>{

	List<UserResponsibility> findByUserId(String userId);

	

	
}
