package com.oracle.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.model.Contact;

public interface PersonalContactRepository extends JpaRepository<Contact,String> {

}
