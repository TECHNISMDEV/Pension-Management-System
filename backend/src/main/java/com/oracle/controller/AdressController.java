package com.oracle.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.oracle.Vos.AddressVo;
import com.oracle.model.Address;
import com.oracle.service.CompanyAdressService;

@RestController
@RequestMapping("/app")
@CrossOrigin
public class AdressController {
	
	@Autowired
	CompanyAdressService addressService;
	
	@GetMapping(path = "/getAdressByCompanyId/{companyId}")
	public ResponseEntity<?> getAddresByCompanyId(@PathVariable("companyId") String companyId ){
		
		
		return (ResponseEntity<?>) Optional.of(addressService.getAddressListByCompanyId(companyId)).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
				.orElseThrow(() -> new RuntimeException("Could not get serviceRequest"));
	}
	
	@PostMapping(path = "/addCompanyAdress")
	public Address addCompanyAdress(@RequestBody AddressVo address) {
		
		return addressService.addCompanyAddress(address);
	}

}
