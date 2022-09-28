package com.oracle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.oracle.model.CompanyMember;

public interface CompanyMemberRepository extends JpaRepository<CompanyMember, String> {

	@Query(value = "SELECT * FROM MEMBER_COMPANY mc WHERE COMPANY_ID =:id" ,nativeQuery = true )
	public List<CompanyMember> getCompanyMemberByCompanyId(String id);

	public List<CompanyMember> findByCompanyId(String companyId);
}
