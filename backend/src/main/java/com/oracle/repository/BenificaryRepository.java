package com.oracle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.oracle.model.Benificiary;

public interface BenificaryRepository extends JpaRepository<Benificiary, String> {

	@Query(value="select * from BENEFICIARY ri where MEMBER_ID=:id", nativeQuery=true)
	List<Benificiary> findBenificiaryListByMemberId(String id);

}

