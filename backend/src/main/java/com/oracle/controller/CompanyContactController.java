package com.oracle.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oracle.Vos.AddressVo;
import com.oracle.Vos.ContactsVo;
import com.oracle.model.Address;
import com.oracle.model.Contact;
import com.oracle.service.CompanyContactService;

@RestController
@RequestMapping(path = "/app")
public class CompanyContactController {
	
	@Autowired
	CompanyContactService companyContactService;
	
	/*
	 * @PostMapping(path = "/addNewCompanyContact") public Contact
	 * addContact(@RequestBody ContactsVo vo) { return
	 * companyContactService.addCompanyContact(vo);
	 * 
	 * }
	 */
	
	@PostMapping(path = "/addNewCompanyContact")
	public Contact addContact(@RequestBody ContactsVo vo) {
		
		return companyContactService.addCompanyContact(vo);
	}
	
	@GetMapping(path = "/getContactByCompanyId")
	public ResponseEntity<?> getAddresByCompanyId(@RequestParam("companyId") String companyId ){
		
		
		return (ResponseEntity<?>) Optional.of(companyContactService.getContactListByCompanyId(companyId)).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
				.orElseThrow(() -> new RuntimeException("Could not get serviceRequest"));
	}
	

}
