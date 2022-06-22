package com.oracle.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

@Entity
@Table(name = "COMPANY")
@Data
@ToString
public class Company implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_COMPANYNUM_SEQ")
	@GenericGenerator(name = "TCX_COMPANYNUM_SEQ", strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", parameters = {
			@Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
			@Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "E"),
			@Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	@Column(name = "CREATED")
	private Date created;
	@Column(name = "CREATED_BY")
	private String createdBy;
	@Column(name = "LAST_UPDATED")
	private Date lastUpdated;
	@Column(name = "LAST_UPDATED_BY")
	private String lastUpdatedBy;
	@Column(name = "NAME")
	private String name;

	@Column(name = "DOCUMENT_NUM")
	private String documentNum;

	@Column(name = "DOCUMENT_TYPE")
	private String documentType;
	@Column(name = "COMP_CX_REF")
	private String compCxRef;

	@Column(name = "COMPANY_REG_DATE")
	private Date companyRegDate;
	@Column(name = "OWNER_ID")
	private String ownerId;

	@Column(name = "LEGAL_NAME")
	private String legalName;

	@Column(name = "PROP_FST_NAME")
	private String propFirstName;

	@Column(name = "PROP_LAST_NAME")
	private String propLastName;

	@Column(name = "PROP_POSITION")
	private String propPosition;

	@Column(name = "SEASONAL_FLG")
	private String seasonFlag;

	@Column(name = "PACRA_ID")
	private String pacraId;

	@Column(name = "COMPANY_STATUS")
	private String companyStatus;

	@Column(name = "COMPANY_SUB_STATUS")
	private String companySubStatus;

	@Column(name = "COMPANY_TYPE")
	private String companyType;

	@Column(name = "SECTOR")
	private String sector;

	@Column(name = "HOLDING_COMP")
	private String holdingCompany;

	@Column(name = "SUBSIDARY_COMP")
	private String subsidaryCompany;

	@Column(name = "MAIN_FAX")
	private String mainFax;

	@Column(name = "DATE_INCORP")
	private Date dateIncopr;

	@Column(name = "DATE_ST_EMPLOY")
	private Date stEmploy;

	@Column(name = "REGION")
	private String region;

	@Column(name = "PROVINCE")
	private String province;

	@Column(name = "DISTRICT")
	private String district;

	@Column(name = "STATION")
	private String station;

	@Column(name = "ZONE")
	private String zone;

	@Column(name = "MAIN_PHONE")
	private String mainPhone;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "company")
	@JsonBackReference
	private ServiceRequest request;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "PR_ADRESS_ID", referencedColumnName = "ID")
	@JsonManagedReference
	private Address address;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "PR_CONTACT_ID", referencedColumnName = "ID")
	@JsonManagedReference
	private Contact contact;

	/*
	 * @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name="DOCUMENT_NUM",referencedColumnName = "ID")
	 * 
	 * @JsonManagedReference private Document document;
	 */

}
