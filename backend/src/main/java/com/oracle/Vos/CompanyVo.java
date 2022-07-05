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

	private String prContactId;

	private String adressLine1;

	private String adressLine2;

	private String adressLine3;

	private String adressLine4;

	private String city;

	private String districtProvience;

	private String state;

	private String country;

	private String postalCode;

	private String adressType;

	private String srStatus;

	private String firstName;

	private String middleName;

	private String lastName;

	private String contactType;

	private String contactTypeId;

	private String memberId;

	private String nationality;

	private Date dod;

	private String nrc;

	private String ssn;

	private Date retirementDate;

	private Date dob;

	private String loginUserId;

	private String propFirstName;

	private String propLastName;

	private String propPosition;

	private String seasonFlag;

	private String pacraId;

	private String companyStatus;

	private String companySubStatus;

	private String companyType;

	private String sector;

	private String holdingCompany;

	private String subsidaryCompany;

	private String mainFax;

	private Date dateIncopr;

	private Date stEmploy;

	private String region;

	private String province;

	private String district;

	private String station;

	private String zone;

	private String legalName;

	private String mainPhone;
	
	private String mainEmail;
	
	private String area;
	
	private Integer noOfEmployee;

}
