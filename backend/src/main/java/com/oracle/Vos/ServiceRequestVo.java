package com.oracle.Vos;

import java.math.BigInteger;
import java.util.Date;

import javax.persistence.Column;

import com.oracle.model.AppUser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequestVo {

	private String id;

	private Date created;

	private String craeatedBy;

	private Date last_Updated;

	private String lastUpdBy;

	private String srNumber;

	private String type;

	private Date startDate;

	private Date endDate;

	private String area;

	private String subArea;

	private String process;

	private String resolution;

	private String comments;

	private String claimId;

	private String ownerId;

	private String orgId;

	private String source;

	private String priority;

	private BigInteger contactNumber;

	private String contactName;
	
	private String contactEmail;

	private String status;

	private String srPropiterFirstName;

	private String srPropiterLastName;

	private String propiterNationality;

	private String proprietorNRC;

	private String name;

	private String companyType;

	private String location;
	
	private String loginUserId;
	
	private String companyId;
	
	AppUser user;
	
	
}
