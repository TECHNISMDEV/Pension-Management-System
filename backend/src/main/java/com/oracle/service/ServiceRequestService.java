package com.oracle.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	public void saveNewServiceRequest(ServiceRequestUiVo serviceRequest) {
		
		ServiceRequest request = new ServiceRequest();
		Company company = new Company();
		Address address = new Address();
		Contact contact = new Contact();

		contact.setContactType(serviceRequest.getContactType());
		contact.setContactTypeId(serviceRequest.getContactTypeId());
		contact.setDob(serviceRequest.getDob());
		contact.setCraeatedBy(serviceRequest.getCraeatedBy());
		contact.setCreated(DateUtil.getCurrentDate());
		contact.setLastUpdBy(serviceRequest.getLastUpdBy());
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
		address.setCraeatedBy(serviceRequest.getCraeatedBy());
		address.setCreated(DateUtil.getCurrentDate());
		address.setLastUpdBy(serviceRequest.getLastUpdBy());
		address.setLast_Updated(DateUtil.getCurrentDate());
		address.setDistrictProvience(serviceRequest.getDistrictProvience());
		address.setState(serviceRequest.getState());
		address.setPostalCode(serviceRequest.getPostalCode());
		company.setAddress(address);

		// Company
		company.setCreated(DateUtil.getCurrentDate());
		company.setCreatedBy(serviceRequest.getCraeatedBy());
		company.setLastUpdated(DateUtil.getCurrentDate());
		company.setLastUpdatedBy(serviceRequest.getLastUpdBy());
		company.setCompanyRegDate(serviceRequest.getCompanyRegDate());
		company.setCompCxRef(serviceRequest.getCompCxRef());
		company.setDocumentNum(serviceRequest.getDocumentNum());
		company.setDocumentType(serviceRequest.getDocumentType());
		company.setName(serviceRequest.getName().toUpperCase());
		company.setOwnerId(serviceRequest.getOwnerId());
		// company.setPrContactId(serviceRequest.getPrContactId());

		// service request
		request.setId(serviceRequest.getId());
		request.setCreated(DateUtil.getCurrentDate());
		request.setCraeatedBy(serviceRequest.getCraeatedBy());
		request.setLast_Updated(DateUtil.getCurrentDate());
		request.setLastUpdBy(serviceRequest.getLastUpdBy());
		request.setOrgId(serviceRequest.getOrgId());
		request.setOwnerId(serviceRequest.getOwnerId());
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
		repository.save(request);

	}

	public List<ServiceRequest> findByOwnerId(String ownerId) {
		// TODO Auto-generated method stub
		return repository.findByOwnerId(ownerId);
	}

	
}
