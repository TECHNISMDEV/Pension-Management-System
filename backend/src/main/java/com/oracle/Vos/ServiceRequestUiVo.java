package com.oracle.Vos;

import java.math.BigInteger;
import java.sql.Date;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ServiceRequestUiVo {
	
	private ServiceRequestVo serviceRequestVo;
	
	private CompanyVo companyVo;
	
}
