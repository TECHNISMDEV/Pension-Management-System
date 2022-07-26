package com.oracle.controller;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import java.util.Objects;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.Vos.UploadFileResponse;

import com.oracle.model.AppUser;

import com.oracle.model.Company;

import com.oracle.model.Document;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.AppUserService;
import com.oracle.repository.CompanyRepository;
import com.oracle.repository.ServiceRequestRepository;
import com.oracle.service.DataSourceConfigService;
import com.oracle.service.ServiceRequestService;
import com.oracle.util.LookUpConstant;
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
	
	@Autowired
	private AppUserService appUserService;
	
	
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
		ServiceRequest request=serviceRequestRepository.findBySrNumber(srNumber);
		ServiceRequestUiVo uiVo=new ServiceRequestUiVo();
		uiVo.setCompanyVo(request.getCompany().getVo());
		uiVo.setServiceRequestVo(request.getVo());
		String loginId=request.getOwnerId();
		AppUser user=appUserService.findUserById(loginId);
		uiVo.getServiceRequestVo().setUser(user);
		return (ResponseEntity<?>)
				Optional.of(uiVo).map(e -> new
						ResponseEntity<>(e, HttpStatus.OK)) .orElseThrow(() -> new
						RuntimeException("Could not get serviceRequest"));
	}
	
	@GetMapping(path = "/serviceRequestByOwnerId/{ownerId}")
	@CrossOrigin
	public ResponseEntity<?> findAllServiceRequestByOwnerId(@PathVariable String ownerId) {
		List<ServiceRequest> list= serviceRequestRepository.findByOwnerId(ownerId);
		list=list.stream().sorted(Comparator.comparing(ServiceRequest::getCreated).reversed()).collect(Collectors.toList());
		AppUser appUser=appUserService.findUserById(ownerId);
		
list.forEach((l)->l.setOwnerId(appUser.getLogin()));		
	return (ResponseEntity<?>)
	Optional.of(list).map(e -> new
	ResponseEntity<>(e, HttpStatus.OK)) .orElseThrow(() -> new
    RuntimeException("Could not get serviceRequest")); 
	 }
	
	@PostMapping(path = "/newServiceRequest", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> addNewServiceRequest(@RequestBody ServiceRequestUiVo serviceRequest) {
		
		String loginId=serviceRequest.getServiceRequestVo().getLoginUserId();
		AppUser user=appUserService.findUserById(loginId);
		
		
			ServiceRequest req =ServiceRequestService.saveNewServiceRequest(serviceRequest);
			serviceRequest.setServiceRequestVo(req.getVo());
			serviceRequest.getServiceRequestVo().setUser(user);
			serviceRequest.setCompanyVo(req.getCompany().getVo());
		
		return ResponseEntity.ok(serviceRequest);

		
	}
	
	@PostMapping(path = "/saveCompanyDetails", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> saveCompanyDetails(@RequestBody ServiceRequestUiVo serviceRequest) {
		Company company=null;
		Optional<Company> existingCompany=companyRepository.findById(serviceRequest.getCompanyVo().getId());
		String loginId=serviceRequest.getCompanyVo().getLoginUserId();
		AppUser user=appUserService.findUserById(loginId);
		if(existingCompany.isPresent())
		{
			company=existingCompany.get();
		}
		if (company != null) {
			Company updatedCompany= ServiceRequestService.updateServiceRequestForCompanyInfo(company,serviceRequest);
			serviceRequest.getServiceRequestVo().setUser(user);
			serviceRequest.setCompanyVo(updatedCompany.getVo());
			//serviceRequest.setServiceRequestVo(updatedCompany.getRequest().getVo());
			return ResponseEntity.ok(serviceRequest);
		}else {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Company doesnot exist");
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
		          .path("/app/files/")
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
		MediaType mediaType = null;

		Document fileDB = ServiceRequestService.getFile(id);
		mediaType = MediaType.parseMediaType(fileDB.getType());

		if (null == mediaType) {
			mediaType = MediaType.APPLICATION_OCTET_STREAM;
		}

		return ResponseEntity.ok().contentType(mediaType)
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment:filename=\"" + fileDB.getFileName() + "\"")
				.body(fileDB.getActualFile());

	}

	  @PutMapping("/sendForApproval/{serviceRequestId}")
		public ResponseEntity<?> sendForApproval(@PathVariable(value = "serviceRequestId") String serviceRequestId ) {


			ServiceRequest serRequest = null;
			Optional<ServiceRequest> existingSerRequest = serviceRequestRepository.findById(serviceRequestId);
			if (existingSerRequest.isPresent()) {
				serRequest = existingSerRequest.get();
				AppUser manager = appUserService.findCurrentManager(serRequest.getOwnerId());
				serRequest.setOwnerId(manager.getId());

				//serRequest.setStatus(LookUpConstant.SERVICE_REQUEST_STATUS_REGISTERED);
				serRequest.getCompany().setCompanySubStatus(LookUpConstant.COMPANY_SUB_STATUS_SENDFORAPPROVAL);

				ServiceRequest updatedServiceRequest=ServiceRequestService.submitForApproval(serRequest);
				return ResponseEntity.ok(updatedServiceRequest);
			}
			
			return ResponseEntity.ok("somthing wrong with Service Request");

		}
	  

	  @PutMapping("/approveSrRequest/{serviceRequestId}")
		public ResponseEntity<?> approveSrRequest(@PathVariable(value = "serviceRequestId") String serviceRequestId ) {


			ServiceRequest serRequest = null;
			Optional<ServiceRequest> existingSerRequest = serviceRequestRepository.findById(serviceRequestId);
			if (Objects.nonNull(existingSerRequest)) {
				serRequest = existingSerRequest.get();

				serRequest.getCompany().setCompanyStatus(LookUpConstant.COMPANY_STATUS_APPROVE);
				serRequest.getCompany().setCompanySubStatus(LookUpConstant.COMPANY_SUB_STATUS_APPROVED);

				serRequest.setStatus(LookUpConstant.SERVICE_REQUEST_STATUS_APPROVED);
				ServiceRequest updatedServiceRequest=ServiceRequestService.submitForApproval(serRequest);
				return ResponseEntity.ok(updatedServiceRequest);
			}
			
			return ResponseEntity.ok("somthing wrong with Service Request");
			

		}

}
