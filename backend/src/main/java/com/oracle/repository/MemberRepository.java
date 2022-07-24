package com.oracle.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.model.Member;

public interface MemberRepository extends JpaRepository<Member, String>{
	
	Member findByNrc(String nrc);

}
