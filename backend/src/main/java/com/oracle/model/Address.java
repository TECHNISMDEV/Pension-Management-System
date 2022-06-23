package com.oracle.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

@Entity
@Table(name="ADRESS")
public class Address {
	@Id
	@Column(name="ID")
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_ADRESS_SEQ")
	 @GenericGenerator (
	        name = "TCX_ADRESS_SEQ", 
	        strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", 
	        parameters = {
	            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "A"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	@Column(name="CREATED")
	private Date created;
	@Column(name="CREATED_BY")
	private String craeatedBy;
	@Column(name="LAST_UPDATED")
	private Date last_Updated;
	@Column(name="LAST_UPDATED_BY")
	private String lastUpdBy;
	@Column(name="ADRESS_LINE1")
	private String adressLine1;
	@Column(name="ADRESS_LINE2")
	private String adressLine2;
	@Column(name="ADRESS_LINE3")
	private String adressLine3;
	@Column(name="ADRESS_LINE4")
	private String adressLine4;
	@Column(name="CITY")
	
	private String city;
	@Column(name="DISTRICT_PROVINCE")
	private String districtProvience;
	@Column(name="STATE")
	private String state;
	@Column(name="COUNTRY")
	private String country;
	@Column(name="POSTAL_CODE")
	private String postalCode;
	@Column(name="ADRESS_TYPE")
	private String adressType;
	@Column(name="COMPANY_ID")
	private String companyId;
	@Column(name="MEMBER_ID")
	private String memberId;
	
	@JsonInclude()
	@Transient
	private String loginId;
	
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "address")
	@JsonBackReference
	private Company company;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public String getCraeatedBy() {
		return craeatedBy;
	}
	public void setCraeatedBy(String craeatedBy) {
		this.craeatedBy = craeatedBy;
	}
	public Date getLast_Updated() {
		return last_Updated;
	}
	public void setLast_Updated(Date last_Updated) {
		this.last_Updated = last_Updated;
	}
	public String getLastUpdBy() {
		return lastUpdBy;
	}
	public void setLastUpdBy(String lastUpdBy) {
		this.lastUpdBy = lastUpdBy;
	}
	public String getAdressLine1() {
		return adressLine1;
	}
	public void setAdressLine1(String adressLine1) {
		this.adressLine1 = adressLine1;
	}
	public String getAdressLine2() {
		return adressLine2;
	}
	public void setAdressLine2(String adressLine2) {
		this.adressLine2 = adressLine2;
	}
	public String getAdressLine3() {
		return adressLine3;
	}
	public void setAdressLine3(String adressLine3) {
		this.adressLine3 = adressLine3;
	}
	public String getAdressLine4() {
		return adressLine4;
	}
	public void setAdressLine4(String adressLine4) {
		this.adressLine4 = adressLine4;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getDistrictProvience() {
		return districtProvience;
	}
	public void setDistrictProvience(String districtProvience) {
		this.districtProvience = districtProvience;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getAdressType() {
		return adressType;
	}
	public void setAdressType(String adressType) {
		this.adressType = adressType;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	} 
	
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	
}
