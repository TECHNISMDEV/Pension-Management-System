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

import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.model.Address;
import com.oracle.model.Company;
import com.oracle.model.Contact;
import com.oracle.model.Document;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.CompanyRepository;
import com.oracle.repository.DocumentRepository;
import com.oracle.repository.ServiceRequestRepository;
import com.oracle.util.DateUtil;

@Service
public class ServiceRequestService {

	@Autowired
	DataSourceConfigService configService;
	
	@Autowired
	ServiceRequestRepository repository;
	
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	DocumentService docService;
	
	@Autowired
	DocumentRepository docRepository;
	
	public ServiceRequest saveNewServiceRequest(ServiceRequestUiVo serviceRequest) {
		
		ServiceRequest request = new ServiceRequest();
		Company company = new Company();
		/*
		 * Address address = new Address(); Contact contact = new Contact();
		 */

		/*
		 * contact.setContactType(serviceRequest.getContactType());
		 * contact.setContactTypeId(serviceRequest.getContactTypeId());
		 * contact.setDob(serviceRequest.getDob());
		 * contact.setCraeatedBy(serviceRequest.getLoginUserId());
		 * contact.setCreated(DateUtil.getCurrentDate());
		 * contact.setLastUpdBy(serviceRequest.getLoginUserId());
		 * contact.setLast_Updated(DateUtil.getCurrentDate());
		 * contact.setFirstName(serviceRequest.getFirstName());
		 * contact.setMiddleName(serviceRequest.getMiddleName());
		 * contact.setLastName(serviceRequest.getLastName());
		 * contact.setDocumentNo(serviceRequest.getDocumentNum());
		 * contact.setDocumentType(serviceRequest.getDocumentType());
		 * company.setContact(contact);
		 */

		// Address
		/*
		 * address.setCity(serviceRequest.getCity());
		 * address.setAdressLine1(serviceRequest.getAdressLine1());
		 * address.setAdressLine2(serviceRequest.getAdressLine2());
		 * address.setAdressLine3(serviceRequest.getAdressLine3());
		 * address.setAdressLine4(serviceRequest.getAdressLine4());
		 * address.setAdressType(serviceRequest.getAdressType());
		 * address.setCountry(serviceRequest.getCountry());
		 * address.setCraeatedBy(serviceRequest.getLoginUserId());
		 * address.setCreated(DateUtil.getCurrentDate());
		 * address.setLastUpdBy(serviceRequest.getLoginUserId());
		 * address.setLast_Updated(DateUtil.getCurrentDate());
		 * address.setDistrictProvience(serviceRequest.getDistrictProvience());
		 * address.setState(serviceRequest.getState());
		 * address.setPostalCode(serviceRequest.getPostalCode());
		 * company.setAddress(address);
		 */

		// Company
		company.setCreated(DateUtil.getCurrentDate());
		company.setCreatedBy(serviceRequest.getLoginUserId());
		company.setLastUpdated(DateUtil.getCurrentDate());
		company.setLastUpdatedBy(serviceRequest.getLoginUserId());
		company.setCompanyRegDate(serviceRequest.getCompanyRegDate());
		company.setCompCxRef(serviceRequest.getCompCxRef());
		company.setDocumentNum(serviceRequest.getDocumentNum());
		company.setDocumentType(serviceRequest.getDocumentType());
		company.setName(serviceRequest.getName().toUpperCase());
		company.setOwnerId(serviceRequest.getLoginUserId());
		company.setPropFirstName(serviceRequest.getPropFirstName());
		company.setPropLastName(serviceRequest.getPropLastName());
		company.setPropPosition(serviceRequest.getPropPosition());
		company.setLegalName(serviceRequest.getLegalName());
		company.setSeasonFlag(serviceRequest.getSeasonFlag());
		company.setPacraId(serviceRequest.getPacraId());
		company.setCompanyStatus(serviceRequest.getCompanyStatus());
		company.setCompanySubStatus(serviceRequest.getCompanySubStatus());
		company.setCompanyType(serviceRequest.getCompanyType());
		company.setSector(serviceRequest.getSector());
		company.setHoldingCompany(serviceRequest.getHoldingCompany());
		company.setSubsidaryCompany(serviceRequest.getSubsidaryCompany());
		company.setMainFax(serviceRequest.getMainFax());
		company.setDateIncopr(serviceRequest.getDateIncopr());
		company.setStEmploy(serviceRequest.getStEmploy());
		company.setRegion(serviceRequest.getRegion());
		company.setProvince(serviceRequest.getProvince());
		company.setDistrict(serviceRequest.getDistrict());
		company.setStation(serviceRequest.getStation());
		company.setZone(serviceRequest.getZone());
		company.setMainPhone(serviceRequest.getMainPhone());
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
		request.setType(serviceRequest.getType());
		request.setStartDate(serviceRequest.getStartDate());
		request.setEndDate(serviceRequest.getEndDate());
		request.setArea(serviceRequest.getArea());
		request.setSubArea(serviceRequest.getSubArea());
		request.setSource(serviceRequest.getSource());
		request.setStatus(serviceRequest.getSrStatus());

		request.setCompany(company);
		return repository.save(request);

	}

	public List<ServiceRequest> findByOwnerId(String ownerId) {
		// TODO Auto-generated method stub
		return repository.findByOwnerId(ownerId);
	}

