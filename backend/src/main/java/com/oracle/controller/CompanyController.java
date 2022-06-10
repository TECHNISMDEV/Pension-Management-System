package com.oracle.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.oracle.model.Document;
import com.oracle.repository.CompanyRepository;
import com.oracle.service.DocumentService;

@RestController
@RequestMapping("/app")
@CrossOrigin
public class CompanyController {

	@Autowired
	private CompanyRepository companyRepository;
	
	@Autowired
	DocumentService docService;
	
	@GetMapping("/getAllcompany")
	public ResponseEntity<?> getAllCompanyDetails()
	{
		return (ResponseEntity<?>) Optional.of(companyRepository.findAll()).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
				.orElseThrow(() -> new RuntimeException("Could not get company"));

	}
	@GetMapping("/getCompanyByName/{name}")
	public  ResponseEntity<?> getCompanyByName(@PathVariable String name)
	{
		return (ResponseEntity<?>) Optional.of(companyRepository.findByName(name)).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
				.orElseThrow(() -> new RuntimeException("Could not get company"));
		
	}
	@GetMapping("/getCompanyById/{Id}")
	public  ResponseEntity<?> getCompanyById(@PathVariable String Id)
	{
		return (ResponseEntity<?>) Optional.of(companyRepository.findById(Id)).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
				.orElseThrow(() -> new RuntimeException("Could not get company"));
		
	}
	@PostMapping("/activityFileupload")
	public ResponseEntity<Boolean> uploadFile(@RequestParam("file") MultipartFile file,@RequestParam("companyId") String id) {
	
		try {
			docService.saveDocument(file,id);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.ok(false);
		}
		
		return ResponseEntity.ok(true);
		
	}
	}

