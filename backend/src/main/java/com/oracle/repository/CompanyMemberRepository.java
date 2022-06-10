package com.oracle.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.model.CompanyMember;

public interface CompanyMemberRepository extends JpaRepository<CompanyMember, String> {

}
