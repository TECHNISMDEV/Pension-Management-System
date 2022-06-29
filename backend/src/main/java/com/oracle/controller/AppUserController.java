package com.oracle.controller;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oracle.Vos.AppRegistrationUiVo;
import com.oracle.model.AppUser;
import com.oracle.model.User;
import com.oracle.model.UserResponsibility;
import com.oracle.repository.AppUserService;
import com.oracle.repository.ResponsibilityRepository;
import com.oracle.repository.UserPositionRepository;
import com.oracle.service.DataSourceConfigService;

@RestController
@RequestMapping("/app")
@CrossOrigin
public class AppUserController {
	
	
	    @Autowired
	    private AppUserService appUserService;
	    
	    @Autowired
	    private  DataSourceConfigService dataSourceConfig;
	    
	    @Autowired
	    private ResponsibilityRepository resRepo;
	    
	    @Autowired
	    private UserPositionRepository positionRepository;


	    @PostMapping("/user/login")
		public ResponseEntity<?> getUser(@RequestBody User usr) {
		
			Connection connection = dataSourceConfig.getConnection(usr.getName(), usr.getPass());
		
			if (connection == null) {
				return ResponseEntity.status(403).body(String.class);
			}
		
			AppUser user = appUserService.findByLogin(usr.getName());
		
			if (user != null) {
				AppRegistrationUiVo uiVo = new AppRegistrationUiVo();
				uiVo.setId(user.getId());
				uiVo.setFirstName(user.getFirstName());
				uiVo.setLastName(user.getLastName());
				uiVo.setEmail(user.getEmail());
				uiVo.setMobileNo(user.getMobileNo());
		
				uiVo.setPositions(positionRepository.findByUserId(user.getId()));
				uiVo.setResponsibility(resRepo.findByUserId(user.getId()));
				
				return ResponseEntity.ok(uiVo);
			} else {
				return ResponseEntity.ok("Authentication failed");
			}
		
		}
	  
	    @GetMapping(path = "/responsibility/allresponsibility")
		public ResponseEntity<?> findAllResponsibilty() {

			return (ResponseEntity<?>) Optional.of(resRepo.findAll()).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
					.orElseThrow(() -> new RuntimeException("Could not get Fund events"));

		} 
	    
	    @GetMapping(path = "/responsibilityByUserId/{userId}")
	  		public ResponseEntity<?> responsibilityByUserId(@PathVariable String userId) {

	  			return (ResponseEntity<?>) Optional.of(resRepo.findByUserId(userId)).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
	  					.orElseThrow(() -> new RuntimeException("Could not get Fund events"));

	  		}
	    
	    @GetMapping(path = "/positionByUserId/{userId}")
  		public ResponseEntity<?> positionByUserId(@PathVariable String userId) {

  			return (ResponseEntity<?>) Optional.of(positionRepository.findByUserId(userId)).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
  					.orElseThrow(() -> new RuntimeException("Could not get Fund events"));

  		}
	    
	    @GetMapping(path = "/getCurrentManagerByLoginId/{loginId}")
  		public ResponseEntity<?> findManagerforUserId(@PathVariable String loginId) {

  			return (ResponseEntity<?>) Optional.of(appUserService.findCurrentManager(loginId)).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
  					.orElseThrow(() -> new RuntimeException("Could not get Fund events"));

  		} 
	    
	

}