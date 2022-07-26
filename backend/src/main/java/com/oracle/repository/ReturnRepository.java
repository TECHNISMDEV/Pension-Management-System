package com.oracle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.oracle.model.Return;

public interface ReturnRepository extends JpaRepository<Return, String> {

	@Query("select r from Return r where r.companyId=:companyId and r.month=:month and r.year=:year")
	Return findReturnRecordByEmpMonthYear(String companyId, int month, int year);

	List<Return> findByCompanyId(String companyId);
	
	@Query("SELECT r FROM Return r WHERE r.createdBy =:loginId AND r.status NOT IN ('Validated','Paid') ")
	List<Return> findAllOpenReturnByOwnerId(String loginId);
	Return findBySubmissionNumber(Integer submissionNumber);
}
