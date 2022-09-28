package com.oracle.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.oracle.Vos.BenificiaryVo;
import com.oracle.Vos.MemberVO;
import com.oracle.Vos.ReturnUiVo;
import com.oracle.Vos.ServiceRequestForMemberRegistration;
import com.oracle.exceptioncontroller.CompanyNotExistException;
import com.oracle.helper.CSVHelper;
import com.oracle.helper.MemberAndBenifitsCSVHelper;
import com.oracle.model.Benificiary;
import com.oracle.model.Company;
import com.oracle.model.CompanyMember;
import com.oracle.model.Member;
import com.oracle.model.ReturnItems;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.BenificaryRepository;
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

	@Autowired
	BenificaryRepository benificaryRepository;

	public ServiceRequest saveMemberServiceRequest(ServiceRequestForMemberRegistration serviceRequestRegistration) {
		ServiceRequest serviceRequest = new ServiceRequest();
		Company company = companyRepository.getCompanyById(serviceRequestRegistration.getCompanyVo().getId());
		if (null == company) {
			throw new CompanyNotExistException();
		}
		serviceRequest.setId(serviceRequestRegistration.getServiceRequestVo().getId());
		serviceRequest.setSrNumber(serviceRequestRegistration.getServiceRequestVo().getSrNumber());
		serviceRequest.setType(LookUpConstant.SERVICE_REQUEST_TYPE_MEMBER_REG);
		serviceRequest.setCraeatedBy(serviceRequestRegistration.getServiceRequestVo().getLoginUserId());
		serviceRequest.setCreated(DateUtil.getCurrentDate());
		serviceRequest.setComments(serviceRequestRegistration.getServiceRequestVo().getComments());
		serviceRequest.setOwnerId(serviceRequestRegistration.getServiceRequestVo().getLoginUserId());
		serviceRequest.setContactNumber(serviceRequestRegistration.getServiceRequestVo().getContactNumber());
		serviceRequest.setContactName(serviceRequestRegistration.getServiceRequestVo().getContactName());
		serviceRequest.setContactEmail(serviceRequestRegistration.getServiceRequestVo().getContactEmail());

		serviceRequest.setCompany(company);

		return repository.save(serviceRequest);

	}

	public List<Member> getMemberListByCompanyId(String companyId){
		List<Member> memberList = memberRepository.findByCompanyId(companyId);
		return memberList;
	}
	public Member addCompanyMember(MemberVO vo) {
		Member member = new Member();
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

		member = memberRepository.save(member);

		CompanyMember companyMember = new CompanyMember();
		companyMember.setCompanyId(vo.getCompanyId());
		companyMember.setEndDate(vo.getRetirmentDate());// Can be change later
		companyMember.setStarDate(DateUtil.getCurrentDate());
		companyMember.setMember(member);
		companyMemberRepository.save(companyMember);

		return member;
	}

	public ServiceRequestForMemberRegistration getServiceRequestById(String id) {

		ServiceRequestForMemberRegistration memberRegistration = new ServiceRequestForMemberRegistration();
		List<MemberVO> memberList = new ArrayList<>();

		ServiceRequest request = repository.findById(id).get();
		memberRegistration.setServiceRequestVo(request.getVo());
		memberRegistration.setCompanyVo(request.getCompany().getVo());

		List<CompanyMember> companyMemberList = companyMemberRepository
				.getCompanyMemberByCompanyId(request.getCompany().getId());

		companyMemberList.forEach(companymember -> {
			memberList.add(companymember.getMember().getVo());
		});

		memberRegistration.setMemberVO(memberList);
		return memberRegistration;
	}

	public List<Member> uploadMemberWithBenifits(MultipartFile file, String loginId) {
		// TODO Auto-generated method stub
		try {
			List<MemberVO> memberVolist = new MemberAndBenifitsCSVHelper().excelToMemberList(file.getInputStream());
			String companyId=memberVolist.size()>0?memberVolist.get(0).getCompanyId():null;
			List<MemberVO> memberVOsForUI = new ArrayList<>();

			for (MemberVO vo : memberVolist) {
				Member existingmember = memberRepository.findByNrc(vo.getNrc());
				if (null != existingmember) {
					// update member here
					List<Benificiary> exisBenificiaries = existingmember.getBenificiary();
					existingmember.setCreatedBy(loginId);
					existingmember.setDob(vo.getDob());
					existingmember.setDocumaentName(DateUtil.getCurrentDate().toString());
					existingmember.setDocumentType(vo.getDocumentType());
					existingmember.setDod(vo.getDod());
					existingmember.setEmail(vo.getEmail());
					existingmember.setFirstName(vo.getFirstName());
					existingmember.setMiddleName(vo.getMiddleName());
					existingmember.setLastName(vo.getLastName());
					existingmember.setLastUpdated(DateUtil.getCurrentDate());
					existingmember.setLastUpdatedBy(loginId);
					existingmember = memberRepository.save(existingmember);
					memberVOsForUI.add(existingmember.getVo());	

				} else {
					Member member = new Member();
					member.setCreated(DateUtil.getCurrentDate());
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
					// retrieveBenificiaryList(vo);

					member = memberRepository.save(member);

					List<Benificiary> benificiaries = retrieveBenificiaryList(vo, member);
					benificaryRepository.saveAll(benificiaries);

					CompanyMember companyMember = new CompanyMember();
					companyMember.setCompanyId(vo.getCompanyId());
					companyMember.setEndDate(vo.getRetirmentDate());// Can be change later
					companyMember.setStarDate(DateUtil.getCurrentDate());
					companyMember.setMember(member);
					companyMemberRepository.save(companyMember);
					memberVOsForUI.add(member.getVo());
				}

			}

			 return memberRepository.findByCompanyId(companyId);
			//return memberVOsForUI;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}

	private List<Benificiary> retrieveBenificiaryList(MemberVO vo, Member member) {

		List<Benificiary> benfList = new ArrayList<>();

		for (BenificiaryVo bVo : vo.getBenificiaryVo()) {
			Benificiary b = new Benificiary();
			b.setCreated(DateUtil.getCurrentDate());
			b.setCreatedBy(member.getCreatedBy());
			b.setDob(bVo.getDob());
			b.setDocumaentName(bVo.getDocumaentName());
			b.setDocumentType(bVo.getDocumentType());
			b.setEmail(bVo.getEmail());
			b.setFirstName(bVo.getFirstName());
			b.setMiddleName(bVo.getMiddleName());
			b.setLastName(bVo.getLastName());
			b.setMobile(bVo.getMobile());
			b.setNationality(bVo.getNationality());
			b.setNrc(bVo.getNrc());
			b.setMember(member);
			benfList.add(b);
		}
		return benfList;
	}

	public List<Benificiary> getBenificiaryByMemberId(String id) {
		// TODO Auto-generated method stub
		List<Benificiary> list = benificaryRepository.findBenificiaryListByMemberId(id);
		return list;
	}

	public Benificiary addBenificiary(BenificiaryVo vo, String memberId) {
		Benificiary b=null;

			if(vo.getId().isEmpty())
			{
				b=new Benificiary();
			}else {
				b=benificaryRepository.findById(vo.getId()).get();
			}
			b.setCreated(DateUtil.getCurrentDate());
			b.setCreatedBy(vo.getLoginId());
			b.setDob(vo.getDob());
			b.setDocumaentName(vo.getDocumaentName());
			b.setDocumentType(vo.getDocumentType());
			b.setEmail(vo.getEmail());
			b.setFirstName(vo.getFirstName());
			b.setMiddleName(vo.getMiddleName());
			b.setLastName(vo.getLastName());
			b.setMobile(vo.getMobile());
			b.setNationality(vo.getNationality());
			b.setNrc(vo.getNrc());
			b.setSsn(vo.getSsn());
			b.setMember(memberRepository.findById(memberId).get());
			
			
			
			
		
		return benificaryRepository.save(b);
		
	}
}
