package com.oracle.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oracle.service.LookUpService;

@RestController
@RequestMapping("/app")
@CrossOrigin
public class LookupController {
	
	@Autowired
	LookUpService service;
	
	@GetMapping(path = "/getLookUpForEmployer")
	public ResponseEntity<?> getLookUp()
	{
		
		return (ResponseEntity<?>) Optional.of(service.getLookUpDetails()).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
				.orElseThrow(() -> new RuntimeException("Could not get Lookup data"));
	}

}
