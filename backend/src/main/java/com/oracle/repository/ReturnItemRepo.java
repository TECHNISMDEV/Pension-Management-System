package com.oracle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.oracle.model.Return;
import com.oracle.model.ReturnItems;

public interface ReturnItemRepo extends JpaRepository<ReturnItems, String> {

	@Query(value="select * from RETURNS_ITEMS ri where RETURN_ID=:returnId", nativeQuery=true)
	List<ReturnItems> findReturnItemByReturnId(String returnId);
	
	List<ReturnItems> findByRetur(Return retur);
}
