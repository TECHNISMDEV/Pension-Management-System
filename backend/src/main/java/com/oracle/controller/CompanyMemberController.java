package com.oracle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oracle.Vos.ServiceRequestUiVo;
import com.oracle.service.CompanyMemberService;

@RestController
@RequestMapping("/app")
@CrossOrigin
public class CompanyMemberController {
	@Autowired
	CompanyMemberService service;

	@PostMapping(path = "/saveCompanyMember")
	public ResponseEntity<?> saveMember(@RequestBody ServiceRequestUiVo vo) {

		service.saveCompanyMember(vo);
		return ResponseEntity.ok(vo);
	}
}
