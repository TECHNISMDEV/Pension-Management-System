package com.oracle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.model.Contact;

public interface PersonalContactRepository extends JpaRepository<Contact,String> {

	List<Contact> findByCompanyId(String companyId); 
}
