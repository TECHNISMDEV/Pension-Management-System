package com.oracle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oracle.Vos.MemberVO;
import com.oracle.Vos.ServiceRequestForMemberRegistration;
import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.model.AppUser;
import com.oracle.model.Member;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.AppUserService;
import com.oracle.service.CompanyMemberService;

@RestController
@RequestMapping("/app")
@CrossOrigin
public class CompanyMemberController {
	@Autowired
	CompanyMemberService service;
	
	@Autowired
	private AppUserService appUserService;

	@PostMapping(path = "/saveCompanyMemberServiceRequest")
	public ResponseEntity<?> saveCompanyMemberServiceRequest(@RequestBody ServiceRequestForMemberRegistration vo) {

		String loginId=vo.getServiceRequestVo().getLoginUserId();
		AppUser user=appUserService.findUserById(loginId);
		ServiceRequest request=service.saveMemberServiceRequest(vo);
		vo.setServiceRequestVo(request.getVo());
		vo.setCompanyVo(request.getCompany().getVo());
		vo.getServiceRequestVo().setUser(user);
		return ResponseEntity.ok(vo);
	}
	
	@PostMapping(path = "/AddCompanyMember")
	public ResponseEntity<?> AddCompanyMember(@RequestBody MemberVO vo) {

		String loginId=vo.getLoginId();
		AppUser user=appUserService.findUserById(loginId);
		Member memebr=service.addCompanyMember(vo);
		
		return ResponseEntity.ok(memebr);
	}
	
	
}
