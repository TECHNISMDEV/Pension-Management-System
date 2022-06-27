package com.oracle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.oracle.model.AppUser;

public interface AppUserService extends JpaRepository<AppUser, String>{
	
	AppUser findByLogin(String login);
	
	@Query(value ="SELECT * FROM APP_USER au WHERE POS_ID IN (SELECT PAR_POS_ID  FROM POSITION WHERE ID IN (SELECT POS_ID  FROM app_user WHERE ID =:loginId))",
			nativeQuery = true
			)
	AppUser findCurrentManager(String loginId);

}
