package com.oracle.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.model.AppUser;

public interface AppUserService extends JpaRepository<AppUser, String>{
	
	AppUser findByLogin(String login);

}
