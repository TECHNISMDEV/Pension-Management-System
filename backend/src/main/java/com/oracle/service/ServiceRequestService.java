package com.oracle.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.model.Address;
import com.oracle.model.Company;
import com.oracle.model.Contact;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.CompanyRepository;
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
	
	public ServiceRequest saveNewServiceRequest(ServiceRequestUiVo serviceRequest) {
		
		ServiceRequest request = new ServiceRequest();
		Company company = new Company();
		Address address = new Address();
		Contact contact = new Contact();

		contact.setContactType(serviceRequest.getContactType());
		contact.setContactTypeId(serviceRequest.getContactTypeId());
		contact.setDob(serviceRequest.getDob());
		contact.setCraeatedBy(serviceRequest.getLoginUserId());
		contact.setCreated(DateUtil.getCurrentDate());
		contact.setLastUpdBy(serviceRequest.getLoginUserId());
		contact.setLast_Updated(DateUtil.getCurrentDate());
		contact.setFirstName(serviceRequest.getFirstName());
		contact.setMiddleName(serviceRequest.getMiddleName());
		contact.setLastName(serviceRequest.getLastName());
		contact.setDocumentNo(serviceRequest.getDocumentNum());
		contact.setDocumentType(serviceRequest.getDocumentType());
		company.setContact(contact);

		// Address
		address.setCity(serviceRequest.getCity());
		address.setAdressLine1(serviceRequest.getAdressLine1());
		address.setAdressLine2(serviceRequest.getAdressLine2());
		address.setAdressLine3(serviceRequest.getAdressLine3());
		address.setAdressLine4(serviceRequest.getAdressLine4());
		address.setAdressType(serviceRequest.getAdressType());
		address.setCountry(serviceRequest.getCountry());
		address.setCraeatedBy(serviceRequest.getLoginUserId());
		address.setCreated(DateUtil.getCurrentDate());
		address.setLastUpdBy(serviceRequest.getLoginUserId());
		address.setLast_Updated(DateUtil.getCurrentDate());
		address.setDistrictProvience(serviceRequest.getDistrictProvience());
		address.setState(serviceRequest.getState());
		address.setPostalCode(serviceRequest.getPostalCode());
		company.setAddress(address);

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
		
		  Contact contact = serRequest.getCompany().getContact();
		  contact.setContactType(serviceRequest.getContactType());
		  contact.setContactTypeId(serviceRequest.getContactTypeId());
		  contact.setDob(serviceRequest.getDob());
		  //contact.setCraeatedBy(serviceRequest.getCraeatedBy());
		  //contact.setCreated(DateUtil.getCurrentDate());
		  contact.setLastUpdBy(serviceRequest.getLoginUserId());
		  contact.setLast_Updated(DateUtil.getCurrentDate());
		  contact.setFirstName(serviceRequest.getFirstName());
		  contact.setMiddleName(serviceRequest.getMiddleName());
		  contact.setLastName(serviceRequest.getLastName());
		  contact.setDocumentNo(serviceRequest.getDocumentNum());
		  contact.setDocumentType(serviceRequest.getDocumentType());
		  serRequest.getCompany().setContact(contact);
		  
		    Address address = serRequest.getCompany().getAddress();
		  address.setCity(serviceRequest.getCity());
		  address.setAdressLine1(serviceRequest.getAdressLine1());
		  address.setAdressLine2(serviceRequest.getAdressLine2());
		  address.setAdressLine3(serviceRequest.getAdressLine3());
		  address.setAdressLine4(serviceRequest.getAdressLine4());
		  address.setAdressType(serviceRequest.getAdressType());
		  address.setCountry(serviceRequest.getCountry());
		  //address.setCraeatedBy(serviceRequest.getCraeatedBy());
		  //address.setCreated(DateUtil.getCurrentDate());
		  address.setLastUpdBy(serviceRequest.getLoginUserId());
		  address.setLast_Updated(DateUtil.getCurrentDate());
		  address.setDistrictProvience(serviceRequest.getDistrictProvience());
		  address.setState(serviceRequest.getState());
		  address.setPostalCode(serviceRequest.getPostalCode());
		  
		  serRequest.getCompany().setAddress(address);
		  
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

	
}
