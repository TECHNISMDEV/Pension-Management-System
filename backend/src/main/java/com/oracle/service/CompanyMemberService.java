package com.oracle.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oracle.Vos.MemberVO;
import com.oracle.Vos.ServiceRequestForMemberRegistration;
import com.oracle.exceptioncontroller.CompanyNotExistException;
import com.oracle.model.Company;
import com.oracle.model.CompanyMember;
import com.oracle.model.Member;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.CompanyMemberRepository;
import com.oracle.repository.CompanyRepository;
import com.oracle.repository.MemberRepository;
import com.oracle.repository.ServiceRequestRepository;
import com.oracle.util.DateUtil;
import com.oracle.util.LookUpConstant;

@Service
public class CompanyMemberService {

	@Autowired
	ServiceRequestRepository repository;
	
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	CompanyMemberRepository companyMemberRepository;
	
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
		Member member=new Member();
		member.setCreated(vo.getCreated());
		member.setCreatedBy(vo.getLoginId());
		member.setDob(vo.getDob());
		member.setDod(vo.getDod());
		member.setDocumaentName(DateUtil.getCurrentDate().toString());
		member.setDocumentType(vo.getDocumentType());
		member.setEmail(vo.getEmail());
		member.setFirstName(vo.getFirstName());
		member.setMiddleName(vo.getMiddleName());
		member.setLastName(vo.getLastName());
		member.setMobile(vo.getMobile());
		member.setNationality(vo.getNationality());
		member.setNrc(vo.getNrc());
		member.setLastUpdated(vo.getLastUpdated());
		member.setLastUpdatedBy(vo.getLoginId());
		member.setRetirmentDate(vo.getRetirmentDate());
		member.setOwnerId(vo.getLoginId());
		
		member=memberRepository.save(member);
		
		CompanyMember companyMember=new CompanyMember();
		companyMember.setCompanyId(vo.getCompanyId());
		companyMember.setEndDate(vo.getRetirmentDate());//Can be change later
		companyMember.setStarDate(DateUtil.getCurrentDate());
		companyMember.setMember(member);
		companyMemberRepository.save(companyMember);
		
		return member;
	}
	public ServiceRequestForMemberRegistration getServiceRequestById(String id) {
		
		ServiceRequestForMemberRegistration memberRegistration=new ServiceRequestForMemberRegistration();
		List<MemberVO> memberList=new ArrayList<>();
		
		ServiceRequest request=repository.findById(id).get();
		memberRegistration.setServiceRequestVo(request.getVo());
		memberRegistration.setCompanyVo(request.getCompany().getVo());
		
		List<CompanyMember> companyMemberList=companyMemberRepository.getCompanyMemberByCompanyId(request.getCompany().getId());
		
		companyMemberList.forEach(companymember->{
			memberList.add(companymember.getMember().getVo());
		});
		
		memberRegistration.setMemberVO(memberList);
		return memberRegistration;
	}
}
