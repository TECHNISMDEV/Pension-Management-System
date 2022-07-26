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
	
	@Query(value="select * from RETURNS_ITEMS ri where MEMBER_NRC=:memberNrc and COMPANY_NUMBER=:comapnyNumber", nativeQuery=true)
	ReturnItems findReturnItemByNrcAndCompanyId(String memberNrc, String comapnyNumber);

	@Query(value="select * from RETURNS_ITEMS ri where MEMBER_NRC=:memberNrc and COMPANY_NUMBER=:comapnyNumber and MONTH=:month and YEAR=:year", nativeQuery=true)
	ReturnItems findReturnItemByNrcAndCompanyIdAndMonthAndYear(String memberNrc, String comapnyNumber, Integer month,
			Integer year);
}
