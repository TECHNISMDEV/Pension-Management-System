package com.oracle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oracle.model.Company;
@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {

	Company findByName(String name);
}
