package com.oracle.Vos;

import java.math.BigInteger;
import java.sql.Date;

import javax.persistence.Column;

import lombok.Data;

@Data

public class ServiceRequestUiVo {
	
	private ServiceRequestVo serviceRequestVo;
	
	private CompanyVo companyVo;
	
}