	public ServiceRequest updateServiceRequest(ServiceRequest serRequest, ServiceRequestUiVo serviceRequest) {
		// TODO Auto-generated method stub
		
		/*
		 * Contact contact = serRequest.getCompany().getContact();
		 * contact.setContactType(serviceRequest.getContactType());
		 * contact.setContactTypeId(serviceRequest.getContactTypeId());
		 * contact.setDob(serviceRequest.getDob());
		 * //contact.setCraeatedBy(serviceRequest.getCraeatedBy());
		 * //contact.setCreated(DateUtil.getCurrentDate());
		 * contact.setLastUpdBy(serviceRequest.getLoginUserId());
		 * contact.setLast_Updated(DateUtil.getCurrentDate());
		 * contact.setFirstName(serviceRequest.getFirstName());
		 * contact.setMiddleName(serviceRequest.getMiddleName());
		 * contact.setLastName(serviceRequest.getLastName());
		 * contact.setDocumentNo(serviceRequest.getDocumentNum());
		 * contact.setDocumentType(serviceRequest.getDocumentType());
		 * serRequest.getCompany().setContact(contact);
		 */
		  
			/*
			 * Address address = serRequest.getCompany().getAddress();
			 * address.setCity(serviceRequest.getCity());
			 * address.setAdressLine1(serviceRequest.getAdressLine1());
			 * address.setAdressLine2(serviceRequest.getAdressLine2());
			 * address.setAdressLine3(serviceRequest.getAdressLine3());
			 * address.setAdressLine4(serviceRequest.getAdressLine4());
			 * address.setAdressType(serviceRequest.getAdressType());
			 * address.setCountry(serviceRequest.getCountry());
			 * //address.setCraeatedBy(serviceRequest.getCraeatedBy());
			 * //address.setCreated(DateUtil.getCurrentDate());
			 * address.setLastUpdBy(serviceRequest.getLoginUserId());
			 * address.setLast_Updated(DateUtil.getCurrentDate());
			 * address.setDistrictProvience(serviceRequest.getDistrictProvience());
			 * address.setState(serviceRequest.getState());
			 * address.setPostalCode(serviceRequest.getPostalCode());
			 * 
			 * serRequest.getCompany().setAddress(address);
			 */
		  
		  Company company = serRequest.getCompany(); // Company
		  //company.setCreated(DateUtil.getCurrentDate());
		  //company.setCreatedBy(serviceRequest.getCraeatedBy());
		  company.setLastUpdated(DateUtil.getCurrentDate());
		  company.setLastUpdatedBy(serviceRequest.getLoginUserId());
		  company.setCompanyRegDate(serviceRequest.getCompanyRegDate());
		  company.setCompCxRef(serviceRequest.getCompCxRef());
		  company.setDocumentNum(serviceRequest.getDocumentNum());
		  company.setDocumentType(serviceRequest.getDocumentType());
		  company.setName(serviceRequest.getName().toUpperCase());
		  company.setPropFirstName(serviceRequest.getPropFirstName());
			company.setPropLastName(serviceRequest.getPropLastName());
			company.setPropPosition(serviceRequest.getPropPosition());
			company.setLegalName(serviceRequest.getLegalName());
			company.setSeasonFlag(serviceRequest.getSeasonFlag());
			company.setPacraId(serviceRequest.getPacraId());
			company.setCompanyStatus(serviceRequest.getCompanyStatus());
			company.setCompanySubStatus(serviceRequest.getCompanySubStatus());
			company.setCompanyType(serviceRequest.getCompanyType());
			company.setSector(serviceRequest.getSector());
			company.setHoldingCompany(serviceRequest.getHoldingCompany());
			company.setSubsidaryCompany(serviceRequest.getSubsidaryCompany());
			company.setMainFax(serviceRequest.getMainFax());
			company.setDateIncopr(serviceRequest.getDateIncopr());
			company.setStEmploy(serviceRequest.getStEmploy());
			company.setRegion(serviceRequest.getRegion());
			company.setProvince(serviceRequest.getProvince());
			company.setDistrict(serviceRequest.getDistrict());
			company.setStation(serviceRequest.getStation());
			company.setZone(serviceRequest.getZone());
			company.setMainPhone(serviceRequest.getMainPhone());
		  //company.setOwnerId(serviceRequest.getOwnerId());
		  
		  serRequest.setCompany(company);
		  
		  serRequest.setId(serviceRequest.getId());
		  //serRequest.setCreated(DateUtil.getCurrentDate());
		  //serRequest.setCraeatedBy(serviceRequest.getCraeatedBy());
		  serRequest.setLast_Updated(DateUtil.getCurrentDate());
		  serRequest.setLastUpdBy(serviceRequest.getLoginUserId());
		  serRequest.setOrgId(serviceRequest.getOrgId());
		  //serRequest.setOwnerId(serviceRequest.getLoginUserId());
		  serRequest.setClaimId(serviceRequest.getClaimId());
		  //serRequest.setSrNumber(serviceRequest.getSrNumber());
		  serRequest.setSource(serviceRequest.getSource());
		  serRequest.setContactName(serviceRequest.getContactName());
		  //serRequest.setType(serviceRequest.getType());
		  serRequest.setStartDate(serviceRequest.getStartDate());
		  serRequest.setEndDate(serviceRequest.getEndDate());
		  serRequest.setArea(serviceRequest.getArea());
		  serRequest.setSubArea(serviceRequest.getSubArea());
		  serRequest.setSource(serviceRequest.getSource());
		  serRequest.setStatus(serviceRequest.getSrStatus());
		 

		return repository.save(serRequest);

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
