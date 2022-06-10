package com.oracle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oracle.model.Address;
@Repository
public interface AdressRepository extends JpaRepository<Address, String> {

}
