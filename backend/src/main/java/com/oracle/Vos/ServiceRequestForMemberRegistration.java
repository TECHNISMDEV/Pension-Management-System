package com.oracle.Vos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequestForMemberRegistration {

	private ServiceRequestVo serviceRequestVo;
	
	private CompanyVo companyVo;
	
	//private MemberVO memberVO;
}
