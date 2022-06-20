package com.oracle.Vos;

import java.util.Date;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyVo {

	private String id;
	private Date created;
	private String createdBy;
	private Date lastUpdated;
	private String lastUpdatedBy;
	private String name;

	private String documentNum;

	private String documentType;
	private String compCxRef;
	
	private Date companyRegDate;
	private String ownerId;

}
