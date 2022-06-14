package com.oracle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oracle.model.LookUp;

@Repository
public interface LookupRepository extends JpaRepository<LookUp, String> {

}
