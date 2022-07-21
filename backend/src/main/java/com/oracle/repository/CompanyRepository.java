package com.oracle.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.oracle.model.Company;
@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {

	Company findByName(String name);
	
	@Query(value="select * from COMPANY c where ID=:companyId", nativeQuery=true)
	Company getCompanyById(String companyId);

}
