package com.oracle.controller;

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

import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.model.Company;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.CompanyRepository;
import com.oracle.repository.ServiceRequestRepository;
import com.oracle.service.DataSourceConfigService;
import com.oracle.service.ServiceRequestService;
@RestController
@RequestMapping("/app")
@CrossOrigin
public class ServiceRequestController {

	
	@Autowired
    private  DataSourceConfigService dataSourceConfig;
	
	@Autowired
	private ServiceRequestRepository serviceRequestRepository;
	
	@Autowired
	private ServiceRequestService ServiceRequestService;

	@Autowired
	private CompanyRepository companyRepository;
	
	
	@GetMapping(path = "/service/allServiceRequest")
	public ResponseEntity<?> findAllServiceRequest() {

		return (ResponseEntity<?>) Optional.of(serviceRequestRepository.findAll()).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
				.orElseThrow(() -> new RuntimeException("Could not get serviceRequest"));

	} 
	
	
	@GetMapping(path = "/serviceRequestByuserId/{userId}")
	public ResponseEntity<?> findAllServiceRequestById(@PathVariable String userId) {
	return (ResponseEntity<?>)
	Optional.of(serviceRequestRepository.findById(userId)).map(e -> new
	ResponseEntity<>(e, HttpStatus.OK)) .orElseThrow(() -> new
    RuntimeException("Could not get serviceRequest")); 
	 }

	@GetMapping(path = "/serviceRequestBySrNumber/{srNumber}")
	public ResponseEntity<?> findAllServiceRequestBySrNumber(@PathVariable String srNumber) {
		return (ResponseEntity<?>)
				Optional.of(serviceRequestRepository.findBySrNumber(srNumber)).map(e -> new
						ResponseEntity<>(e, HttpStatus.OK)) .orElseThrow(() -> new
						RuntimeException("Could not get serviceRequest"));
	}
	
	@PostMapping(path = "/serviceRequestByOwnerId/{ownerId}")
	@CrossOrigin
	public ResponseEntity<?> findAllServiceRequestByOwnerId(@PathVariable String ownerId) {
	return (ResponseEntity<?>)
	Optional.of(serviceRequestRepository.findByOwnerId(ownerId)).map(e -> new
	ResponseEntity<>(e, HttpStatus.OK)) .orElseThrow(() -> new
    RuntimeException("Could not get serviceRequest")); 
	 }
	
	@PostMapping(path = "/newServiceRequest", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> addNewServiceRequest(@RequestBody ServiceRequestUiVo serviceRequest) {
		ServiceRequest serRequest=null;
		Optional<ServiceRequest> existingSerRequest=serviceRequestRepository.findById(serviceRequest.getId());
		if(existingSerRequest.isPresent())
		{
			serRequest=existingSerRequest.get();
		}
		if (serRequest != null) {
			ServiceRequest updatedServiceRequest= ServiceRequestService.updateServiceRequest(serRequest,serviceRequest);
			return ResponseEntity.ok(updatedServiceRequest);
		}else {
			ServiceRequest req =ServiceRequestService.saveNewServiceRequest(serviceRequest);
			return ResponseEntity.ok(req);
	}
		
	}
	
	@GetMapping(path = "/getNewServiceRequest")
	public ResponseEntity<ServiceRequest> getNewServiceRequest() {
		String sequence=dataSourceConfig.generatedValue("TCX_SRNUM_SEQ", "SR");
		ServiceRequest serviceRequest=new ServiceRequest();
		serviceRequest.setSrNumber(sequence);
		return ResponseEntity.ok(serviceRequest);
		
	}
}
