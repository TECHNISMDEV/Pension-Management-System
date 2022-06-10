package com.oracle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.model.UserPosition;

public interface UserPositionRepository extends JpaRepository<UserPosition, String>{

	List<UserPosition> findByUserId(String id);
}
