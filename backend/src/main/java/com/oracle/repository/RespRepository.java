package com.oracle.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.model.Responsibility;

public interface RespRepository extends JpaRepository<Responsibility, String>{

}
