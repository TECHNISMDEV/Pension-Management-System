package com.oracle.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.oracle.Vos.BenificiaryVo;
import com.oracle.Vos.MemberVO;
import com.oracle.Vos.ReturnUiVo;
import com.oracle.Vos.ServiceRequestForMemberRegistration;
import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.helper.CSVHelper;
import com.oracle.helper.MemberAndBenifitsCSVHelper;
import com.oracle.model.AppUser;
import com.oracle.model.Benificiary;
import com.oracle.model.Member;
import com.oracle.model.Return;
import com.oracle.model.ServiceRequest;
import com.oracle.repository.AppUserService;
import com.oracle.service.CompanyMemberService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/app")
@CrossOrigin
@Slf4j
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
		vo.setCreatedBy(loginId);
		vo.setLastUpdatedBy(loginId);
		
		Member memebr=service.addCompanyMember(vo);
		
		return ResponseEntity.ok(memebr.getVo());
	}
	
	@PostMapping(path = "/AddBenificiary/{memberId}")
	public ResponseEntity<?> AddBenificiary(@RequestBody BenificiaryVo vo,@PathVariable String memberId) {

		String loginId=vo.getLoginId();
		AppUser user=appUserService.findUserById(loginId);
		vo.setCreatedBy(loginId);
		vo.setLastUpdatedBy(loginId);
		
		Benificiary memebr=service.addBenificiary(vo,memberId);
		
		return ResponseEntity.ok(memebr.getVo());
	}
	
	@GetMapping(path = "/getServiceRequestById/{Id}")
	public ResponseEntity<?> getMemberByCompanyId(@PathVariable String Id) {

		ServiceRequestForMemberRegistration vo=service.getServiceRequestById(Id);
		
		
		return ResponseEntity.ok(vo);
	}
	
	@PostMapping("/memberfile-upload/{loginId}")
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,@PathVariable String loginId) {
		String message = "";
		AppUser appUser=appUserService.findUserById(loginId);

		if (MemberAndBenifitsCSVHelper.hasExcelFormat(file)) {
			try {
				List<MemberVO> memberList = service.uploadMemberWithBenifits(file,loginId);
				

				return ResponseEntity.ok(memberList);
			} catch (Exception e) {
				e.printStackTrace();
				message = "Could not- upload the file: " + file.getOriginalFilename() + "!";
				log.error("Exception===> {}",e);
				return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
						.body(new com.oracle.message.ResponseMessage(message, ""));
			}
		}else {
			message = "Please upload a csv file!";
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new com.oracle.message.ResponseMessage(message, ""));
		}

		
	}
	
	@GetMapping(path = "/getBenificiaryByMemberId/{Id}")
	public ResponseEntity<?> getBenificiaryByMemberId(@PathVariable String Id) {

		List<Benificiary> list=service.getBenificiaryByMemberId(Id);
		
		
		return ResponseEntity.ok(list);
	}
	
	
}
