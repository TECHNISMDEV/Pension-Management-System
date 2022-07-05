package com.oracle.service;

import java.io.IOException;
import java.lang.annotation.Documented;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.oracle.Vos.CompanyVo;
import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.Vos.ServiceRequestVo;
import com.oracle.model.Address;
import com.oracle.model.Company;
import com.oracle.model.Contact;
import com.oracle.model.Document;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.CompanyRepository;
import com.oracle.repository.DocumentRepository;
import com.oracle.repository.ServiceRequestRepository;
import com.oracle.util.DateUtil;
import com.oracle.util.LookUpConstant;

@Service
public class ServiceRequestService {

	@Autowired
	DataSourceConfigService configService;
	
	@Autowired
	ServiceRequestRepository repository;
	
	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	ServiceRequestRepository serviceRequestRepository;
	
	@Autowired
	DocumentService docService;
	
	@Autowired
	DocumentRepository docRepository;
	
	public ServiceRequest saveNewServiceRequest(ServiceRequestUiVo uiVo) {
		
		ServiceRequest request = new ServiceRequest();
		Company company = new Company();
		
		CompanyVo companyVo=uiVo.getCompanyVo();
		ServiceRequestVo serviceRequest=uiVo.getServiceRequestVo();

		// Company
		company.setCreated(DateUtil.getCurrentDate());
		company.setCreatedBy(serviceRequest.getLoginUserId());
		company.setLastUpdated(DateUtil.getCurrentDate());
		company.setLastUpdatedBy(serviceRequest.getLoginUserId());
		company.setCompanyRegDate(companyVo.getCompanyRegDate());
		company.setCompCxRef(companyVo.getCompCxRef());
		company.setDocumentNum(DateUtil.getCurrentDate().toString());
		company.setDocumentType(companyVo.getDocumentType());
		company.setName(companyVo.getName().toUpperCase());
		company.setOwnerId(serviceRequest.getLoginUserId());
		company.setPropFirstName(companyVo.getPropFirstName());
		company.setPropLastName(companyVo.getPropLastName());
		company.setPropPosition(companyVo.getPropPosition());
		company.setLegalName(companyVo.getLegalName());
		company.setSeasonFlag(companyVo.getSeasonFlag());
		company.setPacraId(companyVo.getPacraId());
		company.setCompanyStatus(LookUpConstant.COMPANY_STATUS_INPROGRESS);
		company.setCompanySubStatus(LookUpConstant.COMPANY_SUB_STATUS_INPROGRESS);
		company.setCompanyType(companyVo.getCompanyType());
		company.setSector(companyVo.getSector());
		company.setHoldingCompany(companyVo.getHoldingCompany());
		company.setSubsidaryCompany(companyVo.getSubsidaryCompany());
		company.setMainFax(companyVo.getMainFax());
		company.setDateIncopr(companyVo.getDateIncopr());
		company.setStEmploy(companyVo.getStEmploy());
		company.setRegion(companyVo.getRegion());
		company.setProvince(companyVo.getProvince());
		company.setDistrict(companyVo.getDistrict());
		company.setStation(companyVo.getStation());
		company.setZone(companyVo.getZone());
		company.setMainPhone(companyVo.getMainPhone());
		company.setMainEmail(companyVo.getMainEmail());
		// company.setPrContactId(serviceRequest.getPrContactId());

		// service request
		request.setId(serviceRequest.getId());
		request.setCreated(DateUtil.getCurrentDate());
		request.setCraeatedBy(serviceRequest.getLoginUserId());
		request.setLast_Updated(DateUtil.getCurrentDate());
		request.setLastUpdBy(serviceRequest.getLoginUserId());
		request.setOrgId(serviceRequest.getOrgId());
		request.setOwnerId(serviceRequest.getLoginUserId());
		request.setClaimId(serviceRequest.getClaimId());
		request.setSrNumber(serviceRequest.getSrNumber());
		request.setSource(serviceRequest.getSource());
		request.setContactName(serviceRequest.getContactName());
		request.setType(LookUpConstant.SERVICE_REQUEST_TYPE_EMPLOYER_REG);
		request.setStartDate(serviceRequest.getStartDate());
		request.setEndDate(serviceRequest.getEndDate());
		request.setArea(serviceRequest.getArea());
		request.setSubArea(serviceRequest.getSubArea());
		request.setSource(serviceRequest.getSource());
		request.setStatus(LookUpConstant.SERVICE_REQUEST_STATUS_REGISTERED);
		
		//----------------
		request.setProcess(serviceRequest.getProcess());
		request.setResolution(serviceRequest.getResolution());
		request.setComments(serviceRequest.getComments());
		request.setProcess(serviceRequest.getPriority());
		request.setContactNumber(serviceRequest.getContactNumber());
		request.setContactEmail(serviceRequest.getContactEmail());
		request.setSrPropiterFirstName(serviceRequest.getSrPropiterFirstName());
		request.setSrPropiterLastName(serviceRequest.getSrPropiterLastName());
		request.setProprietorNRC(serviceRequest.getProprietorNRC());
		request.setPropiterNationality(serviceRequest.getPropiterNationality());
		request.setName(serviceRequest.getName());
		request.setCompanyType(serviceRequest.getCompanyType());
		request.setLocation(serviceRequest.getLocation());

		request.setCompany(company);
		return repository.save(request);

	}

