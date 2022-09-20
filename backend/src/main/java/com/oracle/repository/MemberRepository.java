package com.oracle.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.model.Member;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, String>{
	
	Member findByNrc(String nrc);


	@Query(
			value = "SELECT * FROM MEMBER WHERE ID IN (SELECT MEMBER_ID FROM MEMBER_COMPANY WHERE COMPANY_ID=:companyId)",
			nativeQuery = true)
	List<Member> findByCompanyId(String companyId);

}
