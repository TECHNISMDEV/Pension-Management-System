package com.oracle.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.model.Company;
import com.oracle.model.CompanyMember;
import com.oracle.model.Member;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.CompanyRepository;
import com.oracle.repository.ServiceRequestRepository;
import com.oracle.util.DateUtil;

@Service
public class CompanyMemberService {

	@Autowired
	ServiceRequestRepository repository;
	
	@Autowired
	CompanyRepository companyRepository;
	public void saveCompanyMember(ServiceRequestUiVo serviceRequest)
	{
		
		Company company=companyRepository.findById(serviceRequest.getCompanyId()).get();

		
		//Member fields
		Member member=new Member();
		member.setFirstName(serviceRequest.getFirstName());
		member.setDob(serviceRequest.getDob());
		member.setLastName(serviceRequest.getLastName());
		member.setMiddleName(serviceRequest.getMiddleName());
		member.setEmail(serviceRequest.getEmail());
		member.setDocumaentName(serviceRequest.getDocumentNum());
		member.setDocumentType(serviceRequest.getDocumentType());
		member.setMobile(Long.getLong(serviceRequest.getMobileNo()));
		member.setNationality(serviceRequest.getNationality());
		member.setDod(serviceRequest.getDod());
		member.setCreated(DateUtil.getCurrentDate());
		member.setCreatedBy(serviceRequest.getCraeatedBy());
		member.setLastUpdated(DateUtil.getCurrentDate());
		member.setLastUpdatedBy(serviceRequest.getLastUpdBy());
		member.setNrc(serviceRequest.getNrc());
		member.setOwnerId(serviceRequest.getOwnerId());
		member.setPrAdressId("");
		member.setSsn(serviceRequest.getSsn());
		member.setPrBenificaryId(null);
		member.setRetirmentDate(serviceRequest.getRetirementDate());
		
		//company member
				CompanyMember companymember=new CompanyMember();
				companymember.setCompanyId(company.getId());
				companymember.setStarDate(serviceRequest.getStartDate());
				companymember.setCreated(DateUtil.getCurrentDate());
				companymember.setCreatedBy(serviceRequest.getCraeatedBy());
				companymember.setLastUpdated(DateUtil.getCurrentDate());
				companymember.setLastUpdatedBy(serviceRequest.getLastUpdBy());
				companymember.setMember(member);
		
		//Service request
		ServiceRequest request=new ServiceRequest();
		request.setId(serviceRequest.getId());
		request.setCreated(DateUtil.getCurrentDate());
		request.setCraeatedBy(serviceRequest.getCraeatedBy());
		request.setLast_Updated(DateUtil.getCurrentDate());
		request.setLastUpdBy(serviceRequest.getLastUpdBy());
		request.setOwnerId(serviceRequest.getOwnerId());
		request.setSrNumber(serviceRequest.getSrNumber());
		request.setType(serviceRequest.getType());
		request.setContactName(serviceRequest.getContactName());
		request.setContactNumber(serviceRequest.getContactNumber());
		request.setStatus(serviceRequest.getSrStatus());
		//request.setCompany(company);
		request.setMember(companymember);
		
		repository.save(request);
		
	}
}