	public List<ServiceRequest> findByOwnerId(String ownerId) {
		// TODO Auto-generated method stub
		return repository.findByOwnerId(ownerId);
	}

	public Company updateServiceRequestForCompanyInfo(Company company, ServiceRequestUiVo uiVo) {
		CompanyVo companyVo = uiVo.getCompanyVo();

		//Company company = serRequest.getCompany(); // Company
		// company.setCreated(DateUtil.getCurrentDate());
		// company.setCreatedBy(serviceRequest.getCraeatedBy());
		company.setLastUpdated(DateUtil.getCurrentDate());
		company.setLastUpdatedBy(uiVo.getCompanyVo().getLoginUserId());
		company.setCompanyRegDate(companyVo.getCompanyRegDate());
		company.setCompCxRef(companyVo.getCompCxRef());
		company.setDocumentNum(companyVo.getDocumentNum());
		company.setDocumentType(companyVo.getDocumentType());
		company.setName(companyVo.getName().toUpperCase());
		company.setPropFirstName(companyVo.getPropFirstName());
		company.setPropLastName(companyVo.getPropLastName());
		company.setPropPosition(companyVo.getPropPosition());
		company.setPropNrc(companyVo.getNrc());
		company.setPropNationality(companyVo.getNationality());
		company.setLegalName(companyVo.getLegalName());
		company.setSeasonFlag(companyVo.getSeasonFlag());
		company.setPacraId(companyVo.getPacraId());
		company.setCompanyStatus(companyVo.getCompanyStatus());
		company.setCompanySubStatus(companyVo.getCompanySubStatus());
		company.setCompanyType(companyVo.getCompanyType());
		company.setSector(companyVo.getSector());
		company.setHoldingCompany(companyVo.getHoldingCompany());
		company.setSubsidaryCompany(companyVo.getSubsidaryCompany());
		company.setMainFax(companyVo.getMainFax());
		company.setDateIncopr(companyVo.getDateIncopr());
		company.setStEmploy(companyVo.getStEmploy());
		company.setRegion(companyVo.getRegion());
		company.setProvince(companyVo.getProvince());
		company.setDistrict(companyVo.getDistrict());
		company.setStation(companyVo.getStation());
		company.setZone(companyVo.getZone());
		company.setMainPhone(companyVo.getMainPhone());
		company.setMainEmail(companyVo.getMainEmail());
		company.setArea(companyVo.getArea());
		company.setNoOfEmployee(companyVo.getNoOfEmployee());

		/*
		 * serRequest.setCompany(company);
		 * 
		 * serRequest.setId(serviceRequest.getId());
		 * 
		 * serRequest.setLast_Updated(DateUtil.getCurrentDate());
		 * serRequest.setLastUpdBy(serviceRequest.getLoginUserId());
		 * serRequest.setOrgId(serviceRequest.getOrgId());
		 * serRequest.setClaimId(serviceRequest.getClaimId());
		 * serRequest.setSource(serviceRequest.getSource());
		 * serRequest.setContactName(serviceRequest.getContactName());
		 * serRequest.setStartDate(serviceRequest.getStartDate());
		 * serRequest.setEndDate(serviceRequest.getEndDate());
		 * serRequest.setArea(serviceRequest.getArea());
		 * serRequest.setSubArea(serviceRequest.getSubArea());
		 * serRequest.setSource(serviceRequest.getSource());
		 * serRequest.setStatus(serviceRequest.getStatus());
		 * 
		 * serRequest.setProcess(serviceRequest.getProcess());
		 * serRequest.setResolution(serviceRequest.getResolution());
		 * serRequest.setComments(serviceRequest.getComments());
		 * serRequest.setProcess(serviceRequest.getPriority());
		 * serRequest.setContactNumber(serviceRequest.getContactNumber());
		 * serRequest.setContactEmail(serviceRequest.getContactEmail());
		 * serRequest.setSrPropiterFirstName(serviceRequest.getSrPropiterFirstName());
		 * serRequest.setSrPropiterLastName(serviceRequest.getSrPropiterLastName());
		 * serRequest.setProprietorNRC(serviceRequest.getProprietorNRC());
		 * serRequest.setPropiterNationality(serviceRequest.getPropiterNationality());
		 * serRequest.setName(serviceRequest.getName());
		 * serRequest.setCompanyType(serviceRequest.getCompanyType());
		 * serRequest.setLocation(serviceRequest.getLocation());
		 */

		return companyRepository.save(company);

	}

	public Document storeFile(MultipartFile file, String companyid) {
		Document doc=null;
		try {
			 doc=docService.saveDocument(file, companyid);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return doc;
	}

	public Stream<Document> getAllFiles() {
	    return docRepository.findAll().stream();
	  }

	public Stream<Document> getAllFilesByCompanyId(String companyId) {
		// TODO Auto-generated method stub
		return docRepository.findAllByCompanyId(companyId).stream();
	}

	public Document getFile(String id) {
		// TODO Auto-generated method stub
		return docRepository.findById(id).get();
	}

	
	public ServiceRequest submitForApproval(ServiceRequest serRequest) {
		return repository.save(serRequest);
		
	}


	
}
