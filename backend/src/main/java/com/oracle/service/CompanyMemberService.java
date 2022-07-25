package com.oracle.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oracle.Vos.MemberVO;
import com.oracle.Vos.ServiceRequestForMemberRegistration;
import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.exceptioncontroller.CompanyNotExistException;
import com.oracle.model.Company;
import com.oracle.model.CompanyMember;
import com.oracle.model.Member;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.CompanyRepository;
import com.oracle.repository.ServiceRequestRepository;
import com.oracle.util.DateUtil;
import com.oracle.util.LookUpConstant;

@Service
public class CompanyMemberService {

	@Autowired
	ServiceRequestRepository repository;
	
	@Autowired
	CompanyRepository companyRepository;
	public ServiceRequest saveMemberServiceRequest(ServiceRequestForMemberRegistration serviceRequestRegistration)
	{
		ServiceRequest serviceRequest = new ServiceRequest();
		Company company=companyRepository.getCompanyById(serviceRequestRegistration.getCompanyVo().getId());
		if(null==company)
		{
			throw new CompanyNotExistException();
		}
		serviceRequest.setId(serviceRequestRegistration.getServiceRequestVo().getId());
		serviceRequest.setSrNumber(serviceRequestRegistration.getServiceRequestVo().getSrNumber());
		serviceRequest.setType(LookUpConstant.SERVICE_REQUEST_TYPE_MEMBER_REG);
		serviceRequest.setCraeatedBy(serviceRequestRegistration.getServiceRequestVo().getLoginUserId());
		serviceRequest.setCreated(DateUtil.getCurrentDate());
		serviceRequest.setComments(serviceRequestRegistration.getServiceRequestVo().getComments());
		serviceRequest.setOwnerId(serviceRequestRegistration.getServiceRequestVo().getLoginUserId());
		
		serviceRequest.setCompany(company);
		
		return repository.save(serviceRequest);
		

		
	}
	public Member addCompanyMember(MemberVO vo) {
		// TODO Auto-generated method stub
		return null;
	}
}
