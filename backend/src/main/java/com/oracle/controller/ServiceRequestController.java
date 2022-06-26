package com.oracle.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jdk.jfr.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.Vos.UploadFileResponse;
import com.oracle.model.Document;
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
	@PostMapping("/uploadFile/{companyId}")
    public ResponseEntity<UploadFileResponse> uploadFile(@RequestParam("file") MultipartFile file,@PathVariable("companyId") String id) {
        Document doc = ServiceRequestService.storeFile(file,id);
        
        String fileDownloadUri = ServletUriComponentsBuilder
		          .fromCurrentContextPath()
		          .path("/files/")
		          .path(doc.getId())
		          .toUriString();
        UploadFileResponse response= new UploadFileResponse(doc.getFileName(),fileDownloadUri,doc.getType(),doc.getActualFile().length);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
	
	@GetMapping("/filesByCompanyId/{companyId}")
    public ResponseEntity<List<UploadFileResponse>> filesByCompanyId(@PathVariable("companyId") String companyId) {
		List<UploadFileResponse> files = ServiceRequestService.getAllFilesByCompanyId(companyId).map(dbFile -> {
		      String fileDownloadUri = ServletUriComponentsBuilder
		          .fromCurrentContextPath()
		          .path("/app/files/")
		          .path(dbFile.getId())
		          .toUriString();
		      return new UploadFileResponse(
		          dbFile.getFileName(),
		          fileDownloadUri,
		          dbFile.getType(),
		          dbFile.getActualFile().length);
		    }).collect(Collectors.toList());
		    return ResponseEntity.status(HttpStatus.OK).body(files);
    }
	
	@GetMapping("/files/{id}")
	  public ResponseEntity<byte[]> getFile(@PathVariable String id) {
			
			  Document fileDB = ServiceRequestService.getFile(id); return
				ResponseEntity.ok() .contentType(MediaType.APPLICATION_OCTET_STREAM)
			  .header(HttpHeaders.CONTENT_DISPOSITION,"attachment:filename=\""+fileDB.
			  getFileName()+"\"") .body(fileDB.getActualFile());
			 
		
	  }
}
