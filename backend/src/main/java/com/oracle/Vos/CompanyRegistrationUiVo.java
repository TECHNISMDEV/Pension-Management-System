package com.oracle.Vos;

import java.sql.Date;

import javax.persistence.Column;

public class CompanyRegistrationUiVo {

	private String id;
	private Date created;

	private String craeatedBy;

	private Date last_Updated;

	private String lastUpdBy;
	
	private String name;
	
	private String documentNum;
	private String documentType;
	private String compCxRef;
	
	private String prAddressId;

	private String prContactId;
	
	private Date companyRegDate;
	
	private String ownerId;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDocumentNum() {
		return documentNum;
	}

	public void setDocumentNum(String documentNum) {
		this.documentNum = documentNum;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public String getCompCxRef() {
		return compCxRef;
	}

	public void setCompCxRef(String compCxRef) {
		this.compCxRef = compCxRef;
	}

	public String getPrAddressId() {
		return prAddressId;
	}

	public void setPrAddressId(String prAddressId) {
		this.prAddressId = prAddressId;
	}

	public String getPrContactId() {
		return prContactId;
	}

	public void setPrContactId(String prContactId) {
		this.prContactId = prContactId;
	}

	public Date getCompanyRegDate() {
		return companyRegDate;
	}

	public void setCompanyRegDate(Date companyRegDate) {
		this.companyRegDate = companyRegDate;
	}

	public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
}
